---
layout: post
---

This is a python code I modified so I could get more twitter information (taken from beyond data science website). I added an algorithm so I could retrieve hourly tweets. I also added a piece of code to retrieve 3 more files containing Twitter information (user info,place info, retweet info) in addition to the main file. I retreived everything on CSV files.

This produces 4 csv files containing  Twitter information.

file'AcademicMain' fields : 'author id', 'created_at', 'place_id', 'referenced_id', 'Retweet', 'id', 'conversation_id' ,'lang', 'source', 'tweet', 'username_mentioned', 'username_mentioned_id', 'urls_expanded', 'urls', 'tag

file AcademicUsers contains fields: 'author id','username', 'place_id', 'description', 'name', 'followers_count', 'following_count', 'verified', 'profile_image_url' file AcademicRetweetInfo contains fields: 'conversation_id', 'referenced_id','place_id', 'text2','username_mentioned2','username_mentioned_id2', 'url2', 'urls_expanded2', 'tag2' file AcademicPlaces contains fields: 'place_id','name_country', 'full_name_country', 'name_country', 'country_code', 'place_type'

After obtaining the files you will need to merge the author id from 'AcademicMain' file with the 'AcademicUsers' file (with author id), then AcademicRetweetInfo contains reference id, which needs to be merged with reference id with 'AcademicMain, then 'AcademicPlaces' place id needs to be merged with place id in 'AcademicPlaces'


