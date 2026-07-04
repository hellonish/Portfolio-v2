# SMOLSolver: Generator-Verifier-Ranker Framework for Math Reasoning

**Project type:** ML research engineering, math reasoning, verifier/ranker systems  
**Repository:** [github.com/hellonish/SMOLSolver-Lightweight-Generator-Verifier-Ranker-Framework-for-Math-Reasoning](https://github.com/hellonish/SMOLSolver-Lightweight-Generator-Verifier-Ranker-Framework-for-Math-Reasoning)  
**Primary stack:** Phi-2, QLoRA, RoBERTa-large, GSM8K, PyTorch, Hugging Face, PEFT

## Summary

SMOLSolver came from two ideas I wanted to test in a smaller, controlled setup:

1. The [rStar paper](https://arxiv.org/abs/2408.06195), which showed that small language models can improve reasoning through a generator-discriminator style process.
2. The practical observation that small language models can become useful when they are tuned for a narrow task instead of treated as general-purpose models.

The goal was not to build another large reasoning model. The goal was to study whether a small generator, verifier, and ranker could work together on GSM8K math reasoning.

Several variants were tested during the project. The results worth discussing are the final generator-verifier-ranker setup and the answer-selection comparison against majority vote.

## Research Question

Given multiple sampled solutions from a small math generator, can a learned verifier or ranker choose the correct answer better than majority vote?

This is the core problem. The generator can often produce a correct answer somewhere in its sampled candidates. The harder part is selecting the correct answer without access to the ground truth.

## System Design

The final system has four components:

1. **Generator:** Phi-2 fine-tuned with QLoRA on GSM8K.
2. **Verifier:** RoBERTa-large binary classifier for outcome-level correctness.
3. **Ranker:** RoBERTa-large pairwise ranker trained to score correct solutions above incorrect ones.
4. **Consensus analysis:** grouping test questions by how much the generator agrees with itself.

The pipeline is modular. Each component can be trained, replaced, and evaluated independently.

## Generator

The generator is **Phi-2 (2.7B)** fine-tuned on GSM8K with QLoRA.

Verified setup from `generator_train.py`:

- base model: `microsoft/phi-2`,
- dataset: GSM8K,
- quantization: 4-bit NF4 with double quantization,
- LoRA rank: `r=16`,
- LoRA alpha: `16`,
- LoRA dropout: `0.1`,
- target modules: `q_proj`, `k_proj`, `v_proj`, `o_proj`,
- epochs: `2`,
- effective batch size: `32`,
- learning rate: `1e-4`,
- max sequence length: `1024`.

The training script masks prompt tokens with `-100`, so the loss is computed only on the generated reasoning and final answer. This keeps the optimization focused on solving, not copying the prompt.

For evaluation, `generate_test_k15.py` samples **15 solutions per GSM8K test question**. With 1,319 test questions, this produces 19,785 candidate solutions.

## Verifier

The verifier is an outcome-level classifier:

- model: `roberta-large`,
- input: `Question: ... [SEP] Solution: ...`,
- label: whether the extracted final answer matches the GSM8K answer,
- objective: binary classification,
- model selection metric: AUC,
- early stopping: patience 3.

This verifier does not check individual reasoning steps. It learns whether a complete solution likely ends in the correct answer. That is weaker than process supervision, but it matches the available labels and keeps the experiment simple.

## Ranker

The ranker uses the same encoder family, but changes the objective.

Verified setup from `verifiert_rain_ranker_RoBERTa.py`:

- encoder: `roberta-large`,
- pooling: masked mean pooling,
- head: MLP scalar score head,
- loss: `MarginRankingLoss`,
- margin: `0.5`,
- training pairs: correct solution vs incorrect solution for the same question,
- effective batch size: `32`,
- epochs: `3`,
- learning rate: `2e-5`.

The verifier asks whether one solution is correct. The ranker asks whether one solution should score higher than another solution for the same problem.

## Consensus Groups

The test set is split by generator stability. For each question, `classify_by_margin.py` computes:

- `r1`: frequency of the most common predicted answer across 15 samples,
- `r2`: frequency of the second most common predicted answer,
- `margin = r1 - r2`.

The 33rd and 66th percentiles define the groups:

- `tau_low = 0.1333`,
- `tau_high = 0.5333`.

Final group sizes:

- high consensus: 505 questions,
- medium consensus: 397 questions,
- low consensus: 417 questions.

These thresholds are percentile-based, not learned. The groups are used for diagnosis: high consensus means the generator mostly agrees with itself; low consensus means the generator is unstable.

## Evaluation

The final evaluation compares seven selection methods:

1. Majority vote.
2. Classifier top score.
3. Classifier weighted majority vote.
4. Ranker top score.
5. Ranker weighted majority vote.
6. Classifier filter, then ranker top score.
7. Classifier filter, then ranker weighted majority vote.

Final accuracy from `ranker_eval_results.json`:

| Method | Overall | High | Medium | Low |
|---|---:|---:|---:|---:|
| Majority Vote | **68.61%** | **96.04%** | **72.04%** | 32.13% |
| Classifier Top | 41.17% | 65.15% | 35.77% | 17.27% |
| Classifier Weighted | 64.90% | 95.05% | 64.99% | 28.30% |
| Ranker Top | 36.54% | 59.41% | 30.73% | 14.39% |
| Ranker Weighted | 68.16% | 95.84% | 70.53% | **32.37%** |
| Classifier + Ranker Top | 38.06% | 60.79% | 33.00% | 15.35% |
| Classifier + Ranker Weighted | 61.64% | 93.07% | 60.96% | 24.22% |

## Results Worth Discussing

Majority vote remained the strongest overall method. Ranker-weighted voting nearly matched it, but did not beat it: **68.16% vs 68.61%**.

Top-score selection was weak. Picking the single highest-scored solution gave 41.17% with the classifier and 36.54% with the ranker. The scores were useful as weights, but not reliable enough for direct top-1 selection.

Weighted voting was the best learned strategy. It kept the aggregation benefit of majority vote and used verifier/ranker scores as soft evidence.

The classifier-ranker cascade did not help. Filtering with the classifier before ranking likely removed some useful candidates before the ranker could evaluate them.

The low-consensus group stayed difficult. The best method reached only 32.37% there. When the generator produced several competing answer clusters, the selector did not recover enough signal.

The result is a useful negative result: the learned selector was not the main bottleneck. Generator stability was.

## Limitations

The main limitations are:

- Single seed (`42`), no confidence intervals.
- Outcome-level labels only, not step-level reasoning labels.
- Answer extraction errors affect both labels and evaluation.
- The verifier and ranker use different generated training sets (`k=5` vs `k=7`).
- Results are limited to GSM8K.
- Large generated files and checkpoints are not committed, so full reproduction requires regenerating artifacts.

## What I Would Improve

The next version would focus on:

1. Multi-seed runs with confidence intervals.
2. Shared generated data for verifier and ranker training.
3. Better answer extraction and normalization.
4. Calibration analysis for classifier and ranker scores.
5. Process-level supervision if reliable labels are available.
6. Evaluation on harder math datasets such as MATH.

## Final Claim

SMOLSolver is a modular experiment in small-model math reasoning. It fine-tunes a Phi-2 generator, trains RoBERTa-large verifier and ranker models, groups GSM8K test questions by generator consensus, and compares seven answer-selection methods.

The main finding is clear: learned selection nearly matched majority vote but did not beat it overall. The useful conclusion is that for this setup, better generator stability matters more than a more complex selector.
