from models import database, State
import urllib2, json
import requests
from main import create_app
from pprint import pprint

def clean_text(text):
  text = text.replace("[", "").replace("]", "")
  endIndex = text.find("<")
  if endIndex != -1:
  	text = text[0:endIndex]
  endIndex = text.find("|")
  if endIndex != -1:
  	text = text[0:endIndex]
  endIndex = text.find("(")
  if endIndex != -1:
  	text = text[0:endIndex]
  text = text.replace(")", "")
  return text

create_app().app_context().push()

"""Simple request handler that shows all of the MySQL variables."""
# parks request
endpoint = "https://en.wikipedia.org/w/api.php?action=query&titles=Florida&prop=revisions&rvprop=content&format=json"
req = urllib2.Request(endpoint,headers={"User-Agent": "UT Austin CS 373 Project (http://swetravels.me/)"})

response = urllib2.urlopen(req)
the_page = response.read()
# response.read() returns bytes, which we need to decode into a string
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)
count = 0

pageids = data["query"]["pages"].keys()

for id in pageids:
  statedata = data["query"]["pages"][id]
  
  name = clean_text(statedata["title"])
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

  text = statedata["revisions"][0]["*"][0:10000]
  attributes = text.split('\n')
  for attribute in attributes:
    if nickname == "" and attribute.startswith("|Nickname"):
      index = attribute.find("=")
      nickname = clean_text(attribute[index+2:])
    if abbreviations == "" and attribute.startswith("|PostalAbbreviation"):
      index = attribute.find("=")
      abbreviations = clean_text(attribute[index+2:])
    if timeZone == "" and attribute.startswith("|TimeZone "):
      index = attribute.find("=")
      timeZone = clean_text(attribute[index+2:])
    if governor == "" and attribute.startswith("|Governor "):
      index = attribute.find("=")
      governor = clean_text(attribute[index+2:])
    if capital == "" and attribute.startswith("|Capital "):
      index = attribute.find("=")
      capital = clean_text(attribute[index+2:])
    if largestCity == "" and attribute.startswith("|LargestCity"):
      index = attribute.find("=")
      largestCity = clean_text(attribute[index+2:])
      if "pital" in largestCity:
        largestCity = capital
    if totalPopulation == "" and attribute.startswith("|2010Pop"):
      index = attribute.find("=")
      totalPopulation = clean_text(attribute[index+2:])
    if totalArea == "" and attribute.startswith("|TotalAreaUS"):
      index = attribute.find("=")
      totalArea = clean_text(attribute[index+2:])
    if medianIncome == "" and attribute.startswith("|MedianHouseholdIncome"):
      index = attribute.find("=")
      medianIncome = clean_text(attribute[index+2:])
    if url == "" and attribute.startswith("|Website"):
      index = attribute.find("=")
      url = attribute[index+2:]
      
  state = State(name, abbreviations, nickname, timeZone, governor, capital, largestCity, totalPopulation, totalArea, medianIncome, nationalParks, campgrounds, url)
  pprint(state.__dict__)
print('Finished executing\n')
