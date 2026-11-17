---
title: "5+ years of experience with Technology X"
date: 2026-11-16
description: "AI made writing code cheap. What that does to the value of deep framework knowledge, what is still worth learning, and what years of experience actually measure."
tags: [career, ai, hiring]
---
"5+ years of experience with Technology X."
Almost every job ad has a line like this. For all my 15 years in the industry I read it with a weird feeling. Lately I can't read it without asking what exactly it measures. I think it's still a fair thing to ask for, but it now measures something different. I'd like to share why.
 
Engineers have said for decades that typing code is not the hard part, so that idea is not new. What is new is the price. With AI, a first working version of almost anything costs very little, while making it correct, useful and maintainable did not get cheaper. Understanding became optional. You can now ship things you don't understand. For a while.
 
That changes what the job ad line measures. Years with Technology X stood for three things: you know its details, you have run it in production and seen how it fails and you have judgment. The first is now cheap to look up. The second still matters. The third was never about Technology X.
 
I'm writing about generalists here: people who build typical products. Specialists are a different case. Where requirements are extreme (a trading system that counts microseconds, a database engine, security-critical code), depth in the technology is the job and a subtle mistake costs too much to take an answer on trust. There are fewer such roles and I don't think they are going away.
 
How deep should I go?
The question isn't breadth or depth. It's which depth.
 
Earlier it was good to know several technologies that you use daily really deep and scratch others on the surface. The knowledge of internals of Spring/React/<insert another framework here> by heart made you visibly faster (smarter?) than a colleague who had to look them up. Today both of you have a magical box that can walk you through those internals when needed. Much more important is to know what are the general options available. It shifted from how to do something to what to do and what is even more important - what are the trade-offs. Don't get me wrong, what to do was always important but today it became even more important, I will get back to it later.
 
Details of a framework you can look up when you know you need them. Fundamentals are what tell you there is something to look up: how data stays consistent, what happens when a call fails, what one more component costs to run and what could be the risks. You don't need to know all the answers but you need to know which questions to ask. However, it's important to understand that AI reduces the cost of looking things up, not the cost of making a mistake. More importantly, it's hard to recognize a problem in an area you don't understand. Sometimes you won't even notice a problem at first.
 
This is the old idea of the T-shaped engineer: broad knowledge, deep in a few places. What moved is where the depth goes.
 
There is another shift: implementing functionality becomes cheaper than decision making. Imagine having a performance issue in a system. Before it could take days investigating right tools, understanding framework internals, finding the problem and then implementing a solution. AI helps to reduce time of doing these steps significantly. However, there are lots of decisions to make: evaluate alternative solutions (eg architectural changes), how does one actually be sure that the improvement is real, does the complexity changes after the optimisation is introduced and what are the trade-offs if there are any. Being sure means having a baseline, doing changes one by one and having a check for regressions. AI can run all of that, but it's your job to decide what counts as representative. In fact, AI helps to introduce bad decisions even faster. That's a real risk.
 
[AI makes code cheap and options cheap. Choosing between them, and answering for the choice, is still your job.]
 
What is important for a developer of today?
Everything below is a version of one question: how do you know the result is right?
 
Reading and checking
This sounds a bit funny but it's a bigger thing now than ever. Text creation is almost free now. You probably have a friend or a colleague who can send you 50 pages long PDF file describing an amazing multibillion startup plan. Intuition usually tells you that the author probably haven't even read the thing himself. So the skill is to decide when it's fine to skim through and when you have to pay a bit more attention. When AI spits out +1000/-1000 diff the brain goes into power saving mode and tells you not to waste energy on review. In the long summary attached to the changes it posted you see one crucial "Also simplified the retry logic" line. At the first sight it sounds like great news, but then you might miss the fact that no one asked for this simplification. Retry code only runs when something breaks, so all tests pass and the "simplified" yet broken code goes to prod.
It's fair to say that reading doesn't mean understanding. It's easy to fully relax and rely on the AI being smart. Some critical thinking and asking "what I wanted it to do" and "what it actually did" is incredibly important.
My rule: I skim what a machine will surely check for me with tests or a compiler. I read what only a person can check. The hard part is knowing which is which. One hint: code that only runs when something breaks is rarely covered. Also, I never send someone a text I haven't read myself, because they might assume I did.
 
Fundamentals, system design
AI knows a lot about system design. It has read all the books with the animals on the cover. However, those books describe systems in general and AI might be missing some context about yours. It might not know your traffic isn't the same as Google or your budget unless you tell it. Tell it and it will use the information. What you can't give it is the consequences: it won't be the one woken up when things break.
 
Ask AI for a notification feature and you can get a queue, a worker and a retry mechanism in minutes. It's a textbook design. If a database table and a scheduled job would have been enough is a question you have to ask because you are the one who will operate the extra moving part for years.
This is the depth I mean: fundamentals. How a specific queue library works is something you can look up. This knowledge also expires quickly. What a queue costs you and what it gives you in return is something you have to know. That knowledge doesn't expire with the next framework version and it tells you when a perfectly good answer is the wrong one for your problem. Five years with a queue library doesn't tell me whether someone knows when not to use a queue.
 
