---
date: '2024-10-30T15:23:24-04:00'
draft: false
title: 'Maze Generator'
bookCollapseSection: false
weight: 20
---

# Maze Generator using p5.js

This project demonstrates a **Maze Generator** that uses a backtracking algorithm to generate and visualize mazes on an HTML canvas element. It utilizes the **p5.js** library for rendering and manipulating the canvas.

## Overview

The maze generator works by creating a grid of cells, where each cell has walls. The algorithm uses a **backtracking** method to carve out paths by recursively visiting neighboring cells, removing walls when moving between cells. When the algorithm reaches a dead-end, it backtracks to the previous cell and continues until the maze is fully generated.

## HTML Structure

The HTML structure of the project consists of a `div` element that acts as a container for the canvas. The canvas itself is where the maze will be drawn and updated.


<div style="text-align: center;">
    <div id="canvas"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/p5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.1/addons/p5.dom.min.js"></script>
    <script src="/experiments/maze_generator/sketch-v2.js"></script>
    <script src="/experiments/maze_generator/cell.js"></script>
</div>