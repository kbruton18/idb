import urllib.request, json

# Configure API request
endpoint = "https://developer.nps.gov/api/v1/parks?limit=600&api_key=API_KEY_HERE"
HEADERS = {}
req = urllib.request.Request(endpoint,headers=HEADERS)

response = urllib.request.urlopen(req)
the_page = response.read()


# this will print out everything in json format
print(str(the_page))
