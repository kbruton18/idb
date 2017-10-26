from models import database, State
import urllib2, json
import requests
from main import create_app

create_app().app_context().push()

"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://en.wikipedia.org/w/api.php?action=query&titles=California&prop=revisions&rvprop=content&format=json"
req = urllib2.Request(endpoint,headers={"User-Agent": "UT Austin CS 373 Project (http://swetravels.me/)"})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)
count = 0

pageids = data["query"]["pages"].keys()

for id in pageids:
  state = data["query"]["pages"][id]
  
  name = state["title"]
  nickname = ""
  abbreviations = ""
  timeZone = ""
  governor = ""
  capital = ""
  largestCity = ""
  totalPopulation = ""
  totalArea = ""
  medianIncome = ""
  nationalParks = ""
  campgrounds = ""
  url = ""

  text = state["revisions"][0]["*"][0:10000]
  attributes = text.split('\n')
  for attribute in attributes:
    if nickname == "" and attribute.startswith("|Nickname"):
      index = attribute.find("=")
      nickname = attribute[index+2:]
    if abbreviations == "" and attribute.startswith("|TradAbbreviation"):
      index = attribute.find("=")
      abbreviations = attribute[index+2:]
    if timeZone == "" and attribute.startswith("|TimeZone "):
      index = attribute.find("=")
      timeZone = attribute[index+2:]
    if governor == "" and attribute.startswith("|Governor "):
      index = attribute.find("=")
      governor = attribute[index+2:]

print('Finished executing\n')
