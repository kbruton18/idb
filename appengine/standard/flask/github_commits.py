import urllib2, json

def returnCommits(): 
	endpoint = "https://api.github.com/repos/kbruton18/idb/stats/contributors"
	req = urllib2.Request(endpoint,headers={})

	response = urllib2.urlopen(req)
	the_page = response.read()
	the_page = the_page.decode("utf-8") 
	data = json.loads(the_page)
	
	commit_list = {}
	for x in data:
		commit_dict = {}
		name = x["author"]["login"]
		commit_dict["author"] = name
		commit_dict["total"] = x["total"]
		commit_list[name] = commit_dict
	return commit_list