``` python


## For sending GET requests from the API
import requests
# For saving access tokens and for file management when creating and adding to the dataset
import os
# For dealing with json responses we receive from the API
import json
# For displaying the data after
#import pandas as pd
# For saving the response data in CSV format
import csv
# For parsing the dates received from twitter in readable formats
import datetime
import dateutil.parser
import unicodedata
#To add wait time between requests
import time
from pathlib import Path



import datetime
from datetime import datetime
#timestamp = pd.Timestamp('2020-5-23')
import pytz
from datetime import date, timedelta
import datetime

os.environ['TOKEN'] = 'AAAAAAAAAAAAAAAAAAAAAAggUwEAAAAAcvH6Nz7S%2BPfeswddbEoiVp4%2BLtY%3DoKgXGUTKQkCiFWkaQpc8DWtR3aBJQlZl7N3lOEmcUhmU9ybxuK'

def listdates(a, b):
    sdate = a  # start date
    edate = b   # end date
    delta = edate - sdate       # as timedelta
    begin_list =[]
    end_list =[]
    for i in range(delta.days + 1):
        day = sdate + timedelta(days=i)
        year = day.strftime("%Y")

        month = day.strftime("%m")

        day = day.strftime("%d")


        begin_time = datetime.datetime(int(year), int(month), int(day), 0)
        #local_dt = local.localize(begin_time, is_dst=None)
        #utc_dt = local_dt.astimezone(pytz.utc)

        m= begin_time.isoformat("T") + ".000Z"
        begin_list.append(m)

        n=12
        m=0
        s=0
        # Add 2 hours to datetime object
        final_time= begin_time+ timedelta(hours=n, minutes=m, seconds=s)
        final_t = final_time.isoformat("T") + ".000Z"
        end_list.append(final_t)


    return(begin_list, end_list)
#time_change = datetime.timedelta(hours=10)
#new_time = date_and_time + time_change




def auth():
    return os.getenv('TOKEN')

def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers

def create_url(keyword, start_date, end_date, max_results):
    search_url = "https://api.twitter.com/2/tweets/search/all"  # Change to the endpoint you want to collect data from

    # change params based on the endpoint you are using
    query_params = {'query': keyword,
                    'start_time': start_date,
                    'end_time': end_date,
                    'max_results': max_results,
                    'expansions': 'author_id,in_reply_to_user_id,geo.place_id,referenced_tweets.id,attachments.media_keys',
                    'tweet.fields': 'id,text,author_id,in_reply_to_user_id,geo,conversation_id,created_at,public_metrics,lang,entities,reply_settings,source',
                    'user.fields': 'id,name,username,created_at,description,public_metrics,verified',
                    'place.fields': 'full_name,id,country,country_code,geo,name,place_type',
                    'next_token': {}}
    return (search_url, query_params)


def connect_to_endpoint(url, headers, params, next_token = None):
    params['next_token'] = next_token   #params object received from create_url function
    response = requests.request("GET", url, headers = headers, params = params)
    print("Endpoint Response Code: " + str(response.status_code))
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def write_json(new_data, filenamejson):
   # with open(filename, 'w') as f:
      #  json.dump(new_data, f, indent=4, sort_keys=True)

    jsonfile = open(filenamejson, 'a')
    json.dump(new_data, jsonfile, indent=4, sort_keys=True)


def append_to_csv(json_response, fileName):
    # A counter variable
    counter = 0

    # Open OR create the target CSV file
    csvFile = open(fileName, "a", newline="", encoding='utf-8')
    csvWriter = csv.writer(csvFile)

    #
    
    # Loop through each tweet
    for tweet in json_response['data']:

        # We will create a variable for each since some of the keys might not exist for some tweets
        # So we will account for that

        # 1. Author ID
        author_id = str("'" + tweet['author_id'])

        # 2. Time created
        created_at = dateutil.parser.parse(tweet['created_at'])
       ###'place.fields': 'full_name,id,country,country_code,geo,name,place_type',
        # 3. Geolocation
        if ('geo' in tweet):
            if('place_id' in tweet['geo']):
                place_id = tweet['geo']['place_id']
            else:
                place_id = " "

        else:
            place_id = " "
            
            
        if('referenced_tweets' in tweet):
            referenced_id= str("'" + tweet['referenced_tweets'][0]['id'])
               
            
            Retweet=str("'" +  tweet['referenced_tweets'][0]['type'])
                
        else:
            referenced_id=' '
            Retweet=' '
                
                

        # 4. Tweet ID
        tweet_id = str("'" + tweet['id'])
        
        
        
        conversation_id = str("'" + tweet['conversation_id'])
        
        
        

        # 5. Language
        lang = tweet['lang']

        # 6. Tweet metrics
        
        # 7. source
        source = tweet['source']

        # 8. Tweet text
        text = tweet['text']
        
        
        
        
        if('entities' in tweet):
              
            if('mentions' in tweet['entities']):
                
                
                
                d= len(tweet['entities']['mentions'])
                user1 =[]
                user2=[]
                for i in range(d):
                    user1.append(tweet['entities']['mentions'][i]['username'])
                    user2.append(tweet['entities']['mentions'][i]['id'])
                    
                    username_mentioned = user1
                    #print(username_mentioned)
                    username_mentioned_id = user2
                   # print(username_mentioned_id)
                
                
            else:
                username_mentioned=' '
                username_mentioned_id=' '

            if('urls' in tweet['entities']):
                d= len(tweet['entities']['urls'])
                url1 =[]
                url2 =[]
                for i in range(d):
                    url1.append(tweet['entities']['urls'][i]['expanded_url'])
                    url2.append(tweet['entities']['urls'][i]['url'])
                    
                    urls_expanded= url1
                    urls = url2
            else:
                urls_expanded=' '
                urls=' '
            if('hashtags' in tweet['entities']):
                tag1 =[]
                d= len(tweet['entities']['hashtags'])   
                for i in range(d):
                    tag1.append(tweet['entities']['hashtags'][i]['tag'])
                    tag=tag1
    
            else:
                tag=' '
        else:
            username_mentioned=' '
            username_mentioned_id=' '
            urls_expanded=' '
            urls=' '
            tag=' '
            
            
        res = [ author_id, created_at, place_id, referenced_id, Retweet, tweet_id, conversation_id, lang, source, text, username_mentioned, 
           username_mentioned_id, urls_expanded, urls, tag]


        csvWriter.writerow(res)
        counter += 1


#When done, close the CSV file
    csvFile.close()

# Print the number of tweets for this iteration
    print("# of Tweets added from this response: ", counter) 

            
           
            
            
def append_to_csvUsers(json_response, fileName):
    # A counter variable
    counter = 0

    # Open OR create the target CSV file
    csvFile = open(fileName, "a", newline="", encoding='utf-8')
    csvWriter = csv.writer(csvFile)

    # Loop through each tweet
    if('users' in json_response['includes']):
        for tweet in json_response['includes']['users']:
            #print(tweet)

                author_id = str("'" + tweet['id'])
                username = tweet['username']
                
                if ('geo' in tweet):
                    if('place_id' in tweet['geo']):
                        place_id = tweet['geo']['place_id']
                    else:
                        place_id = " "
                else:
                    place_id = " "
                #print(username)
                name=tweet['name']
                description=tweet['description']
                followers_count=tweet['public_metrics']['followers_count']
                following_count=tweet['public_metrics']['following_count']
                verified= tweet['verified']

                if('profile_image_url' in tweet):
                     profile_image_url=tweet['profile_image_url']
                else:
                     profile_image_url= ' '
                        
            
                    
            
        
        
                res = [author_id, username, place_id, description, name, followers_count, following_count, verified, profile_image_url]


                csvWriter.writerow(res)
                counter += 1


#When done, close the CSV file
    csvFile.close()

# Print the number of tweets for this iteration
    print("# of Tweets added from this response: ", counter) 

    
    
    
def append_to_csvExtended(json_response, fileName):      
    
# A counter variable
    counter = 0

    # Open OR create the target CSV file
    csvFile = open(fileName, "a", newline="", encoding='utf-8')
    csvWriter = csv.writer(csvFile)
    
    
    if('tweets' in json_response['includes']):
        
        #print(json_response['includes']['tweets'])
        
        for tweet in json_response['includes']["tweets"]:
            #print(tweet)
            
            conversation_id=str("'" +tweet['conversation_id'])
            referenced_id= str("'" +tweet['id'])
            
            if ('geo' in tweet):
                if('place_id' in tweet['geo']):
                    place_id = tweet['geo']['place_id']
                    #print(place_id)
                else:
                    place_id = " "

            else:
                place_id = " "
            
            
            text2=tweet['text']
            
            if('entities' in tweet):

                    if('mentions' in tweet['entities']):

                        #print((tweet['entities']['mentions']))

                        d= len(tweet['entities']['mentions'])
                        user1 =[]
                        user2=[]
                        for j in range(d):
                            user1.append(tweet['entities']['mentions'][j]['username'])
                            user2.append(tweet['entities']['mentions'][j]['id'])

                            username_mentioned2 = user1
                            username_mentioned_id2 = user2


                    else:
                        username_mentioned2=' '
                        username_mentioned_id2=' '

                    if('urls' in tweet['entities']):
                        d= len(tweet['entities']['urls'])
                        url1 =[]
                        url2 =[]
                        for j in range(d):
                            url1.append(tweet['entities']['urls'][j]['expanded_url'])
                            url2.append(tweet['entities']['urls'][j]['url'])

                            urls_expanded2= url1
                            urls2 = url2
                            #print(urls2)
                    else:
                        urls_expanded2=' '
                        urls2=' '
                    if('hashtags' in tweet['entities']):
                        tag1 =[]
                        d= len(tweet['entities']['hashtags'])   
                        for j in range(d):
                            tag1.append(tweet['entities']['hashtags'][j]['tag'])
                            tag2=tag1

                    else:
                        tag2=' '

            else:
                username_mentioned2=' '
                username_mentioned_id2=' '
                urls_expanded2=' '
                urls2=' '
                tag2=' '

           
                
            res = [conversation_id, referenced_id, place_id, text2, username_mentioned2, username_mentioned_id2, urls2, urls_expanded2, tag2 ]

 
            csvWriter.writerow(res)
            counter += 1

#When done, close the CSV file
    csvFile.close()

# Print the number of tweets for this iteration
    print("# of Tweets added from this response: ", counter)    

        
def append_to_csvPlaces(json_response, fileName):
    # A counter variable
    counter = 0

    # Open OR create the target CSV file
    csvFile = open(fileName, "a", newline="", encoding='utf-8')
    csvWriter = csv.writer(csvFile)

    # Loop through each tweet
    
   
        #print(json_response['includes']['places'])
       # n=len(json_response['includes']['places'])
    if('places' in json_response['includes']):    
        for tweet in json_response['includes']['places']:
            
           # print(tweet)
            place_id = str("'" + tweet['id'])
           # print(place_id)
            name_country=tweet['name']
            full_name_place=tweet['full_name']
            country=(tweet['country'])
            country_code=tweet['country_code']
            place_type=tweet['place_type']



            res = [place_id, name_country, full_name_place, name_country, country_code, place_type]


            csvWriter.writerow(res)
            counter += 1


#When done, close the CSV file
    csvFile.close()

# Print the number of tweets for this iteration
    print("# of Tweets added from this response: ", counter)         

#Inputs for tweets
bearer_token = auth()
headers = create_headers(bearer_token)

keyword = 'onlyfans  -promotion -promote lang:en'
# '"new comer" "escort" "call girls" OR #callgirl  lang:en'

from datetime import timedelta, date
 #2020-04-06
answer = listdates(date(2021, 1, 16) , datetime.datetime.now().date() )

start_list = answer[0]
end_list = answer[1]
max_results = 500


#Total number of tweets we collected from the loop
total_tweets = 0

# Create file
timestr = time.strftime("%Y%m%d-%H%M%S")
filename1 = Path("/data") / ('AcademicMain' + timestr + ".csv")
csvFile = open(filename1, "a", newline="", encoding='utf-8')
csvWriter = csv.writer(csvFile)

filename2 = Path("/data") / ('AcademicUsers' + timestr + ".csv")
csvFile2 = open(filename2, "a", newline="", encoding='utf-8')
csvWriter2 = csv.writer(csvFile2)


filename3 = Path("/data") / ('AcademicRetweetInfo' + timestr + ".csv")
csvFile3 = open(filename3, "a", newline="", encoding='utf-8')
csvWriter3 = csv.writer(csvFile3)
                                           
                                           
filename4 = Path("/data") / ('AcademicPlaces' + timestr + ".csv")
csvFile4 = open(filename4, "a", newline="", encoding='utf-8')
csvWriter4 = csv.writer(csvFile4)


#Create headers for the data you want to save, in this example, we only want save these columns in our dataset
csvWriter.writerow(['author id', 'created_at', 'place_id', 'referenced_id', 'Retweet', 'id', 'conversation_id' ,'lang', 
     'source', 'tweet', 'username_mentioned', 'username_mentioned_id', 'urls_expanded', 'urls', 'tag'])

csvWriter2.writerow(['author id','username', 'place_id', 'description', 'name', 'followers_count', 'following_count', 'verified', 'profile_image_url'])


csvWriter3.writerow(['conversation_id', 'referenced_id','place_id', 'text2','username_mentioned2','username_mentioned_id2', 'url2', 'urls_expanded2', 'tag2'])

csvWriter4.writerow(['place_id','name_country', 'full_name_country', 'name_country', 'country_code', 'place_type'])

csvFile.close()
csvFile2.close()
csvFile3.close()
csvFile4.close()

for i in range(0,len(start_list)):

    # Inputs
    count = 0 # Counting tweets per time period
    max_count = 1500 # Max tweets per time period
    flag = True
    next_token = None
    
    # Check if flag is true
    while flag:
        # Check if max_count reached
        if count >= max_count:
            break
        print("-------------------")
        print("Token: ", next_token)
        url = create_url(keyword, start_list[i],end_list[i], max_results)
        json_response = connect_to_endpoint(url[0], headers, url[1], next_token)
        result_count = json_response['meta']['result_count']
        write_json(json_response, "/data/JSON" + timestr + ".json")

        if 'next_token' in json_response['meta']:
            # Save the token to use for next call
            next_token = json_response['meta']['next_token']
            print("Next Token: ", next_token)
            if result_count is not None and result_count > 0 and next_token is not None:
                print("Start Date: ", start_list[i])
                append_to_csv(json_response, filename1)
                append_to_csvUsers(json_response, filename2)
                append_to_csvExtended(json_response, filename3)
                append_to_csvPlaces(json_response, filename4)
                count += result_count
                total_tweets += result_count
                print("Total # of Tweets added: ", total_tweets)
                print("-------------------")
                time.sleep(5)                
        # If no next token exists
        else:
            if result_count is not None and result_count > 0:
                print("-------------------")
                print("Start Date: ", start_list[i])
                append_to_csv(json_response, filename1)
                append_to_csvUsers(json_response, filename2)
                append_to_csvExtended(json_response, filename3)
                append_to_csvPlaces(json_response, filename4)
                count += result_count
                total_tweets += result_count
                print("Total # of Tweets added: ", total_tweets)
                print("-------------------")
                time.sleep(5)
            
            #Since this is the final request, turn flag to false to move to the next time period.
            flag = False
            next_token = None
        time.sleep(5)
print("Total number of results: ", total_tweets)


```