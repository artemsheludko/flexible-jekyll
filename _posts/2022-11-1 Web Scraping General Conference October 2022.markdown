Every first weekend of April and October, The Church of Jesus Christ of Latter-Day Saints gathers (virtually now more than ever) to listen to the leadership of the Church speak. Topics are generally about the core doctrines and principles of the Gospel of Jesus Christ, but also includes specific guidance and direction for the Church and its members in regards to current world events or changes in Church administration.

I am a member of this Church and while listening to the speakers on October 2nd, I wondered if I could do a text analysis to see how often different words were said throughout the conference. I looked up the talks from the April 2022 Conference on the Church's website (https://www.churchofjesuschrist.org/) and began to copy and paste the text from each talk in to a text a file. After a few talks, I realized this method was prone to lots of user error and would be time consuming. I ended up inspecting the HTML code of the website and found that I could select a single line of HTML code and copy to my text file and have all of the talk from that one line. This made the copy and pasting go much faster. There was just one problem: I also copied all of the HTML code surrounding the text.

After spending some time on StackOverflow, I found a bit of Python Code that would help me strip away all of the HTML formating around my desired text. 


![Word Cloud General Conference Oct 22]({{site.baseurl}}/assets/img/Gen_conf_oct_22_wordcloud.png)

