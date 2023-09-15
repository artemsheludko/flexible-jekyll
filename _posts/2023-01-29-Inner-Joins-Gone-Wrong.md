---
layout: post
title: "Inner Joins Gone Wrong?"
date: 2023-01-29 16:00 -07:00
description: How do Inner Joins work? Read and find out! # Add post description (optional)
img: inner_join.png # Add image post (optional)
---

 How do Inner Joins work? Read and find out!

While working on a guided project doing an inner join, I discovered a problem with the resulting table. I had checked the size of the two tables I was joining and expected my results to have a wider, but shorter table. The width grew as expected, but the number of rows increase by more than double! Perplexed, I took to the internet to dig deeper into the mechanics of joins and why my join was growing instead of shrinking. Turns out the variable I was joining on was not a primary key and so had duplicate values in both tables. It reality it was performing more of a cross join than an inner join.

I wanted to share my learning with my cohort and anyone else who wants to understand how an inner join (applies to other joins as well) behaves with primary and non-primary keys with duplicate values. The PDF below walks you through examples of the behavior of inner joins with unique values and duplicate values. 

<object data="../assets/docs/inner-joins-gone-wrong.pdf" width="700" height="750" type='application/pdf'></object>
