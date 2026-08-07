# Snap2Caption: End-to-End MLOps for Image Captioning

**Repository:** github.com/hellonish/Snap2Caption

**Primary stack:** LLaVA, QLoRA, FastAPI, React, Terraform, OpenStack, Ansible, Kubespray, Kubernetes, Helm, Argo Workflows, MLflow, MinIO, Prometheus, Grafana

## Summary

I built Snap2Caption as an MLOps system around an image-captioning model. 

The user uploads an image and generate an Instagram-style caption. The strongest part of the project is the ML platform work. I implemented infrastructure, training, deployment, storage, and feedback components around a LLaVA-based captioning workflow. The default branch does not fully serve the fine-tuned model, so I present this as an MLOps engineering project, not as a finished production SaaS.

## System Design

I structured the project around the ML lifecycle:

1. Preprocess InstaCities1M image-caption pairs.
2. Fine-tune LLaVA with LoRA/QLoRA for caption generation.
3. Track runs and model artifacts with MLflow.
4. Use MinIO for object storage.
5. Provision Chameleon/OpenStack infrastructure with Terraform.
6. Configure Kubernetes with Ansible and Kubespray.
7. Deploy staging, canary, production, and platform services with Helm and ArgoCD.
8. Define Argo Workflows for model build, deployment, and promotion.
9. Expose FastAPI endpoints for captioning and feedback.
10. Use Prometheus/Grafana patterns for inference monitoring.

## Data Pipeline

I built a Docker Compose ETL pipeline for InstaCities1M:

- **Extract:** download the dataset with `aria2c`.
- **Transform:** match image files to caption files, normalize city folders, filter selected cities, and create train/test/eval splits.
- **Load:** upload processed data to Chameleon object storage using `rclone`.

The important step is pair validation. I only keep records where the image and caption exist together. For multimodal training, mismatched pairs are not minor noise; they directly corrupt the image-text alignment.

For verified model training, I used the InstaCities1M New York subset. The repo contains broader data handling, but the strongest committed model evidence is for the New York subset.

## Model Training

I fine-tuned **LLaVA-1.5-7B** with QLoRA for Instagram-style caption generation.

Verified training setup:

- base model: `llava-hf/llava-1.5-7b-hf`,
- quantization: 4-bit QLoRA with NF4 and bfloat16 compute,
- LoRA targets: `q_proj`, `k_proj`, `v_proj`,
- tracking: Weights & Biases in the notebook workflow,
- evaluation: BLEU/ROUGE-style metrics in notebook cells,
- data: InstaCities1M New York subset.

I also built a containerized `training-pipeline` branch. It uses OmegaConf, Hugging Face datasets, PEFT LoRA adapters, MLflow logging, artifact storage, and conditional model registration.

One scope detail matters: the pipeline branch targets `llava-hf/llava-v1.6-mistral-7b-hf`, while the strongest notebook evidence verifies LLaVA-1.5-7B. The accurate claim is:

> I fine-tuned LLaVA-1.5-7B with QLoRA on an InstaCities1M New York subset and built a containerized MLflow-backed pipeline for LoRA model registration.
> 

## Infrastructure

I deployed the system on **Chameleon Cloud using OpenStack**, not AWS.

The Terraform setup under `tf/kvm/` provisions:

- a private network and subnet,
- private ports for each node,
- shared network ports,
- security groups for SSH, HTTP, MLflow, MinIO, Prometheus, and app ports,
- configurable compute nodes,
- a floating IP on the primary node.

I used Ansible and Kubespray to configure Kubernetes on the provisioned nodes. I then used Ansible playbooks to register platform and application services with ArgoCD.

## Platform Services

I deployed the shared ML platform services through Helm:

- **MLflow:** experiment tracking, model metadata, model artifact references.
- **Postgres:** MLflow backend store.
- **MinIO:** S3-compatible object storage for artifacts, feedback, and intermediate data.
- **Kubernetes namespaces/PVCs:** isolation and persistence for platform services.

The storage layer is MinIO on Chameleon/OpenStack. The code uses S3-compatible APIs, but this is not an AWS S3 deployment.

## Deployment and Promotion

I separated the Kubernetes deployment into four Helm charts:

- `platform`,
- `staging`,
- `canary`,
- `production`.

The application charts deploy the same `snap2caption-app` pattern with environment-specific values. ArgoCD manages sync.

I also defined Argo Workflow templates for the model lifecycle:

- `train-model.yaml`: trigger training and pass the model version forward.
- `build-container-image.yaml`: fetch model artifacts from MLflow and build a container image with Kaniko.
- `deploy-container-image.yaml`: update Helm image tags and sync the target environment.
- `promote-model.yaml`: retag images between environments and update MLflow aliases.

This models the delivery path I wanted: model versions move through staging, canary, and production as tracked artifacts, not as manually copied files.

Some workflow files still contain stale course-template references such as `food11.pth`, `gourmetgram-platform`, and `GourmetGramFood11Model`. I would clean those before calling the repository production-ready.

## Serving

The serving implementation is split across branches.

On `main`, `base_api/fastapi_app.py` validates an uploaded image and returns a static placeholder:

```
This is a static caption. (Model not integrated yet.)
```

`base_api/model.py` loads `Salesforce/blip-image-captioning-base`, but the main FastAPI route does not call it. Therefore, I do not claim that `main` serves the fine-tuned LLaVA model.

The stronger implementation is on `model_serving_endpoint`. That branch defines a FastAPI service that:

- accepts a base64 image,
- loads a LLaVA-Next base model,
- merges a LoRA adapter,
- runs GPU inference,
- exposes Prometheus metrics for request count, latency, output length, and failures.

I did not find a committed benchmark proving `< 2s P90` latency or `~300 requests/hour`. I treat those as design targets, not measured results.

## Feedback Loop

I implemented a feedback API in `base_api/store_feedback.py`. It accepts:

- user ID,
- base64 image,
- generated caption,
- feedback text.

The API writes the image, caption, and feedback to MinIO under `feedback/{uid}/`. The React frontend calls this endpoint when a user marks a caption as needing improvement.

This is not a complete active-learning loop. It is the first required step: capture model inputs, outputs, and human feedback in persistent storage for later review and retraining.

## Observability

I wired the serving design for Prometheus/Grafana monitoring:

- inference request count,
- inference latency,
- output token length,
- failure count.

I also used MLflow for training observability and model metadata. The README references live Chameleon floating IPs, but those are lease-based. I treat the manifests and instrumentation as the durable evidence, not the old URLs.

## Limitations

The main limitations are:

- Verified training evidence is limited to the New York subset.
- Secrets, CORS, Terraform state handling, and committed dev artifacts need hardening.