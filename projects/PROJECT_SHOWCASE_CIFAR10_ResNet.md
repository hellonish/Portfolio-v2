# Improved ResNet for CIFAR-10 Classification

**Project type:** Computer vision, efficient CNN design, image classification  
**Paper link:** TODO: add external paper link  
**Source report:** [cifar-10-resnet.pdf](cifar-10-resnet.pdf)  
**Primary stack:** PyTorch, ResNet, CIFAR-10, SGD, OneCycleLR, dropout, label smoothing, mixed precision

## Summary

This project builds a parameter-efficient ResNet-style classifier for CIFAR-10. The model is designed to stay under a 5M parameter budget while keeping high validation accuracy.

The final model uses **4.17M parameters** and reaches:

- **98.71%** training accuracy,
- **94.31%** validation accuracy,
- **83.059%** Kaggle competition test accuracy.

The main engineering idea is not simply to make the network deeper. The model combines progressive filter scaling, residual blocks, dropout, batch normalization, label smoothing, and a OneCycleLR schedule to improve generalization under a compact parameter budget.

## Dataset

CIFAR-10 contains:

- 60,000 color images,
- 32x32 resolution,
- 10 classes,
- 50,000 training images,
- 10,000 test images.

The preprocessing pipeline uses:

- random crop from padded 40x40 images,
- random horizontal flip,
- tensor conversion,
- CIFAR-10 channel normalization.

These transformations give the model invariance to small spatial shifts and horizontal changes.

## Architecture

The model is an improved ResNet variant. The key design choice is progressive filter expansion:

```text
32 -> 64 -> 128 -> 192 -> 256
```

This is smaller than the standard ResNet expansion pattern and better suited for 32x32 images.

The network contains:

- initial 3x3 convolution with 32 filters,
- no initial max pooling, to preserve spatial detail,
- four residual stages,
- two residual blocks per stage,
- global average pooling,
- batch normalization,
- dropout,
- final linear classifier.

The residual block uses:

- two 3x3 convolutions,
- batch normalization,
- ReLU,
- dropout rate 0.2 after the first activation,
- identity shortcut when dimensions match,
- 1x1 convolution shortcut when dimensions change.

Dropout is applied at several points:

- 0.25 after the initial convolution,
- 0.2 inside residual blocks,
- 0.3 before classification.

## Parameter Budget

The final architecture has **4,167,850 parameters**:

| Component | Parameters |
|---|---:|
| Initial conv | 864 |
| Stage 1 | 94,720 |
| Stage 2 | 378,240 |
| Stage 3 | 910,848 |
| Stage 4 | 2,273,280 |
| Classification head | 3,082 |

Most capacity is placed in deeper stages, where the model learns higher-level visual features.

## Training

The training setup uses:

- optimizer: SGD,
- momentum: 0.9,
- Nesterov acceleration,
- weight decay: 0.0005,
- epochs: 120,
- batch size: 64,
- label smoothing: 0.1,
- gradient clipping: max norm 1.0,
- mixed precision training,
- OneCycleLR scheduler.

The scheduler starts at 0.01, peaks at 0.1, then follows cosine annealing. This helped training converge without manual learning-rate tuning.

Training showed three phases:

1. rapid learning from epochs 1-20,
2. slower improvement from epochs 21-80,
3. final refinement from epochs 81-120.

## Results

Final performance:

| Metric | Value |
|---|---:|
| Training accuracy | 98.71% |
| Validation accuracy | 94.31% |
| Kaggle test accuracy | 83.059% |
| Parameters | 4,167,850 |

The validation result shows strong generalization for a compact CNN. The larger drop on the Kaggle test set suggests a distribution difference between the validation split and the competition data.

## Findings

Progressive filter expansion gave a good accuracy-to-parameter tradeoff. The model stayed below 5M parameters while reaching 94.31% validation accuracy.

Regularization mattered. Dropout, weight decay, label smoothing, and augmentation together controlled overfitting even though training accuracy reached 98.71%.

OneCycleLR was important for stable convergence. The model benefited from a high peak learning rate followed by annealing.

Skipping the initial max pool was correct for CIFAR-10. At 32x32 resolution, early spatial downsampling would remove useful detail.

## Suggested Figures

- Architecture diagram with filter progression.
- Training/validation loss curves.
- Training/validation accuracy curves.
- Confusion matrix by CIFAR-10 class.
- Parameter distribution by stage.

## Limitations

- The model is evaluated on CIFAR-10 only.
- The Kaggle test score is lower than validation, suggesting distribution shift.
- The architecture is hand-designed, not searched.
- No comparison is included against modern lightweight alternatives such as ConvNeXt-Tiny or EfficientNet variants.

## Final Claim

This project shows that a carefully regularized ResNet-style CNN can achieve strong CIFAR-10 performance under a compact parameter budget. The final model reaches 94.31% validation accuracy with 4.17M parameters by combining residual learning, progressive filter scaling, data augmentation, dropout, label smoothing, and OneCycleLR training.
