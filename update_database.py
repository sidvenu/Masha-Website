import sys
import csv
import requests

if len(sys.argv) < 3:
    print ("Usage: " + sys.argv[0] + " <csv file> <server>")
    exit()

csvfilename = sys.argv[1]
with open(csvfilename, newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in spamreader:
        response = requests.post(sys.argv[2], {
            "title" : row[3],
            "artist": row[1],
            "size": row[4],
            "product_code": row[0],
            "medium": row[5],
            "thumbnail": row[2]
        })
        if response.status_code == 400:
            print ("ERROR: ")
            print (row)

