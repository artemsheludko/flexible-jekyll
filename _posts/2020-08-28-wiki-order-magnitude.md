---
layout: post
title: Scraping Wikipedia for orders of magnitude
date: 2020-08-27 13:48:00 
description: How to scrape order of magnitude from wikipedia and do unit conversion using pint and python # Add post description (optional)
img: croc.jpg # Add image post (optional)
fig-caption: Big ol' crocodile # Add figcaption (optional)
tags: [python, scraping, wikipedia, pint]
---

<p><a href="https://pint.readthedocs.io/en/0.9/">Pint</a> is an awesome python package that allows for the easy conversion between units. As it stands it covers nearly all scientific SI units and most imperial ones. This means I can easily convert between fathoms and meters. Pint also makes it really easy to extend a unit, or include a completely new custom one. </p>

<p>When it comes to standard units you'd use in calculation there is rarely a simple real-world understanding of the actual value of this unit. Number sense is incredibly import for effective science communication. It can be the difference between someone engaging with the work and giving up entirely. </p>

<p>This rainy afternoon project scrapes <a href="https://en.wikipedia.org/wiki/Category:Orders_of_magnitude">Wikipedia's order of magnitude sections</a> to pull out potentially useful real-world comparisons and generates a Pint config to make these values accessible as units. </p>


## Scraping Wikipedia

The first thing we need to do is find some useful data. After about two hours of googling, I managed to find Wikipedia's order of magnitude categories. These are a series of tables for various concepts listing examples of values of that concept, such as length, at different orders of magnitude. 

Looking at the order of magnitude section nearly all of the pages have a table with a "Value" and "Item" column. The Value column contains a numerical value in various units. The Item column is a description of what the "Value" column represents. The 'data', 'numbers', 'radiation', 'temperature' and 'time' pages deviate from this structure of the other tables. So unlike Wikipedia to be inconsistent! We might have to return to these at a later date. 

For the others, we just need to find a way of pulling that data out of those tables. Thankfully smarter people than me have already solved that problem. After they solved it they then went put stabilisers on the solution. You've really got to try to fail at python nowadays. 

Robobrowser makes web scraping offensively easy. Let's open up an instance of Robobrowser and point it to the page detailing the various different order of magnitude sections. 


```python
import re
import pandas as pd 
import robobrowser

BASEURL = 'https://en.wikipedia.org/wiki/Category:Orders_of_magnitude'

rb = robobrowser.RoboBrowser(history=False)
rb.open(BASEURL)
```

From this point, we can select all the links on the page using the inbuilt select function. The select function behaves pretty much the same way as a jQuery $() function.  In the #mw-pagessection we find all the links. We can then filter those just to the actual 'Order of magnitude' pages with a small bit of RegEx. Let's shove all that in a dictionary for later use. 


```python
pages = {x.contents[0]:x for x in rb.select('#mw-pages li a') if re.match(r'^Orders',x.contents[0]) is not None}
```

Now is just the process of iterating over that dictionary, telling robobrowser to follow the link and parsing any tables that we find on that page. The below code shows exactly how that process works. The lions share of what's been written is to deal with eccentricities of each page. Hopefully, the comments should provide some clarity as to what is happening in each step. 


