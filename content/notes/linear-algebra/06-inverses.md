---
title: "06. Matrix Inverses"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, inverse, gauss-jordan, operators]
---

An invertible matrix (or non-singular matrix) represents an operator that can be "undone." If $A$ maps $\mathbf{x}$ to $\mathbf{b}$, then $A^{-1}$ maps $\mathbf{b}$ back to $\mathbf{x}$.

## 1. Definition and Existence

A square matrix $A \in \mathbb{F}^{n \times n}$ is **invertible** if there exists a matrix $A^{-1}$ such that:

<p>
$$
AA^{-1} = A^{-1}A = I_n
$$
</p>

- **Uniqueness**: If an inverse exists, it is unique.
- **Existence Condition**: $A$ is invertible if and only if $\det(A) \neq 0$.
- **Singular Matrix**: A square matrix with no inverse ($\det(A) = 0$).

## 2. Calculation Methods

### 2.1 The $2 \times 2$ Case

For $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, the inverse is:

<p>
$$
A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}
$$
</p>

### 2.2 Gauss-Jordan Elimination

To find $A^{-1}$ for larger matrices, augment $A$ with the identity matrix and reduce to RREF:

<p>
$$
[A \mid I] \xrightarrow{\text{RREF}} [I \mid A^{-1}]
$$
</p>
If the left side cannot be reduced to $I$, $A$ is singular.

### 2.3 Adjugate Method

Using cofactors $C_{ij}$:

<p>
$$
A^{-1} = \frac{1}{\det(A)} \text{adj}(A) = \frac{1}{\det(A)} [C_{ji}]
$$
</p>

_Note: $\text{adj}(A)$ is the transpose of the cofactor matrix._

## 3. Algebraic Properties

1. **Involution**: $(A^{-1})^{-1} = A$.
2. **Reverse-order (Shoes-and-Socks)**: $(AB)^{-1} = B^{-1}A^{-1}$.
3. **Transpose**: $(A^T)^{-1} = (A^{-1})^T$.
4. **Scalar**: $(cA)^{-1} = \frac{1}{c}A^{-1}$ for $c \neq 0$.
5. **Product of Inverses**: $(A_1 A_2 \dots A_k)^{-1} = A_k^{-1} \dots A_2^{-1} A_1^{-1}$.

## 4. Solving Linear Systems

If $A$ is invertible, the system $A\mathbf{x} = \mathbf{b}$ has a **unique solution**:

<p>
$$
\mathbf{x} = A^{-1}\mathbf{b}
$$
</p>
This implies that $A\mathbf{x} = \mathbf{0}$ has only the trivial solution ($\mathbf{x} = \mathbf{0}$).

## 5. The Invertible Matrix Theorem (Summary)

For a square $n \times n$ matrix $A$, the following are equivalent:

- $A$ is invertible.
- $A$ is row-equivalent to $I_n$.
- $A$ has $n$ pivots.
- The columns of $A$ are linearly independent and span $\mathbb{R}^n$.
- $\det(A) \neq 0$.
- $0$ is not an eigenvalue of $A$.

---

## Practice

### **Problem 1: Verification**

Show that $B = \begin{bmatrix} 2 & -5 \\ -1 & 3 \end{bmatrix}$ is the inverse of $A = \begin{bmatrix} 3 & 5 \\ 1 & 2 \end{bmatrix}$ by computing their product.

### **Problem 2: 2x2 Parameterization**

For what value(s) of $k$ is the matrix $A = \begin{bmatrix} k & 2 \\ 2 & k \end{bmatrix}$ **not** invertible?

### **Problem 3: Solving via Inverse**

Given $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$ and $\mathbf{b} = \begin{bmatrix} 5 \\ 11 \end{bmatrix}$, solve the equation $A\mathbf{x} = \mathbf{b}$ by first calculating $A^{-1}$.

### **Problem 4: Matrix Equation Algebra**

Suppose $P, Q, R,$ and $S$ are invertible square matrices such that $P = Q R^{-1} S$. Express $R$ in terms of $P, Q,$ and $S$.
_Careful: Matrix multiplication is not commutative._

### **Problem 5: Block Matrix Inverse**

If $A$ and $D$ are invertible matrices, find the inverse of the block diagonal matrix:

<p>
$$
M = \begin{bmatrix} A & \mathbf{0} \\ \mathbf{0} & D \end{bmatrix}
$$
</p>
Verify your result by showing $MM^{-1} = I$.

### **Problem 6: Proof of Property**

Prove that if $A$ is invertible, then $A^T$ is also invertible and $(A^T)^{-1} = (A^{-1})^T$.
_Hint: Start from the definition $AA^{-1} = I$ and apply the transpose to both sides._
