+++
title = "Linear_regression"
date = "2024-12-19T10:02:00-05:00"
weight = 1
draft = true
+++

### **Definition of Linear Model**:
The most basic form of linear equation can be defined as following:

$$
y = b + w_1x_1 + w_2x_2 \dots w_nx_n \tag{1}
$$

Where:
- **$y$** is the output (or predicted value)
- **$w_1, w_2, \dots, w_n$** are the weights (parameters) associated with the features
- **$x_1, x_2, \dots, x_n$ are the input features
- **$b$** is the bias (or y-intercept)

The linear equation above can also be simplied into its matrix form:

$$
y = X_\text{(n,m)}W_\text{m,1} + b \tag{2}
$$

Where:
- **$n$** is the number of samples (data points)
- **$m$** is the number of features (input variables)
- **$X$** is the feature matrix of size.
- **$W$** is the weight vector.

Important note:
- Bias term into the formula: $y = X_\text{(n,m+1)}W_\text{m+1,1}$ to simplify it further. But just make sure that if done in this way we always need to add columns of 1 to $X$.
- Also note that  