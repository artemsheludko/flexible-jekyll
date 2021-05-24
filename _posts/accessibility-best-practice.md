---
layout: post
title: Site Accessibility Best Practices
---

# Site Accessibility Best Practices

## Summary

As the websites, and the digital services they provide, reach more
devices and users each year it’s imperative to focus on making the web
as accessible to all users. The [Center for Disease
Control](https://www.cdc.gov/media/releases/2018/p0816-disability.html)
places disabilities among Americans at 1 in 4, with an estimated 1.3
billion people internationally that suffer from visual impairments. For
most of these users, digital content is only consumable via a screen
reader such as JAWS (Job Access with Speech) or Windows Narrator. For
other users, physical limitations may require the use of a keyboard
without a mouse, in which case using “tab” to navigate a page is
necessity.

## Official Guidelines

As support for accessibility in the digital landscape grows, as do the
guidelines provided by agencies that track the needs of these users. The
main reference for this movement is a global standard known as the Web
Content Accessibility Guidelines 2.1 (WCAG). Per WCAG’s mission
statement, WCAG “covers a wide range of recommendations for making Web
content more accessible”. [These
guidelines](https://www.w3.org/TR/WCAG21/) exhaustively cover all major
and minor accessibility improvements and grade them in conformance from
**A (lowest)** to **AAA (highest)**. Some simple examples include:

> **A**: Color is not used as the only means of conveying information
>
> **AAA**: Sign Language Interpretation provided for audio-only media

A site can be graded using these guidelines based on how much
accessibility is built in. In some cases, this can be a sliding scale
for how much functionality is available. For example for keyboard
navigation:

> **A**: If keyboard focus can be moved to a component of the page using a
> keyboard interface, then focus can be moved away from that component
> using only a keyboard interface
>
> **AA**: Any keyboard operable user interface has a mode of operation where
> the keyboard focus indicator is visible.
>
> **AAA**: All Functionality for content is operable through the keyboard

## Klish Best Practices 

At Klish Group we’ve had the opportunity to work on sites that strive to
reach AAA accessibility ratings. Planning for accessibility needs to be
done early in the design phase and can effect everything from the color
palette to how site navigation is handled. So when it comes to component
design, we’ve developed a set of best practices to help ensure the
guidelines are adhered to.

1.  Adding in hidden “Accessibility Labels” alongside Call To Action
    buttons for screen readers (can also use “aria-label” to accomplish
    the same task, more below)

> Example:
>
> &lt;a href="\#" &gt;Donate Now &lt;span class="visually-hidden"&gt;to
> the American Red Cross Relief Fund.&lt;/span&gt;&lt;/a&gt;

2.  Human-readable custom ID fields for tables and complex web elements.

> &lt;table class=**"location-comparison-chart\_\_table
> data-table"**&gt;
>
> **   ** &lt;caption&gt;
>
> **       ** &lt;span class=**"visually-hidden"**&gt;**This is the
> summary for this data table! This is typically visually
> hidden.**&lt;/span&gt;
>
> **   ** &lt;/caption&gt;
>
> **   ** &lt;tr&gt;
>
> **       ** &lt;td&gt;*&nbsp;*&lt;/td&gt;
>
> **       ** &lt;th scope=**"col"** id=**"hospital-location-table"**
> class=**” locations-table"**&gt;
>
> **           ** &lt;span class=**"visually-hidden"**&gt;**Current
> Location:**&lt;/span&gt; **North Hospital Location**&lt;/th&gt;
>
> **       ** &lt;th scope=**"col"** id=**"south-hospital"**&gt; **South
> Hospital Location**&lt;/th&gt;
>
> **       ** &lt;th scope=**"col"** id=**"east-hospital"**&gt;**East
> Hospital Location**&lt;/th&gt;
>
> **   ** &lt;/tr&gt;
>
> **   ...**
>
> &lt;/table&gt;

3.  Providing “alt” text for all image tags. Adding the alt attribute
    addresses a handful of cases:

<!-- -->

1.  ALT tags can be used for keyword identification related to the
    > image, which can be leveraged by search engines.

2.  If an image cannot be displayed for some reason the ALT text will
    > replace the image, giving the user an idea of what should be
    > shown. These tags can also contain links to other pages/image to
    > provide additional information

3.  ALT tags provide a text alternative of the image for users on screen
    > readers.

> Example:
>
> &lt;img src="img\_girl.jpg" alt="Girl in a jacket"&gt;

4.  Using the Accessible Rich Internet Applications (ARIA) for providing
    extra context

&lt;nav aria-describedby=**"utility-nav-title"** role=**"navigation"**
class=**"utility-nav"**&gt;

In this case “role” is defining that this is a navigation-specific
element and “aria-describedby” contains a descriptive name to identify
this as a navigation bar for Utility links.

5.  Using “Skip Navigation” links to allow screen reader users to bypass
    large blocks of navigation content

Example:

> &lt;div href=**"\#skipContent"** class=**"visually-hidden"**
> id=**"sidebar-navigation-title"**&gt;**Skip navigation**&lt;/div&gt;

6.  Placing Navigation elements as close to the top of the DOM structure
    as possible aids with skipping sections of navigation. Otherwise by
    providing the above “skip navigation” button you risk skipping vital
    page content, like article titles.
