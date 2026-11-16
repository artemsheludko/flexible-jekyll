---
title: "5+ years of experience with Technology X"
date: 2026-11-16
description: "AI made writing code cheap. What that does to the value of deep framework knowledge, what is still worth learning, and what years of experience actually measure."
tags: [career, ai, hiring]
---
"5+ years of experience with Technology X."

Almost every job ad has a line like this. For a long time I read it without thinking. Lately I can't read it without asking what exactly it measures. I think it's still a fair thing to ask for, but it's not as straightforward as it used to be. I'd like to share why.

I've worked in the industry for more than 15 years. The industry was always very dynamic and that is one of the reasons I still love it. There is always something new. Huge amount of information about things happening in the industry is coming daily and opinion about things can change quickly. The "quickly" 15 years ago and today are different. Back in the day people joked about new JavaScript frameworks coming out every 2 weeks. Today, by the time you finish writing your cool blog post about the latest AI coding tool, two new models have been released and half of the conclusions need to be changed.

We are in a weird state of the industry right now. Some teams adopted AI usage without code reviews and fearlessly deploy to prod and some still think it's just an advanced autocomplete. The gap between how much people trust AI and what it can do is enormous. As usual, both extremes can be dangerous and it isn't trivial to find the right balance.

I think that for a generalist engineer the value of maintaining deep expertise in a technology X is decreasing. If one builds a high-frequency trading bot the performance optimisation knowledge is incredibly valuable. If you are building a typical backend with a few requests per minute deep understanding of a JVM garbage collection isn't as important as the underlying problem that the backend solves. There will always be a need for specialists in areas where AI can't be trusted yet.

## How deep should I go?

I believe that today a developer doesn't need to know deep internals of a framework. Well, it's definitely beneficial to know some but one should make a choice how deep they want to go. Earlier it was good to know several technologies that you use daily really deep and scratch others on the surface. For example, it was great to know internals of Spring/React/&lt;insert another framework here&gt; but today having a magical box that can guide you through this is much easier now. Much more important is to know what are the general options available. It shifted from how to do something to what to do and what is even more important - what are the trade-offs. Don't get me wrong, what to do was always important but today it's the key element.

Breadth of knowledge is now more valuable than deep knowledge of one framework. You don't need to know all the answers but you need to know which questions to ask. However, it's important to understand that AI reduces the cost of accessing deep knowledge aka expertise, not the cost of making a mistake. More importantly, it's hard to recognize a problem in an area you don't understand. Sometimes you won't even notice a problem at first. So some depth is still worth having. Which one? I'll come back to that.

There is another shift: implementing functionality becomes cheaper than decision-making. Imagine having a performance issue in a system. Before it could take days investigating right tools, understanding framework internals, finding the problem and then implementing a solution. AI helps to reduce time of doing these steps significantly. However, there are lots of decisions to make: evaluate alternative solutions (eg architectural changes), how does one actually be sure that the improvement is real, does the complexity change after the optimisation is introduced and what are the trade-offs if there are any. In fact, AI helps to introduce bad decisions even faster. That's a real risk.

> AI makes writing code cheaper. It doesn't make building the right thing easier.

## What is important for a developer of today?

### Reading abilities

This sounds a bit funny but it's a bigger thing now than ever. Text creation is almost free now. You probably have a friend or a colleague who can send you 50 pages long PDF file describing an amazing multibillion startup plan. Intuition usually tells you that the author probably hasn't even read the thing themselves. So the skill is to decide when it's fine to skim through and when you have to pay a bit more attention. When AI spits out +1000/-1000 diff the brain goes into power saving mode and tells you not to waste energy on review. In the long summary attached to the changes it posted you see one crucial "Also simplified the retry logic" line. At the first sight it sounds like great news, but then you might miss the fact that no one asked for this simplification. Retry code only runs when something breaks, so all tests pass and the "simplified" yet broken code goes to prod.

It's fair to say that reading doesn't mean understanding. It's easy to fully relax and rely on the AI being smart. Some critical thinking and asking "what I wanted it to do" and "what it actually did" is incredibly important.

My rule: I skim what a machine will surely check for me with tests or a compiler. I read what only a person can check. I never send someone a text I haven't read myself, because they might assume I did.

### Fundamentals, system design