```python
# Initialise lastTableColumns variable. This will be used to capture the structure of 
# the table in the case that the header row is missing. 
lastTableColumns = None

# Create empty dictionary to store processed items
OrdersOfMagnitude = dict()

print("Begining wikipedia scape...\n")

for pageId, link in pages.items():
    
    # The order of magnitude pages for Pressure and Money have have renamed the 'Value' column. 
    # This dictionary allows for these values to be looked up.
    
    wikiValueColumns = dict(pressure='Pressure',currency='Money')
    
    # Get value column header
    
    if pageId in wikiValueColumns.keys():
        valueColumn = wikiValueColumns[pageId]
    else:
        valueColumn = 'Value'
        
    # Follow the link to the order of magnitude table    
    rb.follow_link(link)
    
    # Select all tables on the page with the .wikitable class
    rawTables = rb.select('.wikitable')
    
    # Create a list to store parsed page tables
    pageTables = []
    
    for i, rawTable in enumerate(rawTables):
        
        # Parse the html table using pandas
        table = pd.read_html(str(rawTable))[0]
        
        # Search the parsed columns for names similar to 'Value'
        # and 'Item'. Some of the tables have additional text 
        # in the header. Using the filter/like combo we can avoid
        # manually defining each column name. 
        
        valColList = table.filter(like=valueColumn).columns
        itmColList = table.filter(like='Item').columns

        # Check that the table has a Value and Item column
        
        if len(valColList) > 0 and len(itmColList) > 0:
            valCol = valColList[0]
            itmCol = itmColList[0]
        
        # Some pages only show the header on the first table, 
        # in that case use the previously parsed table's header
        
        elif i>0 and lastTableColumns is not None and len(lastTableColumns)==len(table.columns):
            table.columns = lastTableColumns
            valCol = table.filter(like=valueColumn).columns[0]
            itmCol = table.filter(like='Item').columns[0]
        
        # If neither of the above conditions are met then we 
        # cannot parse this table as it doesn't meet our defined
        # structure.
        
        else:
            continue
            
        # Set lastTableColumns for part of this table 
        
        lastTableColumns = table.copy().columns
        
        # Some tables have the unit in the Value header rather 
        # than within the column. In that instance we want to 
        # pull that information out. Using some RegEx we search
        # for any Value column head with brackets. 
        
        if len(re.findall(r'\((.*)\)',valCol)) >0 :
            tableUnit = re.sub(r'[^A-Za-z0-9\/]','', re.findall(r'\((.*)\)',valCol)[0])
        else:
            tableUnit = ''
            
        # Throw away all columns except for the Value and Item
        # and throw away all rows with a null Value.
        
        table = table[[valCol,itmCol]]
        table = table[table[valCol].notnull()]
        
        # Split the Value column into a numeric value and a unit
        table[['Value (Numeric)','Unit']] = table[valCol].str.extract(r'([^\s]+)\s*([^\s]*)$', expand=True)

        # Standardise the scientific notation, replacing '×10' with 'e'
        table['Value (Numeric)'].replace(regex=True, inplace=True, to_replace=r'×10', value='e')
        
        # Filter out any complex values such as '50 to 100' or '20-25'. 
        table=table[table['Value (Numeric)'].map(lambda x: re.match(r'.*(?:\d*\.)?\d+[^\de.]+(?:\d*\.)?\d+',x) is None)]
        
        # Remove any additional text or symbols that are still present in the string
        table['Value (Numeric)'].replace(regex=True, inplace=True, to_replace=r'[^.–\-/e−\d]', value='')
        
        # Convert wikipedia stylistic choice of '−' into the common '-' character.
        table['Value (Numeric)'].replace(regex=True, inplace=True, to_replace=r'−', value='-')
        
        # Convert any digits displayed as superscript in the unit to inline powers
        table['Unit'].replace(regex=True, inplace=True, to_replace=r'((?:-)?\d)', value=r'^\1')
        
        # Finally pass the string to to_numeric in order to parse this into a floating 
        # point. Then filter any values that failed to get through the conversion as well 
        # as any values who resolve to 0. 
        table['Value (Numeric)'] = pd.to_numeric(table['Value (Numeric)'],errors='coerce')
        table = table[table['Value (Numeric)']!=0]
        table = table[table['Value (Numeric)'].notnull()]
        
        # Extract any wiki references from the Item column for potential future use    
        table[['Reference']] = table[itmCol].str.extract(r'((?:\[.+\])+)$', expand=True)
        
        # Create a detail column containing the Item text without any references
        table['Detail'] = table[itmCol].replace(regex=True, to_replace=r'(?:\[.*\])+', value='')
        
        # Remove any null detail columns
        table = table[table['Detail'].notnull()]
        
        # In the case that the unit is defined in the header, add this unit to the unit 
        # column
        table[['Unit']]=table['Unit'].replace('',tableUnit)
        
        pageTables.append(table)
    
    # Concatenate all the tables on the page and add this to our dictionary of Orders of Magnitude
    if len(pageTables) > 0:
        
        OrdersOfMagnitude[pageId] = pd.concat(pageTables)
        
        # Print summary of the results. 
        print('{}: {} approximations found.'.format(pageId,len(OrdersOfMagnitude[pageId])))
```

    Begining wikipedia scape...
    
    Orders of magnitude (acceleration): 52 approximations found.
    Orders of magnitude (angular momentum): 8 approximations found.
    Orders of magnitude (area): 64 approximations found.
    Orders of magnitude (bit rate): 45 approximations found.
    Orders of magnitude (charge): 21 approximations found.
    Orders of magnitude (currency): 43 approximations found.
    Orders of magnitude (current): 37 approximations found.
    Orders of magnitude (energy): 170 approximations found.
    Orders of magnitude (entropy): 1 approximations found.
    Orders of magnitude (force): 33 approximations found.
    Orders of magnitude (frequency): 54 approximations found.
    Orders of magnitude (illuminance): 14 approximations found.
    Orders of magnitude (length): 118 approximations found.
    Orders of magnitude (luminance): 26 approximations found.
    Orders of magnitude (magnetic field): 32 approximations found.
    Orders of magnitude (mass): 156 approximations found.
    Orders of magnitude (molar concentration): 25 approximations found.
    Orders of magnitude (power): 80 approximations found.
    Orders of magnitude (probability): 45 approximations found.
    Orders of magnitude (specific heat capacity): 36 approximations found.
    Orders of magnitude (speed): 96 approximations found.
    Orders of magnitude (voltage): 27 approximations found.


