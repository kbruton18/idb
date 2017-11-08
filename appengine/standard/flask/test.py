from flask import Flask, request
from main import create_app
import urllib2, json


create_app().app_context().push()


endpoint = "http://sweet-travels.appspot.com/api/parks"
req = urllib2.Request(endpoint,headers={'filter': "tx"})


response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)

for x in data:
	print(x["parkCode"] + " " + x["states"])
