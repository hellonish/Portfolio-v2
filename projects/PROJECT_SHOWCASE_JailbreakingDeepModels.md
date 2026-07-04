# Jailbreaking Deep Models with Adversarial Image Attacks

**Project type:** Adversarial ML, computer vision robustness, model security  
**Paper link:** TODO: add external paper link  
**Source report:** [jailbreaking-deep-models.pdf](jailbreaking-deep-models.pdf)  
**Primary stack:** PyTorch, ResNet-34, DenseNet-121, ImageNet-1K subset, FGSM, I-FGSM, PGD, patch attacks

## Summary

This project evaluates how small adversarial perturbations can break a strong image classifier. The target model is a pretrained ResNet-34 evaluated on a curated 100-class subset of ImageNet-1K. The attacks are constrained by an L-infinity perturbation budget of **epsilon = 0.02**.

The strongest result is that iterative attacks almost completely collapse ResNet-34 accuracy. Clean top-1 accuracy is **76.00%**. Under I-FGSM or PGD, top-1 accuracy drops to **0.20%**. Patch-constrained attacks also reduce top-1 accuracy below **2%**, even though perturbations are restricted to a 32x32 region.

The project also tests transferability. Adversarial examples generated for ResNet-34 still degrade DenseNet-121, showing that the attacks are not purely model-specific.

## Problem

Image classifiers can be accurate on clean data but brittle under adversarial perturbations. The goal here is to quantify that brittleness under several attack types:

- full-image one-step attack,
- full-image iterative attack,
- localized patch attack,
- transfer attack against another architecture.

The report uses top-1 and top-5 accuracy to measure degradation.

## Dataset and Baseline

The evaluation dataset is a curated ImageNet-1K subset:

- 100 classes,
- labeled image folders,
- ImageNet normalization,
- batch size 32,
- no shuffling during evaluation.

Baseline ResNet-34 performance:

| Dataset | Top-1 | Top-5 |
|---|---:|---:|
| Clean ImageNet subset | 76.00% | 94.20% |

This clean result is the reference point for all attacks.

## Attack Methods

The attacks use the same perturbation budget:

```text
epsilon = 0.02
```

Attack configurations:

| Attack | Iterations | Region |
|---|---:|---|
| FGSM | 1 | Full image |
| I-FGSM | 5 | Full image |
| PGD | 10 | Full image |
| Patch I-FGSM | 10 | 32x32 patch |
| Patch PGD | 10 | 32x32 patch |

The perturbation check confirms that each attack stays within the L-infinity budget.

## Results on ResNet-34

Final attack results:

| Attack | Top-1 | Top-5 |
|---|---:|---:|
| Clean | 76.00% | 94.20% |
| FGSM | 6.00% | 35.40% |
| I-FGSM | 0.20% | 14.20% |
| PGD | 0.20% | 14.20% |
| Patch I-FGSM | 1.80% | 25.20% |
| Patch PGD | 1.60% | 25.20% |

The result is straightforward: one gradient step is damaging, but iterative attacks are much stronger. PGD and I-FGSM reduce top-1 accuracy from 76.00% to 0.20%.

Patch attacks are also highly effective. Restricting the perturbation to a 32x32 region does not protect the model. The model remains sensitive to localized adversarial patterns.

## Transferability

The same adversarial images were evaluated on DenseNet-121:

| DenseNet-121 Input | Top-1 | Top-5 |
|---|---:|---:|
| Original | 74.80% | 93.60% |
| FGSM from ResNet-34 | 63.40% | 89.20% |
| PGD from ResNet-34 | 65.00% | 91.40% |
| Patch PGD from ResNet-34 | 59.80% | 84.80% |

Transfer attacks are weaker than white-box attacks, but still meaningful. This matters because a black-box attacker can use a surrogate model to produce examples that harm a different target architecture.

## Findings

Iterative attacks are the most destructive under the same epsilon budget. The difference between FGSM and PGD shows that multiple projected steps find much stronger adversarial directions than a single gradient sign update.

Patch attacks are not weak just because they are local. A small spatial region can still dominate the classifier's decision.

Transferability confirms a practical security issue. The perturbations are not only exploiting ResNet-34 internals; they also affect a different architecture.

## Suggested Figures

- Bar chart: clean vs FGSM vs I-FGSM vs PGD top-1/top-5 accuracy.
- Transferability chart: DenseNet-121 accuracy by adversarial source.
- Visual grid: clean image, FGSM image, PGD image, patch attack image.
- Perturbation heatmap showing full-image vs localized attack.

## Limitations

- The dataset is a curated ImageNet subset, not full ImageNet.
- The work evaluates attacks, not defenses.
- Patch placement is fixed/random in the report; stronger optimized patch placement could be tested.
- Transferability is evaluated only on DenseNet-121.

## Final Claim

This project shows that a pretrained ResNet-34 can be almost completely broken by small L-infinity bounded adversarial perturbations. PGD and I-FGSM reduce top-1 accuracy from 76.00% to 0.20%, and localized patch attacks remain highly effective. The transfer results show that adversarial examples can generalize across architectures, which makes robustness a deployment concern rather than only a white-box evaluation issue.