Product, UX and domain knowledge
When building features is cheap, one developer can ship the whole thing. A designer might or might not be involved. The decision what user sees is now also part of a daily work for many developers that weren't doing any frontend work. Whether they wanted that or not.
Most of what that decision needs is not written down anywhere, so no model has it until someone goes and gets it: why your customers pay, which principles your company is based on and which edge cases matter. Someone also has to decide what counts as success and check that it happened.
Generated features work. Their problem is that they contain everything you mentioned. Imagine users asking for CSV export of data. You have a first version in minutes, with every column from the table. Later you find out that users open the file once a month to copy three totals for their accountant. If you would ask, you would have known which three numbers and could have put them on the screen. If every customer had given a different answer, you would have known that export is the right feature and which columns it needs.
When a feature took two weeks, someone usually asked whether it was worth building. When a first version takes minutes, often nobody does and the wrong feature gets built faster. So ask before you build: who needs this and what do they do with it afterwards? The answers are in support tickets, sales calls and in conversations with the people who use your product.
Caution: the facts of one company's domain don't travel with you. The habit of asking who needs this does. No job ad asks for that habit.
When talking about UI, of course no one expects a software engineer to do job of a full time designer. You don't have to become a designer. Look at products you enjoy using and ask why they feel good and watch how real people use yours.
 
Fair objections
**"All of this can be given to the model"**
It can, but only by someone who knows it matters. When a model has everything, someone still has to say what a good result is, check it and be responsible for it.
**"If domain knowledge matters so much, let the domain expert build it with AI"**
Some will and for simple tools that's fine. However, the complexity of maintenance under the screen doesn't disappear because a non-developer generated it. Someone has to answer for correctness, security, reliability and what it costs to change a year later. Whoever does that is doing the developer's job, whatever their title.
**"If building is so cheap, why think first? Just build it, look at it and rebuild"**
That works until real people use it. A feature is cheap to add and expensive to remove, because by then someone depends on it. Remove that CSV export a year later and your customer support will instantly receive rage messages.
**"Easy to say after 15 years"**
True. I had 15 years to build this judgment and I built it the slow way. How does someone starting today get it, when AI does most of the building?
Looking back, I got it from consequences: a migration that went wrong, a feature nobody used but crashed prod, nights I was woken up. AI takes over most of the building. The consequences stay, as long as you are the one responsible for what gets shipped.
What did change is what I started with: understanding became optional. So if I were starting today, I would not take that option. I would stay responsible for what I ship and I would go deep in one thing at least once. Not because that knowledge will last but because depth is where you meet consequences.
In practice: before accepting a solution, I would write down what I expect to break. I would find one thing in the generated code I can't explain and chase it. When something fails in production, I would trace it myself before asking. And I would stay on one system long enough to see my own decisions fail.
I would also use AI as the most patient senior colleague I ever had: ask it why, ask for alternatives, ask what can go wrong. It will sometimes be confidently wrong, like any senior colleague. Checking what it says against what actually happens is part of the learning.
 
I can't prove this works. Nobody has grown up with these tools yet. I know that for many people starting today, the harder problem is getting the first job at all. I don't have a fix for that.
 
Back to the line from the job ad: 5+ years of experience with Technology X.
I still think it's a fair thing to ask for and I understand why. Anyone who has interviewed has seen a CV listing a technology its owner can't explain. Years are a quick way to estimate something that is hard to measure: can this person be trusted with our system?
Remember the three things the years stood for. The details of X are cheap to look up now. Having run X in production still matters: if a team needs someone productive next week, a person who knows the stack's tooling, its limits and its old mistakes is worth paying for and years are a reasonable sign of that. For the specialist roles I mentioned, years with X are exactly what you pay for.
About judgment the number says nothing. It's a rough estimate. Ten years with Technology X can mean ten years of growth or the same year of selecting/inserting JSONs repeated ten times. The number doesn't say which. A good engineer can pick up Technology X faster than ever. Judgment can't be looked up. It comes from being wrong about something real. AI can make that loop faster, but it can't skip it.
The way I see it, a senior engineer is someone who can own a complex and poorly defined problem and bring it to a consistently good result: knowing what to decide, what to check, when to involve others and when not to build at all. There is no technology in this definition and no number of years. Breaking a vague problem into clear tasks is the part that didn't get cheaper. Once the tasks are clear, writing the code was always the easier part. Now a first version is almost free. Checking it and living with it are not.
 
What to ask then?
In the job ad, I would replace the number with what it stands for. When the stack matters: "has run X in production and been on call for it". When it doesn't: "has owned a system in production end to end". Both can still be checked on a CV.
In the interview, if I were hiring today for a senior position, I would ask a different question: what is the least defined problem you have taken to a stable result and how did you know the result was right? Then I would keep asking: what did you consider and reject, what evidence did you have, what went wrong, what did you decide not to build? A good storyteller can answer the first question. The follow-ups are harder to rehearse.
This would have been a good question ten years ago too. But ten years ago the person who could build the thing was usually the person who understood it. That is no longer guaranteed, so I have to ask.
It takes longer to answer than a number of years and harder to evaluate. For a senior hire, I think that's a fair price.
 