---
title: "02. Geometry and Products"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, geometry, inner products, cross products]
---

Geometry in $\mathbb{R}^n$ is induced by the **inner product**, which allows for the definition of angles, orthogonality, and projections.

## 1. Inner Product Spaces (IPS)

An inner product $\langle \cdot, \cdot \rangle$ on a vector space $\mathcal{V}$ is a mapping $\mathcal{V} \times \mathcal{V} \to \mathbb{F}$ satisfying:

1. **Conjugate Symmetry**: $\langle \mathbf{u}, \mathbf{v} \rangle = \overline{\langle \mathbf{v}, \mathbf{u} \rangle}$.
2. **Linearity**: $\langle c\mathbf{u} + \mathbf{w}, \mathbf{v} \rangle = c\langle \mathbf{u}, \mathbf{v} \rangle + \langle \mathbf{w}, \mathbf{v} \rangle$.
3. **Positive Definiteness**: $\langle \mathbf{v}, \mathbf{v} \rangle \ge 0$ and $\langle \mathbf{v}, \mathbf{v} \rangle = 0 \iff \mathbf{v} = \mathbf{0}$.

The **standard dot product** in $\mathbb{R}^n$ is $\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = \sum u_i v_i$.

## 2. Geometric Interpretations

### 2.1 Angles and Orthogonality

The angle $\theta$ between two vectors in $\mathbb{R}^n$ is given by:

<p>
$$
\cos \theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\|_2 \|\mathbf{v}\|_2}
$$
</p>

- **Orthogonality**: $\mathbf{u} \perp \mathbf{v} \iff \mathbf{u} \cdot \mathbf{v} = 0$.
- **Pythagorean Theorem**: If $\mathbf{u} \perp \mathbf{v}$, then $\|\mathbf{u} + \mathbf{v}\|^2 = \|\mathbf{u}\|^2 + \|\mathbf{v}\|^2$.

### 2.2 Projections and Components

The **orthogonal projection** of $\mathbf{u}$ onto $\mathbf{v}$ is the vector in $\text{span}(\mathbf{v})$ closest to $\mathbf{u}$:

- **Projection operator**: $\text{proj}_{\mathbf{v}} \mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|^2} \mathbf{v}$
- **Scalar component**: $\text{comp}_{\mathbf{v}} \mathbf{u} = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{v}\|}$

The projection can be represented by a **projection matrix** $P$:

<p>
$$
P = \frac{\mathbf{v}\mathbf{v}^T}{\mathbf{v}^T \mathbf{v}} \implies \text{proj}_{\mathbf{v}} \mathbf{u} = P\mathbf{u}
$$
</p>

## 3. Cross Product

Unlike the dot product, the cross product is specific to $\mathbb{R}^3$ (and $\mathbb{R}^7$).

- **3D Definition**: $\mathbf{w} = \mathbf{u} \times \mathbf{v} = \|\mathbf{u}\| \|\mathbf{v}\| \sin \theta \, \mathbf{n}$, where $\mathbf{n}$ follows the right-hand rule.
- **Determinant Form**:

<p>
  $$
  \mathbf{u} \times \mathbf{v} = \det \begin{bmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{bmatrix}
  $$
</p>

- **2D Cross Product (Scalar)**: In $\mathbb{R}^2$, $\mathbf{u} \times \mathbf{v} = u_1 v_2 - u_2 v_1$. This represents the signed area of the parallelogram formed by $\mathbf{u}$ and $\mathbf{v}$.

## 4. Fundamental Inequalities

1. **Cauchy-Schwarz Inequality**:
   $|\mathbf{u} \cdot \mathbf{v}| \le \|\mathbf{u}\| \|\mathbf{v}\|$. Equality holds iff $\mathbf{u}$ and $\mathbf{v}$ are linearly dependent.
2. **Triangle Inequality**:
   $\|\mathbf{u} + \mathbf{v}\| \le \|\mathbf{u}\| + \|\mathbf{v}\|$.
3. **Parallelogram Law**:
   $2\|\mathbf{u}\|^2 + 2\|\mathbf{v}\|^2 = \|\mathbf{u} + \mathbf{v}\|^2 + \|\mathbf{u} - \mathbf{v}\|^2$.

## 5. Polarization Identity

In a real inner product space, the inner product can be recovered entirely from the norm:

<p>
$$
\mathbf{u} \cdot \mathbf{v} = \frac{1}{4} \left( \|\mathbf{u} + \mathbf{v}\|^2 - \|\mathbf{u} - \mathbf{v}\|^2 \right)
$$
</p>
This implies that the geometry (angles) is fully determined by the metric (lengths) in $L_2$.

---

## Practice

$a$ and $b$ are vectors:

1. Prove: $\|a+b\|^2 + \|a-b\|^2 = 2\|a\|^2 + 2\|b\|^2$
2. Prove: $a \cdot b = \frac{1}{4} \|a+b\|^2 - \frac{1}{4} \|a-b\|^2 $
3. Prove that the distance from $ax + by + c = 0$ to $P_0(x_0, y_0)$ is:

$$
D = \frac{\|ax_0 + by_0 + c\|}{\sqrt{a^2 + b^2}}
$$
