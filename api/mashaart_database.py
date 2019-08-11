import sys
import csv
import requests

#class to fetch URL
class URL:
    BASE_URL = "http://mashaart.in/api"
    INSERT_RECORD_URLS = {
        "painting": "/upload_painting.php",
        "shawl": "/upload_shawl.php",
        "event": "/upload_event.php",
        "sculpture": "/upload_sculpture.php",
        "carpet": "/upload_carpet.php",
        "exhibition": "/upload_exhibition.php",
        "event-gallery": "/upload_event_gallery.php",
        "exhibition-gallery": "/upload_exhibition_gallery.php",
        "artist": "/upload_artist.php",
        "inmedia": "/upload_inmedia.php"
    }
    
    @staticmethod
    def insertURL(key):
        return URL.BASE_URL + URL.INSERT_RECORD_URLS.get(key)
    
    @staticmethod
    def insertOptions():
        return URL.INSERT_RECORD_URLS.keys()

    @staticmethod
    def deleteURL():
        return URL.BASE_URL + "/delete.php"

    @staticmethod
    def updateURL():
        return URL.BASE_URL + "/update_record.php"

#if an argument is provided to the app then change the base url
if len(sys.argv) > 1: 
    URL.BASE_URL = sys.argv[1]

#INSERT RECORDS TO THE DATABASE
def updateDatabase(csvfilename, url):
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

#App - UI
class App:
    def menu(self):
        print ("1 - INSERT RECORDS")
        print ("2 - DELETE RECORDS")
        print ("3 - UPDATE RECORDS")

        choice = input("\nEnter your choice:")

        if choice == "1":
            print ("CATEGORIES:")
            c = 1
            for x in URL.insertOptions():
                print(c, "-", x)
                c+=1
            c = int(input ("Enter category: "))

            s = 1
            for x in URL.insertOptions():
                if (s == c):
                    self.url = URL.insertURL(x)
                    break
                s += 1
        elif choice == "2":
            self.url = URL.deleteURL()
        elif choice == "3":
            self.url = URL.updateURL()
        else:
            print ("Invalid choice!") 
            return

        self.csv = input("Enter csv file:")
        print ("contacting: ", self.url)
        updateDatabase(self.csv, self.url)

#Run the app
app = App()
app.menu()