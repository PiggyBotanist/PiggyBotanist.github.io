---
title: "01. Vectors and Norms"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, functional analysis, optimization]
---

A vector $\mathbf{v} \in \mathbb{R}^n$ is an ordered $n$-tuple of real numbers, often represented as a column. Vectors are the basic objects in linear algebra and appear as feature vectors, parameter vectors, gradients, and encodings in high-dimensional manifolds.

## Basic Definitions

- **Zero vector**: $\mathbf{0} = [0, \ldots, 0]^T$.
- **Unit vector**: A vector $\mathbf{u}$ with $\|\mathbf{u}\| = 1$. To **normalize** a nonzero $\mathbf{v}$:
  <p>
  $$
  \hat{\mathbf{v}} = \frac{\mathbf{v}}{\|\mathbf{v}\|}
  $$
  </p>
- **Linear combination**: $\mathbf{w} = c_1 \mathbf{v}_1 + \cdots + c_k \mathbf{v}_k$ for scalars $c_i \in \mathbb{R}$.
- **Span**: The set of all linear combinations $\text{span}(\{\mathbf{v}_i\}) = \{ \sum c_i \mathbf{v}_i \}$.

## Vector Norms

A norm $\|\cdot\|$ maps vectors to non‑negative reals, inducing a topology on $\mathbb{R}^n$. The **$p$-norm** ($p \ge 1$) is defined as:

<p>
$$
\|\mathbf{v}\|_p = \left( \sum_{i=1}^n |v_i|^p \right)^{1/p}
$$
</p>

### Special Cases:

- **$L_1$ norm (Manhattan)**: $\|\mathbf{v}\|_1 = \sum_i |v_i|$. Used in sparse recovery (Lasso).
- **$L_2$ norm (Euclidean)**: $\|\mathbf{v}\|_2 = \sqrt{\sum_i v_i^2} = \sqrt{\mathbf{v}^T \mathbf{v}}$. This is the only $p$-norm induced by the standard inner product.
- **$L_\infty$ norm (max)**: $\|\mathbf{v}\|_\infty = \max_i |v_i|$.

## Norm Properties

Every norm must satisfy the following axioms for all $\mathbf{u}, \mathbf{v} \in \mathcal{V}$ and $c \in \mathbb{R}$:

1. **Definiteness**: $\|\mathbf{v}\| \ge 0$ and $(\|\mathbf{v}\| = 0 \iff \mathbf{v} = \mathbf{0})$.
2. **Homogeneity**: $\|c\mathbf{v}\| = |c|\ \|\mathbf{v}\|$.
3. **Triangle Inequality**: $\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$ (Minkowski's Inequality).

### Dual Norms

The dual norm is defined as $\|z\|_* = \sup \{ |z^T x| : \|x\| \le 1 \}$. By **Hölder's Inequality**:
$$|z^T x| \le \|z\|_q \|x\|_p \quad \text{where} \quad \frac{1}{p} + \frac{1}{q} = 1$$

## Metrics and Convergence

A norm induces a metric $d(\mathbf{x}, \mathbf{y}) = \|\mathbf{x} - \mathbf{y}\|$. A sequence $\{\mathbf{x}^{(k)}\}$ converges to $\mathbf{x}$ if:

<p>
$$\lim_{k \to \infty} \|\mathbf{x}^{(k)} - \mathbf{x}\| = 0$$
</p>

- **Equivalence of Norms**: In finite-dimensional spaces ($\mathbb{R}^n$), all norms are equivalent; they define the same open sets and the same convergence.
- **Banach Space**: A normed space that is complete (every Cauchy sequence converges within the space). $\mathbb{R}^n$ is a Banach space under any $p$-norm.
- **Hilbert Space**: A Banach space where the norm is induced by an inner product ($\|\mathbf{x}\| = \sqrt{\langle \mathbf{x}, \mathbf{x} \rangle}$). $\mathbb{R}^n$ is a Hilbert space under the $L_2$ norm.