## Generate format names using TextBlob

<p>Now that we've scraped our data we need to figure out what these values mean. The Info column we picked up from the various tables gives us a decent description. the Info column is not something that would work well as an identifier thought. Some of these information strings go on for two or three sentences. </p>

<p>We need to come up with a way to convert these long strings into useable variable names. We could generate a unique code for each one in the vain of 'acceleration1', 'acceleration2', 'acceleration3' etc. That doesn't give us something immediately understandable though. What would be great is if we could pull out the relevant information from the Item column in the tables we just parsed. Using TextBlob we can. </p>

<p>Textblob (&amp; nltk) is a package that makes natural language processing an absolute breeze. In order to get the information we want we want all we need to do is convert our strings to a TextBlob object. Once we've done that we can pull out all of the noun_phrases in the text and convert those into identifiers. AS we're mostly dealing with tangible 'things' referring to them by their noun phrase makes sense. Everything else in the Item text is just waffle. </p>



```python
import nltk
from textblob import TextBlob

# Download natural language processing libraries in order to use TextBlob
nltk.download('brown')
nltk.download('punkt')

def getNouns(string):  
    
    # Remove any information contained in brackets and any symbols other than alpha numeric ones
    # Then create the textblob object and extract the noun phrases.
    np = TextBlob(re.sub(r'[^a-zA-Z0-9\s]','',re.sub(r'\(.*\)','',string))).noun_phrases
    
    # If any noun phrases are found then join all these phrases into one large string. 
    # Split this string by anything that isn't alpha numeric, filter out anything else
    # that isn't alpha numeric. Capitalize each value and stick all these processed 
    # strings together. The result should be all the noun phrases in camelCase as one 
    # string. 
    if len(np)>0:
        return ''.join([x.capitalize() for x in re.split('([^a-zA-Z0-9])',' '.join(np)) if x.isalnum()])

# Loop over our scraped orders of magnitude and create our noun phrase camelCase string
for area, data in OrdersOfMagnitude.items():
    
    # Apply the getNouns function
    data['id']=data['Detail'].apply(getNouns)
    # Throw away any values that were we couldn't create an id
    data=data[data['id'].notnull()]
    

```

    [nltk_data] Downloading package brown to /home/ben/nltk_data...
    [nltk_data]   Package brown is already up-to-date!
    [nltk_data] Downloading package punkt to /home/ben/nltk_data...
    [nltk_data]   Package punkt is already up-to-date!


## Pint and generating configurations

<p>We've got our data, we got our labels. Now we just need to throw this into Pint and we're done. In order to do that we need to set up a custom unit registry. </p>

<p>As with everything in python nowadays its ridiculously easy. Following their detailed <a href="https://pint.readthedocs.io/en/latest/defining.html)">guidance</a> we can see that the format is just <code>id = value*unit</code>. Most of the values we parsed were in units already defined in Pint's base unit registry.  This means that all our custom units can be converted to and from any other unit that pint offers. They will also behave with pints <a href="https://pint.readthedocs.io/en/latest/wrapping.html#checking-dimensionality">dimensionality checks</a>.</p>



```python
# Iterate through the rows of our various magnitudes writing out to a text file
# string configurations for pint
with open('pintConfig.txt','w') as out:
    for area, data in OrdersOfMagnitude.items():
        for id, row in data.iterrows():
            pintConfig = '{} = {}*1{} # {}\n'.format(row['id'],row['Value (Numeric)'],row['Unit'],row['Detail'])
            out.write(pintConfig)
```

Now that we've built our unit registry we can do all sorts of bizarre conversions. Want to see how many space shuttles worth of acceleration an adult saltwater crocodile's bite would provide if it was applied to the mass of the largest Argentiosaurs? Easy, just look below.


```python
from pint import UnitRegistry

ureg = UnitRegistry()
ureg.load_definitions('pintConfig.txt')

x = 1*ureg.Large67mAdultSaltwaterCrocodile
acc = x/(1*ureg.LargestArgentinosaurus)
print(acc.to('Shuttle'))
```

    0.01629664619744922 Shuttle


Bizareness aside, now we can easily switch any of our calculations, data analysis, tables or arrays into more comprehensible numbers. As Pint easily interfaces with both pandas and numpy it can make the publication of data much more user-friendly. Saving time and effort when it comes to producing any sort of public-facing data analysis. Plus, you know, 0.016 shuttles, that's a lot of bite.  