AI knows a lot about system design. It has read all the books with the animals on the cover. However, those books describe systems in general and AI might be missing some context about yours. It might not know your traffic isn't the same as Google or your budget unless you tell it. Also, it won't be the one woken up when things break.

Ask AI for a notification feature and you can get a queue, a worker and a retry mechanism in a few hours. It's a textbook design. Whether a database table and a scheduled job would have been enough is a question you have to ask because you are the one who will operate the extra moving part for years.

This is the depth that is still worth having: fundamentals. How a specific queue library works is something you can look up. This knowledge also expires quickly. What a queue costs you and what it gives you in return is something you have to know. That knowledge doesn't expire with the next framework version and it tells you when a perfectly good answer is the wrong one for your problem.

### UI/UX design

When building features is cheap, one developer can ship the whole thing. A designer might or might not be involved. The decision what user sees is now also part of a daily work for many developers that weren't doing any frontend work. Whether they wanted that or not. Generated interfaces work. Their problem is that they contain everything you mentioned. Your user table has nine columns, so the generated sign-up form has nine fields. It works. Every extra field is a reason for someone to give up and it's your task to ask if an email address would be enough to start. You don't have to become a designer. Look at products you enjoy using and ask why they feel good and watch how real people use yours.

### Product/domain knowledge

This is the context no model has (unless you tell it): why your customers pay, which principles your company is based on and which edge cases matter. Imagine users asking for CSV export. You build it in minutes, with every column. Later you find out that they open the file once a month to copy three totals for their accountant. If you had asked, you would have known which three numbers and could have put them on the screen. If every customer had given a different answer, you would have known that export is the right feature and which columns it needs.

When a feature took two weeks, someone asked whether it was worth building. When it takes minutes, nobody asks and the wrong feature gets built faster. So ask before you build: who needs this, and what do they do with it afterwards? The answers are in support tickets, sales calls and in conversations with the people who use your product.

Caution: the facts of one company's domain don't travel with you. The habit of asking who needs this does.

## Fair objections

**"All of this can be given to the model"**

It can, but only by someone who knows it matters.

**"If domain knowledge matters so much, let the domain expert build it with AI"**

They can judge only what they see on the screen. What happens under it and what it costs to change a year later is still the developer's part.

**"If building is so cheap, why think first? Just build it, look at it and rebuild"**

That works until real people use it. A feature is cheap to add and expensive to remove, because by then someone depends on it. Remove that CSV export a year later and your customer support will instantly receive rage messages.

**"Easy to say after 15 years"**

True. I had 15 years to build this judgment and I built it the slow way. How does someone starting today get it, when AI does most of the building?

Looking back, I got it from consequences: a migration that went wrong, a feature nobody used that still crashed prod, nights I was woken up. AI takes over most of the building. The consequences stay, as long as you are the one responsible for what gets shipped.

What did change is that understanding became optional. You can now ship things you don't understand. For a while. So if I were starting today, I would stay responsible for what I ship and I would use AI as the most patient senior colleague I ever had: ask it why, ask for alternatives, ask what can go wrong. It will sometimes be confidently wrong, like any senior colleague. Checking what it says against what actually happens is part of the learning.

I can't prove this works. Nobody has grown up with these tools yet. I know that for many people starting today, the harder problem is getting the first job at all. I don't have a fix for that.

## So, how many years?

Back to the line from the job ad: 5+ years of experience with Technology X.

I still think it's a fair thing to ask for and I understand why. Anyone who has interviewed has seen a CV listing a technology its owner can't explain. Years are a quick way to estimate something that is hard to measure: can this person be trusted with our system? It's a rough estimate. Ten years with Technology X can mean ten years of growth or the same year of selecting/inserting JSONs repeated ten times. The number doesn't say which. For the specialist roles I mentioned, years with X are exactly what you pay for. For everyone else, a good engineer can pick up Technology X faster than ever. Judgment still takes as long as it always did.

The way I see it, a senior engineer is someone who can take a complex and poorly defined problem and bring it to a consistently good result on their own. There is no technology in this definition and no number of years. Breaking a vague problem into clear tasks is the part that didn't get cheaper. Once the tasks are clear, writing the code was always the easier part. Now it's almost free.

## What to ask then?

If I were hiring today for a senior position, I would ask a different question: what is the least defined problem you have taken to a stable result and how did you know the result was right? It takes longer to answer than a number of years and harder to evaluate. For a senior hire, I think that's a fair price.
