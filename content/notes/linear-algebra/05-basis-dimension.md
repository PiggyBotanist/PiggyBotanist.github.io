---
title: "05. Basis and Dimension"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, basis, dimension, geometry]
---

A basis provides a unique coordinate system for a vector space. The number of vectors in a basis defines the dimension of the space, which is invariant regardless of the choice of basis.

## 1. The Basis

A set of vectors $\mathcal{B} = \{\mathbf{v}_1, \dots, \mathbf{v}_n\}$ is a **basis** for a vector space $\mathcal{V}$ if:

1. $\mathcal{B}$ is **linearly independent**.
2. $\text{span}(\mathcal{B}) = \mathcal{V}$.

### 1.1 Unique Representation Theorem

If $\mathcal{B}$ is a basis for $\mathcal{V}$, then for every $\mathbf{x} \in \mathcal{V}$, there exists a **unique** set of scalars $c_1, \dots, c_n$ such that:

<p>
$$
\mathbf{x} = c_1 \mathbf{v}_1 + \dots + c_n \mathbf{v}_n
$$
</p>

The vector $[\mathbf{x}]_{\mathcal{B}} = [c_1, \dots, c_n]^T$ is the **coordinate vector** of $\mathbf{x}$ relative to $\mathcal{B}$.

## 2. Dimension

The **dimension** of a non-zero vector space $\mathcal{V}$, denoted $\dim(\mathcal{V})$, is the number of vectors in any basis for $\mathcal{V}$.

- If $\dim(\mathcal{V}) = n$, then:
  - Any set of more than $n$ vectors in $\mathcal{V}$ is linearly dependent.
  - Any set of fewer than $n$ vectors in $\mathcal{V}$ cannot span $\mathcal{V}$.
- **The Basis Theorem**: In an $n$-dimensional space, any set of $n$ linearly independent vectors is automatically a basis.

## 3. Standard Bases

- **In $\mathbb{R}^n$**: The standard basis is $\mathcal{E} = \{\mathbf{e}_1, \dots, \mathbf{e}_n\}$, where $\mathbf{e}_i$ has a $1$ in the $i$-th position and $0$ elsewhere.
- **In $\mathbb{P}_n$ (Polynomials)**: The standard basis is $\{1, x, x^2, \dots, x^n\}$. $\dim(\mathbb{P}_n) = n+1$.
- **In $\mathbb{M}_{m \times n}$ (Matrices)**: The standard basis consists of matrices $E_{ij}$ with a $1$ at $(i, j)$ and $0$ elsewhere. $\dim(\mathbb{M}_{m \times n}) = mn$.

## 4. Geometry in $\mathbb{R}^n$

### 4.1 Lines

A line in $\mathbb{R}^n$ is a 1-dimensional subspace (if it passes through the origin) or an affine set.

- **Vector Form**: $\mathbf{x} = \mathbf{p} + t\mathbf{v}$, where $\mathbf{p}$ is a point on the line and $\mathbf{v}$ is the direction vector.

### 4.2 Planes and Hyperplanes

- **Plane in $\mathbb{R}^3$**: A 2-dimensional surface defined by $\mathbf{x} = \mathbf{p} + s\mathbf{u} + t\mathbf{v}$.
- **Hyperplane in $\mathbb{R}^n$**: An $(n-1)$-dimensional subspace.
  - **Normal Equation**: $\mathbf{n} \cdot (\mathbf{x} - \mathbf{p}) = 0$, where $\mathbf{n}$ is the normal vector.
  - **Scalar Form**: $a_1 x_1 + a_2 x_2 + \dots + a_n x_n = b$.

## 5. Subspace Relations

For two subspaces $U, V \subseteq \mathcal{W}$:

- **Sum**: $U + V = \{ \mathbf{u} + \mathbf{v} : \mathbf{u} \in U, \mathbf{v} \in V \}$.
- **Intersection**: $U \cap V$ is also a subspace.
- **Grassmann's Identity**:
<p>
$$
\dim(U + V) = \dim(U) + \dim(V) - \dim(U \cap V)
$$
</p>
If $U \cap V = \{\mathbf{0}\}$, the sum is a **direct sum**, denoted $U \oplus V$.

---

## Practice

### **Problem 1: Basis Verification**

Determine if the set $S$ forms a basis for $\mathbb{R}^3$:

<p>
$$
S = \left\{ \begin{bmatrix} 1 \\ 0 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \right\}
$$
</p>
Justify your answer by checking linear independence and the spanning property for $\mathbb{R}^3$.

### **Problem 2: Finding a Subspace Basis**

Find a basis and the dimension for the subspace $W \subseteq \mathbb{R}^4$ defined by the following homogeneous system:

<p>
$$
\begin{aligned}
x_1 - 2x_2 + x_3 &= 0 \\
x_4 &= 0
\end{aligned}
$$
</p>

### **Problem 3: Dimension of Matrix Spaces**

Let $\mathcal{S}_n$ be the vector space of all $n \times n$ **symmetric matrices** ($A = A^T$).

1. For $n=2$, provide a basis for $\mathcal{S}_2$.
2. Prove that for any $n$, $\dim(\mathcal{S}_n) = \frac{n(n+1)}{2}$.

### **Problem 4: Subspace Intersection and Grassmann**

Let $U$ and $V$ be 5-dimensional subspaces of $\mathbb{R}^8$.

1. What is the **minimum** possible dimension of $U \cap V$?
2. What is the **maximum** possible dimension of $U \cap V$?
   _Hint: Use Grassmann's Identity and the fact that $\dim(U+V) \leq 8$._

### **Problem 5: Polynomial Space Constraints**

Consider $\mathbb{P}_3$ (polynomials of degree $\leq 3$). Let $W$ be the subset of polynomials $p(x)$ such that $p(1) = 0$ and $p'(0) = 0$.

1. Verify that $W$ is a subspace.
2. Find a basis for $W$ and state its dimension.

### **Problem 6: Rank and Basis of Fundamental Spaces**

Suppose a $4 \times 7$ matrix $A$ has 3 pivots.

1. What is the dimension of the column space $\text{Col}(A)$?
2. What is the dimension of the null space $\text{Null}(A)$?
3. Does $\text{Col}(A)$ span $\mathbb{R}^4$?
