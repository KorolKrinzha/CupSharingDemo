

def showports():
    import json
    from secrets import portcount
    result = getports()

    ports = json.loads(result)

    # Search for available ports -- intersection of those that are available and with known ll
    free = [p['Portid'] for p in ports[0:portcount] if p['Status'] == 'free']
    known = [p['Portid'] for p in ports[0:portcount]
             if p['Latitude'] != 'unknown' and p['Latitude'] != 'unknown']
    available = list(set(free) & set(known))
    calculate(available)


def getports():
    from secrets import ip
    from requests import get
    json = get("http://"+ip+"/detect")
    return json.text


def changestatus(id):
    from secrets import ip
    from requests import get
    response = get("http://" + ip + "/status?id"+id)
    if response.text == "Updated":
        talktoclient("Success")


def talktoclient(code):
    if code == "Fail":
        print(":<")
    if code == "Success":
        print("Cup")


def calculate(available):
    if len(available) == 0:
        return talktoclient("Fail")
    if len(available) == 1:
        return
