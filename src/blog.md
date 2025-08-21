---
layout: layouts/base.njk
title: Blog
description: Latest posts and updates
---

# Blog

{% for post in collections.posts %}
  <article>
    <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    <time>{{ post.data.date | dateFormat }}</time>
    <p>{{ post.data.description }}</p>
  </article>
{% endfor %}