# Parameter-Efficient RoBERTa Fine-Tuning with LoRA for AG News

**Project type:** NLP, parameter-efficient fine-tuning, text classification  
**Paper link:** TODO: add external paper link  
**Source report:** [roberta_agnews.pdf](roberta_agnews.pdf)  
**Primary stack:** RoBERTa, LoRA, PEFT, Hugging Face, AG News, AdamW, knowledge distillation

## Summary

This project studies parameter-efficient fine-tuning for news classification under a strict trainable-parameter budget. The model uses RoBERTa with LoRA adapters on AG News and keeps trainable parameters under **1M**.

The goal is practical: adapt a transformer classifier without full fine-tuning. Full RoBERTa fine-tuning updates over 100M parameters. LoRA freezes the base model and trains small low-rank updates inside selected layers.

The strongest listed configuration trains about **796K parameters**, around **0.63%** of the full model, and reaches **92.97% validation accuracy**. The report records best inference accuracy in the mid-80s, with the comparison table listing **84.90%** for the best tuned distillation variant and **84.53%** for targeted LoRA modules.

## Dataset

AG News is a four-class news classification dataset:

- World,
- Sports,
- Business,
- Sci/Tech.

The dataset contains:

- 120,000 training samples,
- 7,600 test samples,
- balanced class distribution.

Each example contains a title and short description, so the model has to classify topic from short-form text.

## Method

The project tests three PEFT strategies:

1. **LoRA tuning:** vary rank and alpha across RoBERTa modules.
2. **Knowledge distillation:** train the student with soft labels from teacher models.
3. **Targeted adaptation:** apply LoRA only to selected attention and dense layers.

The final targeted setup adapts selected RoBERTa layers:

- early layers: 0, 1,
- middle layer: 5,
- later layers: 10, 11.

This layer choice gives coverage across base lexical features, intermediate representations, and task-specific features.

## LoRA Setup

The best targeted configuration uses:

- LoRA rank: 12,
- alpha: 32,
- adapter dropout: 0.05,
- trainable parameters: 796,420,
- output dropout: 20% before classification,
- optimizer: AdamW,
- learning rate: 3e-5,
- scheduler: cosine decay,
- warmup: 15%,
- weight decay: 0.1,
- gradient accumulation: 2,
- epochs: 5.

The model trains only adapter parameters and the classification path, not the full RoBERTa base.

## Training Metrics

The best validation run shows stable convergence:

| Epoch | Train Loss | Val Loss | Accuracy | F1 |
|---:|---:|---:|---:|---:|
| 1 | 0.2750 | 0.2975 | 0.9016 | 0.9014 |
| 2 | 0.2581 | 0.2380 | 0.9234 | 0.9235 |
| 3 | 0.2159 | 0.2293 | 0.9297 | 0.9296 |
| 4 | 0.2177 | 0.2252 | 0.9281 | 0.9281 |
| 5 | 0.2201 | 0.2247 | 0.9281 | 0.9281 |

The best validation accuracy is **92.97%**.

## Model Variants

| Configuration | Trainable Params | Val Acc. | Inf. Acc. |
|---|---:|---:|---:|
| LoRA only | 888,580 | 84.37% | 82.07% |
| LoRA + Distillation | 925,444 | 88.90% | 83.00% |
| LoRA + Distillation (Reduced) | 814,852 | 88.43% | 84.30% |
| LoRA + Distillation (Tuned) | 888,580 | 89.22% | 84.90% |
| Targeted LoRA Modules | 796,420 | 92.97% | 84.53% |

Targeted LoRA gives the strongest validation accuracy with the fewest trainable parameters. The tuned distillation variant gives the strongest inference accuracy in the comparison table.

## Findings

Adapter placement mattered more than simply adding more trainable parameters. Selectively adapting query/key attention layers and selected dense layers improved validation accuracy while staying under the 1M parameter budget.

Knowledge distillation improved inference performance in several variants, but did not dominate every metric. The best validation model and best inference model were not the same, which is important for model selection.

LoRA is effective for constrained fine-tuning. The targeted configuration trained less than 1% of the full model and still reached strong validation performance.

## Suggested Figures

- Diagram of full fine-tuning vs LoRA adapters.
- Bar chart: trainable parameters vs inference accuracy.
- Validation accuracy curve by epoch.
- Confusion matrix across AG News classes.
- Adapter placement diagram over RoBERTa layers.

## Limitations

- AG News is a small, balanced benchmark; results may differ on noisier text classification tasks.
- The report contains a minor mismatch between the headline inference number and the comparison table. I would cite the table values unless the final submission score confirms the higher number.
- Distillation setup depends on teacher quality and is not fully ablated across all adapter placements.
- No full fine-tuning baseline is included under the same evaluation protocol.

## Final Claim

This project shows that RoBERTa can be adapted for AG News classification with under 1M trainable parameters using targeted LoRA. The strongest targeted adapter setup reaches 92.97% validation accuracy with 796K trainable parameters, while tuned distillation gives the best listed inference accuracy. The main result is that careful adapter placement and parameter budgeting matter more than simply increasing the number of trainable LoRA modules.
