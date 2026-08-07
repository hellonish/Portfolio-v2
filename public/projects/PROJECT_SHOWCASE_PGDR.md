# PGDR: Gradient Disagreement for Shortcut-Bias Detection

**Project type:** ML robustness, shortcut learning, pseudo-group discovery  
**Paper link:** TODO: add external paper link  
**Source report:** [pgdr_final_report_nsharma.pdf](pgdr_final_report_nsharma.pdf)  
**Primary stack:** PyTorch, ResNet-50, Waterbirds, SGD, gradient analysis, group robustness evaluation

## Summary

This project studies shortcut learning as an incorrect inductive bias. A model can perform well on average while relying on a feature that is predictive in training but not part of the intended concept. In Waterbirds, the intended label is bird type, but the shortcut is background. Landbirds often appear on land, waterbirds often appear on water, and ERM can learn background instead of bird features.

Persistent Gradient Disagreement Reweighting (PGDR) tests a different signal for discovering shortcut-conflicting examples without training group labels. Instead of selecting examples only because they are misclassified, PGDR asks whether a hard example pushes the classifier in a different gradient direction than easy same-class examples.

The core result: PGDR improved Waterbirds worst-group accuracy from **68.38%** with ERM to **81.52%**, without using train group labels in the selected set or training loss. JTT still performed better on pure worst-group accuracy (**85.41%**), but PGDR gave a mechanism-driven signal for hidden group discovery.

## Problem

Average accuracy is not enough for spurious-correlation settings. A model can learn the dominant correlation and still fail badly on minority groups where that correlation breaks.

Waterbirds has four groups:

- landbird on land,
- landbird on water,
- waterbird on land,
- waterbird on water.

The shortcut-conflicting groups are landbird-on-water and waterbird-on-land. These groups define the real robustness test. The main metric is worst-group accuracy:

```text
WGA = min_g Accuracy(g)
```

PGDR was designed for the harder setting where group labels are not available during training.

## Method

The method starts with a warmup model. After warmup, each example receives a class margin:

```text
margin = logit(true class) - max logit(other class)
```

The bottom 15% by margin forms the hard set. For each hard example, PGDR computes the last-layer gradient and compares it with the average gradient of easy examples from the same class.

Low cosine alignment means the hard example is asking for a different classifier update than easy same-class examples. That disagreement is treated as evidence that the example may be shortcut-conflicting.

The selected pseudo-group is built through persistent low-cosine votes across snapshots:

- hard-set fraction: 0.15,
- low-cosine quantile: 0.25,
- snapshots: 3,
- required votes: 3,
- minimum selected set size: 20,
- loss mixing: 0.5 ERM set, 0.5 selected pseudo-group.

The final method keeps the selected pseudo-group fixed. Naive refresh was unstable.

## Baselines

The matched Waterbirds comparison used:

| Method | Train group labels? | Test WGA |
|---|---:|---:|
| ERM | No | 68.38 +/- 0.78 |
| JTT | No | 85.41 +/- 1.04 |
| GroupDRO | Yes | 83.84 +/- 0.26 |
| PGDR-FixedW | No | 81.52 +/- 0.91 |

GroupDRO is an oracle reference because it uses train group labels. JTT is the strongest label-free baseline.

## Main Finding

PGDR substantially improves over ERM without train group labels. The method does not beat JTT on worst-group accuracy, but it validates gradient disagreement as a useful pseudo-group signal.

The mechanism evidence is stronger than the final leaderboard number:

- AUC for hidden minority detection inside the hard set: **0.800**,
- AP: **0.576** against a **0.296** base rate,
- precision at PGDR budget: **0.595**,
- permutation p-value: **0.0002**.

This means low cosine-to-easy-gradient is not just an intuition. It is empirically enriched for shortcut-conflicting examples.

## Failure Modes

The main failure mode is warmup quality. When warmup is weak, the gradient signal is weak. The WeakWarmup ablation reached only **66.51% WGA**, close to ERM.

Refresh also failed. After reweighting starts changing the classifier, the same low-cosine rule no longer selects a clean pseudo-group. The RefreshNoOracle ablation had AUC **0.465**, below useful signal.

The method also has a precision-recall tradeoff. PGDR selects a cleaner but smaller pseudo-group. JTT selects a broader error set, which can cover more minority examples and improve WGA.

## Suggested Figures

- Waterbirds four-group visual: aligned vs shortcut-conflicting examples.
- Bar chart: ERM, JTT, GroupDRO, PGDR WGA.
- Pipeline diagram: warmup -> hard set -> gradient disagreement -> persistent selected set -> reweighted training.
- Mechanism chart: AUC/AP/precision@budget for FixedW, NoPersistence, WeakWarmup, RefreshNoOracle.

## Final Claim

PGDR is a label-free pseudo-group discovery method for shortcut learning. It uses persistent last-layer gradient disagreement to find examples that conflict with the model's learned shortcut and reweights them during training. On Waterbirds, it improves WGA by about 13 points over ERM and shows that gradient geometry can expose hidden shortcut-conflicting examples without train group labels.
