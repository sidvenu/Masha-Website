import sys
import csv
import requests

headers = []

if len(sys.argv) < 3:
    print ("Usage: " + sys.argv[0] + " <csv file> <server>")
    exit()

csvfilename = sys.argv[1]
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
            response = requests.post(sys.argv[2], data=data)
            if response.status_code == 200:
                print ("SUCCESS")
            else:
                print ("ERROR: ")
                print (response.text)

