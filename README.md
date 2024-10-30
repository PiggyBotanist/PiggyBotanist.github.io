# R for Information Studies 

This website contains a few projects for those interesting in learning the R
programming language for Information Studies. These projects are intended for 
those of all skill levels. No programming experience is required!

If you have never used R before, make sure to visit the [R 101]({{ site.baseurl }}/r-101.html)
page for a brief overview of the language and other useful learning tools.

Before starting any of the weekly activates, make sure to visit the 
[quick start]({{ site.baseurl }}/quickstart.html) guide to install all of the 
necessary software to complete these projects!

## Weekly Activities
---
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ site.baseurl }}/{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
