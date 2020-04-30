Visualization coding practices primarily using [D3](http://d3js.org).

### Force-directed Graph

- Description

  Model the graph as a physical system — nodes are particles that repel each other, and links are springs that pull related nodes together — to determines the node positions. Based on strong theoretical foundations, such layout is usually  simple, aesthetic, interactive and of good quality. 

- without D3

  - implementation

    1. Generate nodes and links randomly

    2. Calculate **Repulsion** and **Attraction** 

       based on the  Coulomb's law $F_r=k_r\frac{q_1q_2}{r^2}$ and Hooke's law $F_s=k_s(x-x_0)$, we assume both $q_1$ and $q_2$ is equal to $1$, and adjust the constant coefficients to produce a pleasing effect.
  
    3. Update coordinates
    4. Go to step2 and iterate enough times
  
    5. Illustrate the graph
  
  - results
  
    <img src="F:\2019-2020(2)\iDVxLab\Practice\images\practice\ForceDirectedWithoutD3.jpg" style="zoom: 67%;" />
    
    *Figure 1a. 30 nodes iterating 1000 times* 
  
- With D3

  <img src="F:\2019-2020(2)\iDVxLab\Practice\images\practice\ForceDirected-1.jpg" style="zoom:67%;" />
  
    *Figure 1b. network of character co-occurence in Les Misérables illustrating with D3*

### Word Cloud



<img src="F:\2019-2020(2)\iDVxLab\Practice\images\practice\WordCloud.png" style="zoom: 67%;" />

​		*Figure 2 word cloud of "The Zen of Python, by Tim Peters"*

### Stacked Graph

<img src="F:\2019-2020(2)\iDVxLab\Practice\images\practice\StackedGraph.png" style="zoom: 50%;" />

​		*Figure 3 stacked(or stream) graph of randomly generalized data of 20 layers* 


### Scatter Plot Matrix