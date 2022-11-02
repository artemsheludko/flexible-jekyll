Every first weekend of April and October, The Church of Jesus Christ of Latter-Day Saints gathers (virtually now more than ever) to listen to the leadership of the Church speak. Topics are generally about the core doctrines and principles of the Gospel of Jesus Christ, but also includes specific guidance and direction for the Church and its members in regards to current world events or changes in Church administration.

I am a member of this Church and while listening to the speakers on October 2nd, I wondered if I could do a text analysis to see how often different words were said throughout the conference. I looked up the talks from the April 2022 Conference on the Church's website (https://www.churchofjesuschrist.org/) and began to copy and paste the text from each talk in to a text a file. After a few talks, I realized this method was prone to lots of user error and would be time consuming. I ended up inspecting the HTML code of the website and found that I could select a single line of HTML code and copy to my text file and have all of the talk from that one line. This made the copy and pasting go much faster. There was just one problem: I also copied all of the HTML code surrounding the text.

After spending some time on StackOverflow, I found a bit of Python Code that would help me strip away all of the HTML formating around my desired text, using the "re" library.

{% highlight python %}
import re
f = open(\"gen_conf_apr_2022.txt\", \"r\")
text = f.read()
f.close()
gf_apr_22 = re.sub('<[^<]+?>', '', text)
{% endhighlight %}

I then wrote {gf_apr_22} to a new text file and loaded it into a www.wordart.com to create this word cloud, using a picture of President and Prophet of the Church of Jesus Christ of Latter-Days speaking at the conference:

![Word Cloud General Conference Apr 22]({{site.baseurl}}/assets/img/gc_apr_22_word_art.png)

The larger the word, the more often it was said. Of the 58,913 words spoken, "Christ" was said 321 times and was the most common word (excluding the most common English words such as and, the, of, etc.) 

This gave me a good footing for what I wanted to when the text of the October conference got released. Meanwhile, I had figure out how do do the webscraping so that I didn't have to manually copy and paste from each url. 

Following some online tuturials and more StackOverflow, I wrote a script to scrape all 36 talks from the October conference, along with the speaker's last name from the URL. I used the "requests", "beautifulsoup4", and "requests-html==0.10.0" libraries. It took about 45 secs on average to run the web scraping and then write the talks into a text file. 

Again, I took the text into www.wordart.com and instead of using a picture of a speaker for the background image, I used the cover art the Church used for the print edition of the conference. 

![Word Cloud General Conference Oct 22]({{site.baseurl}}/assets/img/Gen_conf_oct_22_wordcloud.png)

"Christ" was again the focal word of the conference and paired with "Jesus" in nearly every instance. "Jesus Christ" was said 327 times out of the 59,183 words spoken. 

For some other text analysis, I used the "nltk" library. One of the interesting tools from it was this Lexical Dispersion Plot. You can select words of interest to see what frequency and where in the text they appear. 

![Lexical Dispersion Plot Gen Conf Oct 22]({{site.baseurl}}/assets/img/genconf_oct22_dispersion_plot.png)

Many people haven't considered members of this Church to be Christian for various reasons, but based on what is talked about in our General Conference every Spring and Fall, "...we talk of Christ, we rejoice in Christ, we preach of Christ..."(2 Nephi 25:26) and about the love of God. Likewise we teach our members to "...love [their] neighbour as [themselves]." (Mark 12:31).

This is what was talked about in the General Conference of The Church of Jesus Christ of Latter-Day Saints. To learn more, visit https://www.churchofjesuschrist.org/.