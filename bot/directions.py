

def showresults():
    import json
    from config import portcount
    result = getports()

    ports = json.loads(result)

    # Search for available ports -- intersection of those that are available and with known ll
    free = [p['Portid'] for p in ports[0:portcount] if p['Status'] == 'free']
    known = [p['Portid'] for p in ports[0:portcount]
             if p['Latitude'] != 'unknown' and p['Latitude'] != 'unknown']
    available = list(set(free) & set(known))

    if len(available) == 0:
        return ([])
    elif len(available) >= 1:
        result = {}
        for i in range(len(available)):

            Latituderes = [p['Latitude']
                           for p in ports[0:portcount] if p['Portid'] == available[i]][0]
            Longtituderes = [p['Longtitude']
                             for p in ports[0:portcount] if p['Portid'] == available[i]][0]
            print(i, available[i], Latituderes, Longtituderes)
            result[available[i]] = []
            result[available[i]].append(Latituderes)
            result[available[i]].append(Longtituderes)

        return result

    else:

        return ([])


def getports():
    from config import ip
    from requests import get
    json = get("http://"+ip+"/detect")
    return json.text


def changestatus(id):
    from config import ip
    from requests import get
    response = get("http://" + ip + "/status?id"+id)
    if response.text == "Updated":
        return "Success"
    else:
        return "Fail"


def download(url, file_name):

    from requests import get
    response = get(url)
    if response.headers['Content-Type'] == "image/png":
        with open(file_name, "wb") as file:
            file.write(response.content)
            return "Success"

    else:
        return "Fail"
