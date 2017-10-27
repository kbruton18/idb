import urllib2, json
import requests

endpoint = "https://api.github.com/repos/kbruton18/idb/stats/contributors"
req = urllib2.Request(endpoint,headers={})

response = urllib2.urlopen(req)
the_page = response.read()
the_page = the_page.decode("utf-8") 
data = json.loads(the_page)

for x in data: 
	print(x["total"])
	print(x["author"]["login"])
	print("")
