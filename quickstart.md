# Quick Start

Before attempting any of these projects, you will need to set up your 
programming environment. All of these projects are written using the R 
programming language and will require R Studio along with some other packages. 

## Installing R

The first step is to install the R programming language. The R programming 
language is a high-level language designed specifically for statistics and  
data visualization.

Download R [here](https://cran.rstudio.com/). Select your
operating system, and follow the instructions provided.

## Installing R Studio

After you have successfully installed R, you will need to install R Studio.
R Studio is an Integrated Development Environment (IDE) specifically designed 
for the R programming language. 

IDEs can be thought of as word processors for code. R Studio provides users with 
syntax highlighting, package management, autocomplete, and many other features
that make it easier to write code.

Download R Studio [here](https://posit.co/download/rstudio-desktop/). Select
your operating system, and follow the instructions provided.

## Installing Tidyverse 

We will be using `tidyverse` in all of the projects. `tidyverse` is a software 
bundle that contains many commonly used packages. These are not included with 
R by default and must be installed.

In order to install `tidyverse`, type the following command into your R console 
and hit enter. 

```
install.packages("tidyverse")
```

`tidyverse` is a large package and may take time to download. 

To use `tidyverse` in an R script,  you have to load it into your environment 
using the `library` function. Take the following example.

```
library(tidyverse)
```

## Installing Tidy Tuesday 

Tidy Tuesday is a GitHub repository that publishes open datasets every Tuesday
for anyone to download and analyze. You can visit Tidy Tuesday 
[here](https://github.com/rfordatascience/tidytuesday). 

Tidy Tuesday has a R package that makes it easier to access weekly data 
challenges. You can install the `tidytuesday2` in R Studio. Type the following 
command in your R console and click enter.

```
install.packages("tidytuesday2")
```

