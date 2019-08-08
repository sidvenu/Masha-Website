import sys
import csv
import requests

BASE_URL = "http://mashaart.in/api"
INSERT_RECORD_URLS = {
    "painting": "/painting.php",
    "shawl": "/shawl.php",
    "event": "/event.php",
    "sculpture": "/sculpture.php",
    "carpet": "/carpet.php",
    "exhibition": "/exhibition.php",
    "event-gallery": "/event_g.php",
    "exhibition-gallery": "/exhibition_g.php",
    "artist": "/artist.php"
}


#INSERT RECORDS TO THE DATABASE
def insertDatabase(csvfilename, url):
    headers = []
    with open(csvfilename, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
        for row in spamreader:
            if len(headers) == 0:
                for x in row: 
                    headers.append(x)
                print ("Headers: ")
                print (headers)
            else:
                data = dict.fromkeys(headers)
                for i in range(len(row)):
                    data[headers[i]] = row[i]
                print (row)
                response = requests.post(url, data=data)
                if response.status_code == 200:
                    print ("SUCCESS")
                else:
                    print ("ERROR: ")
                    print (response.text)