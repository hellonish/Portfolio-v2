# Beyond Natural Images: Cross-Domain Super-Resolution Benchmark

**Project type:** Computer vision, image reconstruction, domain shift, scientific imaging  
**Paper link:** TODO: add external paper link  
**Source report:** [atcv.pdf](atcv.pdf)  
**Primary stack:** EDSR, SwinIR, Stable Diffusion Upscaler, DIV2K, TextZoom, STAR, PSNR, SSIM, LPIPS

## Summary

This project studies whether super-resolution models trained on natural images can generalize to structured domains. Most reconstruction models are optimized around natural image priors: smooth gradients, dense textures, and locally correlated edges. Those assumptions break in other domains.

The benchmark compares three domains:

- **DIV2K:** natural images,
- **TextZoom:** text/document imagery with sharp binary transitions,
- **STAR:** astronomical imagery with sparse point sources and high dynamic range.

Three model families were evaluated:

- **EDSR:** CNN baseline trained on DIV2K,
- **SwinIR:** Transformer-based reconstruction model,
- **Stable Diffusion Upscaler:** pretrained generative super-resolution model.

The main result: architecture quality on natural images did not guarantee cross-domain robustness. Domain-specific fine-tuning recovered most of the lost performance, while zero-shot diffusion degraded severely on structured domains.

## Research Question

How well do modern super-resolution models generalize beyond natural images, and what failure modes appear under domain shift?

The project focuses on 2x super-resolution. The degradation model is:

```text
y = downsample(blur(x)) + noise
```

The reconstruction target is to recover a high-resolution image that preserves signal fidelity, not just visual plausibility.

## Experimental Setup

The benchmark uses both zero-shot transfer and domain-specific adaptation.

**EDSR-DIV2K:** trained from scratch on DIV2K for 30 epochs, then evaluated zero-shot on TextZoom and STAR.

**SwinIR-DIV2K:** fine-tuned from pretrained weights on DIV2K, then evaluated zero-shot on TextZoom and STAR.

**SwinIR-TextZoom / SwinIR-STAR:** fine-tuned from pretrained weights on target domains to measure adaptation gains.

**Stable Diffusion x4 Upscaler:** evaluated zero-shot across all domains.

Astronomical images were processed with an asinh stretch to preserve faint sources while compressing bright regions into a learnable range.

## Metrics

The evaluation uses:

- **PSNR:** pixel-level reconstruction fidelity,
- **SSIM:** structural similarity,
- **LPIPS:** perceptual similarity for diffusion outputs,
- **Cross-Domain Drop (CDD):** relative PSNR degradation from DIV2K to a target domain.

```text
CDD = (PSNR_source - PSNR_target) / PSNR_source * 100
```

CDD makes the domain-shift penalty explicit.

## Key Results

Source-domain performance on DIV2K:

| Model | DIV2K PSNR | DIV2K SSIM |
|---|---:|---:|
| EDSR-DIV2K | 30.15 | 0.9124 |
| SwinIR-DIV2K | 31.10 | 0.9253 |
| Diffusion | 27.15 | 0.7635 |

Zero-shot cross-domain PSNR:

| Model | DIV2K | TextZoom | STAR |
|---|---:|---:|---:|
| EDSR-DIV2K | 30.15 | 14.26 | 19.25 |
| SwinIR-DIV2K | 31.10 | 14.24 | 19.54 |
| Diffusion | 27.15 | 5.65 | 14.15 |

Cross-Domain Drop:

| Model | TextZoom CDD | STAR CDD |
|---|---:|---:|
| EDSR-DIV2K | 52.68% | 36.14% |
| SwinIR-DIV2K | 54.20% | 37.19% |
| Diffusion | 79.18% | 47.87% |

SwinIR had better source-domain performance, but did not improve zero-shot TextZoom transfer. EDSR had slightly lower relative drop, while SwinIR often had better absolute structure preservation.

## Domain Adaptation Results

Domain-specific SwinIR fine-tuning recovered most of the lost performance:

- SwinIR-TextZoom: **24.85 dB**, a **10.61 dB** gain over zero-shot.
- SwinIR-STAR: **22.91 dB**, a **3.37 dB** gain over zero-shot.

Text required more adaptation than astronomy. Sharp binary text structure is a larger shift from natural images than sparse astronomical structure.

## Findings

CNNs showed slightly better relative robustness, but Transformers gave better absolute performance in some target settings.

Diffusion models produced plausible natural-image outputs but failed on structured domains. The issue is not just lower PSNR. The model can hallucinate or smooth details that are functionally important for text or scientific imagery.

TextZoom was the hardest domain. High-frequency character edges and binary transitions were not recovered well by models trained on natural-image priors.

STAR was easier than TextZoom but still required adaptation. The model could preserve coarse structure but struggled with sparse high-frequency point sources.

## Suggested Figures

- Performance heatmap: models vs domains for PSNR.
- SSIM heatmap for structural preservation.
- Cross-Domain Drop bar chart.
- Qualitative triplets: low-resolution input, reconstruction, ground truth for DIV2K/TextZoom/STAR.
- Fine-tuning curve for SwinIR-STAR and SwinIR-TextZoom.

## Final Claim

This project builds a cross-domain benchmark for image super-resolution beyond natural images. The results show that natural-image performance does not imply robustness on structured domains. Domain-specific fine-tuning is necessary, diffusion priors are risky for scientific reconstruction, and evaluation needs both fidelity metrics and qualitative inspection.
