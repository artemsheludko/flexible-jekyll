---
layout: post
title: "What Do They Talk About In General Conference?"
date: 2022-11-01 13:32:20 +0300
description: Web Scraping and some text analysis of the talks given in General Conference from October 2022 # Add post description (optional)
img: gen_conf_oct_22_wordcloud.png # Add image post (optional)
---

Every first weekend of April and October, The Church of Jesus Christ of Latter-Day Saints gathers (virtually, now more than ever) to listen to the leadership of the Church speak. Topics are generally about the core doctrines and principles of the Gospel of Jesus Christ. It also includes specific guidance and direction for the Church and its members in regards to current world events or changes in Church administration.

I am a member of this Church and while listening to the speakers on October 2nd, I wondered, "What is talked about the most in General Confrence? I decdied to do a project to find out.

First, I looked up the talks from the April 2022 Conference on the Church's website ([https://www.churchofjesuschrist.org/][Church-Site]) and began to copy and paste the text from each talk in to a text a file. After a few talks, I realized this method was prone to lots of user error and would be very time consuming. I ended up inspecting the HTML code of the website and found that I could select a single line of HTML code that contained the body of the text and copy to my text file. This made the copy-and-pasting go much faster. There was just one problem: this method copied all of the HTML code surrounding the text too.

After spending some time on StackOverflow, I found a bit of Python Code that would help me strip away all of the HTML formating around my desired text, using the "re" library.

{% highlight python %}
import re
talks_text_clean = re.sub('<[^<]+?>', '', talks_text_html)
{% endhighlight %}

I then wrote the HTML-stripped text string to a new text file and loaded it into [www.wordart.com][WordArt] along with a picture of President and Prophet of the Church of Jesus Christ of Latter-Days speaking at the conference to create this word cloud,:

|![Word Cloud General Conference Apr 22]({{site.baseurl}}/assets/img/gc_apr_22_word_art.png)|
|:--:|
|*Word Cloud General Conference April 2022*|

The larger the word, the more often it was said. Of the 58,913 words spoken, "Christ" was said 321 times and was the most common word (excluding the most common English words such as and, the, of, etc.) 

This was a good start for what I wanted to do when the text of the October conference got released. Meanwhile, I had to figure out how do do the webscraping so that I wouldn't have to manually copy and paste that bit of HTML from each url. 

Following some online tuturials and more searching on StackOverflow, I wrote a script to scrape all 36 talks from the October conference, along with the speaker's last name from the URL. I used the "requests", "beautifulsoup4", and "requests-html==0.10.0" libraries. It took about 45 secs on average to run the web scraping and then write the talks into a text file. 

Again, I took the text into www.wordart.com and instead of using a picture of a speaker for the background image, I used the cover art the Church used for the print edition of the conference. 

|![Word Cloud General Conference Oct 22]({{site.baseurl}}/assets/img/gen_conf_oct_22_wordcloud.png)|
|:--:|
|*Word Cloud General Conference October 2022*|

"Christ" was again the focal word of the conference and paired with "Jesus" in nearly every instance. "Jesus Christ" was said 327 times out of the 59,183 words spoken. 

For some other text analysis, I used the "nltk" library. One of the interesting tools from it was this Lexical Dispersion Plot. I selected words of interest to see in what frequency and where in the text they appeared. 

|![Lexical Dispersion Plot Gen Conf Oct 22]({{site.baseurl}}/assets/img/genconf_oct22_dispersion_plot.png)|
|:--:|
|*Lexical Dispersion Plot General Conference October 2022*|

 Answering the question: What is talked about in our General Conference every Spring and Fall? They talk about Jesus Christ, love, God, faith, and many other things. In the future, I hope to expand on this analysis to break it down by Session and Speaker. Perhaps I can even make a Dashboard that will let you drill down or up on the fly.

 For copies of the files, see my GitHub project: [Jeff's NLP Project][github_project], the code files are: "htmlparser.ipynb", "gen_conf_web_scrape.ipynb" in the "General-Conference-Scrape" folder, "nlp_gf_a_22.ipynb", and "nlp_gf_o_22.ipynb". 

[Church-Site]: https://www.churchofjesuschrist.org/
[WordArt]: https://www.wordart.com/
[github_project]: https://github.com/jwig22/NLP_project