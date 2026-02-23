---
title: "04. Linear Combinations and Span"
date: 2026-02-18
draft: false
math: true
showToc: true
tags: [linear algebra, span, rref, independence]
---

Linear combinations allow us to build new vectors from existing ones. The collection of all such vectors defines the **Span**, which geometrically represents the subspace reachable by a set of vectors.

## 1. Linear Combinations

A vector $\mathbf{w}$ is a **linear combination** of a set $S = \{\mathbf{v}_1, \dots, \mathbf{v}_k\}$ if there exist scalars $c_i \in \mathbb{F}$ such that:

<p>
$$
\mathbf{w} = \sum_{i=1}^k c_i \mathbf{v}_i = c_1 \mathbf{v}_1 + c_2 \mathbf{v}_2 + \dots + c_k \mathbf{v}_k
$$
</p>

- **Matrix-Vector View**: If $A = [\mathbf{v}_1 \dots \mathbf{v}_k]$, then $A\mathbf{x} = \mathbf{w}$ is exactly the linear combination of the columns of $A$ weighted by the components of $\mathbf{x}$.

## 2. Span

The **Span** of a set $S$ is the set of all possible linear combinations of vectors in $S$:

<p>
$$
\text{span}(S) = \left\{ \sum c_i \mathbf{v}_i : c_i \in \mathbb{F} \right\}
$$
</p>

- **Subspace Property**: $\text{span}(S)$ is always a subspace of the ambient space $\mathcal{V}$. It is the smallest subspace containing all vectors in $S$.
- **Consistency**: $A\mathbf{x} = \mathbf{b}$ is consistent if and only if $\mathbf{b} \in \text{span}(\text{columns of } A)$.

## 3. Linear Independence

A set $\{\mathbf{v}_1, \dots, \mathbf{v}_k\}$ is **linearly independent** if the vector equation:

<p>
$$
\sum_{i=1}^k c_i \mathbf{v}_i = \mathbf{0}
$$
</p>
has only the **trivial solution** ($c_i = 0$ for all $i$).

- **Linear Dependence**: If a non-trivial solution exists, at least one vector can be written as a linear combination of the others.
- **Null Space Relation**: The columns of $A$ are independent if and only if $\mathcal{N}(A) = \{\mathbf{0}\}$.

## 4. Row Echelon Form (REF) and RREF

We use **Elementary Row Operations** to reduce a matrix to forms that reveal dependency and span.

### 4.1 Row Echelon Form (REF)

A matrix is in **REF** if:

1. All non-zero rows are above all zero rows.
2. Each leading entry (pivot) of a row is in a column to the right of the pivot of the row above it.
3. All entries in a column below a pivot are zero.

### 4.2 Reduced Row Echelon Form (RREF)

A matrix is in **RREF** if it is in REF and:

1. Every pivot is $1$.
2. Each pivot is the only non-zero entry in its column.

**The RREF of a matrix is unique.**

## 5. Summary of System Solutions

For a system $[A | \mathbf{b}]$:

- **Consistent**: No row in the RREF looks like $[0 \dots 0 | \text{non-zero}]$.
- **Unique Solution**: Every column of $A$ has a pivot.
- **Infinitely Many Solutions**: The system is consistent and there is at least one column without a pivot (**Free Variable**).

## 6. Fundamental Links

For $n$ vectors in $\mathbb{R}^n$:

- They are **independent** $\iff$ the matrix $A$ has $n$ pivots $\iff \det(A) \neq 0$.
- They **span** $\mathbb{R}^n$ $\iff$ the matrix $A$ has $n$ pivots $\iff \det(A) \neq 0$.

---

## Practice

### **Problem 1: Linear Combinations of Independent Vectors**

Suppose the set of vectors $\{\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_3\} \subset \mathbb{R}^n$ is **linearly independent**. Define a new set of vectors:

<p>
$$
\mathbf{w}_1 = \mathbf{v}_1 + \mathbf{v}_2, \quad \mathbf{w}_2 = \mathbf{v}_2 + \mathbf{v}_3, \quad \mathbf{w}_3 = \mathbf{v}_3 + \mathbf{v}_1
$$
</p>
Is the set $\{\mathbf{w}_1, \mathbf{w}_2, \mathbf{w}_3\}$ linearly independent? Prove your answer using the definition $\sum c_i \mathbf{w}_i = \mathbf{0}$.

### **Problem 2: Matrix Products and Span**

Let $A \in \mathbb{R}^{m \times n}$ and $B \in \mathbb{R}^{n \times p}$. Let $C = AB$.

1. Prove that the **column space** (span of the columns) of $C$ is a subspace of the column space of $A$.
2. Prove that $\text{rank}(AB) \leq \min(\text{rank}(A), \text{rank}(B))$.
   _Hint: Use the column-wise perspective of matrix multiplication._

### **Problem 3: Finding the Condition for Span**

Consider the vectors:

<p>
$$
\mathbf{v}_1 = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}, \quad \mathbf{v}_2 = \begin{bmatrix} 4 \\ 5 \\ 6 \end{bmatrix}, \quad \mathbf{b} = \begin{bmatrix} b_1 \\ b_2 \\ b_3 \end{bmatrix}
$$
</p>
Use row reduction on the augmented matrix $[ \mathbf{v}_1 \,\, \mathbf{v}_2 \mid \mathbf{b} ]$ to find the specific linear constraint on $b_1, b_2, b_3$ that must be satisfied for $\mathbf{b}$ to be in $\text{span}(\mathbf{v}_1, \mathbf{v}_2)$.

### **Problem 4: Polynomial Space Independence**

Linear algebra concepts apply to any vector space. Consider the space of polynomials of degree $\leq 2$, denoted $\mathbb{P}_2$.
Determine if the following set is linearly independent:

<p>
$$
p_1(x) = 1, \quad p_2(x) = 1 + x, \quad p_3(x) = 1 + x + x^2
$$
</p>
*Note: Treat the coefficients as components of a vector in $\mathbb{R}^3$.*

### **Problem 5: RREF and the Identity Matrix**

Let $A$ be an $n \times n$ square matrix.

1. If the RREF of $A$ is $I_n$, what can you conclude about the span of the columns of $A$?
2. If the RREF of $A$ has a row of zeros, what does this imply about the linear independence of the rows of $A$?

### **Problem 6: The Homogeneous System**

Suppose a $5 \times 8$ matrix $A$ has $5$ pivot columns.

1. Is the system $A\mathbf{x} = \mathbf{0}$ guaranteed to have non-trivial solutions?
2. Does the span of the columns of $A$ equal $\mathbb{R}^5$?
3. How many **free variables** are in the general solution?
