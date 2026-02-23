---
title: "07. Determinants"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, determinants, volume, permutations]
---

The determinant $\det(A)$ is a scalar value that characterizes a square matrix $A \in \mathbb{F}^{n \times n}$. Geometrically, it represents the factor by which the linear transformation $A$ scales $n$-dimensional volume.

## 1. Formal Definitions

### 1.1 Leibniz Formula

The determinant can be defined using permutations $\sigma$ of the set $\{1, \dots, n\}$:

<p>
$$
\det(A) = \sum_{\sigma \in S_n} \text{sgn}(\sigma) \prod_{i=1}^n a_{i, \sigma(i)}
$$
</p>
where $\text{sgn}(\sigma)$ is the signature of the permutation ($+1$ for even, $-1$ for odd).

### 1.2 Laplace Expansion (Cofactors)

Expanding along row $i$:

<p>
$$
\det(A) = \sum_{j=1}^n a_{ij} C_{ij}
$$
</p>
where the cofactor $C_{ij} = (-1)^{i+j} M_{ij}$, and $M_{ij}$ (the minor) is the determinant of the $(n-1) \times (n-1)$ matrix obtained by deleting row $i$ and column $j$.

## 2. Properties of the Determinant

1. **Multiplicativity**: $\det(AB) = \det(A)\det(B)$.
2. **Transpose**: $\det(A^T) = \det(A)$.
3. **Inversion**: $\det(A^{-1}) = \frac{1}{\det(A)}$.
4. **Scalar Scaling**: $\det(cA) = c^n \det(A)$ for $A \in \mathbb{F}^{n \times n}$.
5. **Row Operations**:
   - **Interchange**: Swapping two rows multiplies the determinant by $-1$.
   - **Scaling**: Multiplying a row by $k$ multiplies the determinant by $k$.
   - **Replacement**: Adding a multiple of one row to another does not change the determinant.

## 3. Geometric and Algebraic Significance

- **Invertibility**: $A$ is invertible $\iff \det(A) \neq 0$.
- **Volume**: In $\mathbb{R}^n$, the volume of the parallelepiped formed by the columns of $A$ is $|\det(A)|$.
- **Orientation**: If $\det(A) > 0$, the transformation preserves orientation; if $\det(A) < 0$, it reverses it.
- **Triangular Matrices**: For upper or lower triangular matrices, $\det(A) = \prod_{i=1}^n a_{ii}$.

## 4. Cramer's Rule

For a system $A\mathbf{x} = \mathbf{b}$ with invertible $A$, the $i$-th component of the solution is:

<p>
$$
x_i = \frac{\det(A_i(\mathbf{b}))}{\det(A)}
$$
</p>
where $A_i(\mathbf{b})$ is the matrix $A$ with its $i$-th column replaced by $\mathbf{b}$.

---

## Practice

### **Problem 1: Calculation via Row Reduction**

Compute the determinant of the following matrix by reducing it to upper triangular form:

<p>
$$
A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 9 \\ 3 & 9 & 19 \end{bmatrix}
$$
</p>

### **Problem 2: Determinant Identities**

Let $A$ and $B$ be $4 \times 4$ matrices with $\det(A) = -2$ and $\det(B) = 5$. Compute:

1. $\det(A^2)$
2. $\det(2B)$
3. $\det(A^T B^{-1})$

### **Problem 4: Vandermonde Determinant**

Show that for $n=2$, the determinant of the Vandermonde matrix:

<p>
$$
V = \begin{bmatrix} 1 & x_0 \\ 1 & x_1 \end{bmatrix}
$$
</p>
is $(x_1 - x_0)$. Generalize the result for $n=3$.

### **Problem 5: Block Matrix Determinants**

Prove that for a block triangular matrix of the form:

<p>
$$
M = \begin{bmatrix} A & B \\ \mathbf{0} & D \end{bmatrix}
$$
</p>
where $A$ and $D$ are square matrices, $\det(M) = \det(A)\det(D)$. Does this hold if the $\mathbf{0}$ block is non-zero?

### **Problem 6: Nilpotent Matrices**

Suppose $A$ is a square matrix such that $A^k = \mathbf{0}$ for some positive integer $k$. Prove that $\det(A) = 0$. What does this imply about the invertibility of nilpotent matrices?

### **Problem 7: Orthogonal Matrices**

Let $Q$ be an orthogonal matrix ($Q^T Q = I$). Prove that $\det(Q) = \pm 1$. Provide an example of a $2 \times 2$ orthogonal matrix with determinant $-1$.
