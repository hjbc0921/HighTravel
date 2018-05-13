import requests
from time import sleep
from random import randint

def create_users(N):
    ls = []
    for i in range(1, N):
        ls.append(("swpp{0}".format(i), "swpp{0}passwd".format(i)))
    return ls

def find_id_new(users_json, uname):
    for user_json in users_json:
        if user_json["username"] == uname:
            return user_json["id"]
    print('Cannot find user {0}! Did you run "python manage.py shell < inittest.py"?'.format(uname))
    exit(1)

def find_userinfo(users, q_uid):
    for (uname, upwd, uid) in users:
        if uid == q_uid:
            return (uname, upwd)
    print("Cannot find user with id {0}!".format(q_uid))
    exit(1)

def get_json_or_error_new(link, uname, upwd):
    sleep(0.05)
    try:
        res = requests.get(link, auth=(uname, upwd))
        if res.status_code != 200:
            print("ERROR: Cannot get {0} : {1}, id = {2}, pwd = {3}".format(link, res.status_code, uname, upwd))
            exit(1)
        resjson = res.json()
        return resjson
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def delete_or_error(link, uname, upwd):
    sleep(0.05)
    try:
        res = requests.delete(link, auth=(uname, upwd))
        if res.status_code != 204:
            print("ERROR: Cannot delete {0} : {1}, id = {2}, pwd = {3}".format(link, res.status_code, uname, upwd))
            exit(1)
    except Exception:
        print("ERROR: Cannot delete {0}".format(link))
        exit(1)

def put_or_error(link, data, uname, upwd):
    sleep(0.05)
    try:
        print("put")
        res = requests.put(link, data=data, auth=(uname, upwd))
        if res.status_code != 200:
            print("ERROR: Cannot PUT {0} : {1}, id = {2}, pwd = {3} payload = {4}".format(link, res.status_code, uname, upwd, data))
            exit(1)
    except Exception:
        print("ERROR: Cannot PUT {0}".format(link))
        exit(1)
        
        
def post_or_error(link, data, uname, upwd):
    sleep(0.05)
    try:
        res = requests.post(link, data=data, auth=(uname, upwd))
        if res.status_code != 201:
            print("ERROR: Cannot post {0} : {1}, id = {2}, pwd = {3}".format(link, res.status_code, uname, upwd))
            exit(1)
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
        exit(1)

        
def get_id(users_json, uname):
    for user_json in users_json:
        if user_json["username"] == uname:
            return user_json["id"]
    print('Cannot find user {0}! Did you run "python manage.py shell < inittest.py"?'.format(uname))
    exit(1)

def get_json_or_error(link):
    sleep(0.05)
    try:
        res = requests.get(link).json()
        return res
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def forbidden_or_error(method, link, uname, upwd):
    sleep(0.05)
    try:
        if method == "GET":
            res = requests.get(link, auth=(uname, upwd))
        elif method == "DELETE":
            res = requests.delete(link, auth=(uname, upwd))
        elif method == "POST":
            res = requests.post(link, auth=(uname, upwd))
        elif method == "PUT":
            res = requests.put(link, auth=(uname, upwd))
        if res.status_code != 403:
            print("ERROR: Should not be allowed to {0} {1} : code {2}, id = {3}, pwd = {4}".format(method, link, res.status_code, uname, upwd))
            exit(1)
    except Exception:
        print("ERROR: Cannot {0} {1}".format(method, link))
        exit(1)

def forbidden_or_error_anon(method, link):
    sleep(0.05)
    try:
        if method == "GET":
            res = requests.get(link)
        elif method == "DELETE":
            res = requests.delete(link)
        elif method == "POST":
            res = requests.post(link)
        elif method == "PUT":
            res = requests.put(link)
        if res.status_code != 403:
            print("ERROR: Should not be allowed to {0} {1} with no auth : code {2}".format(method, link, res.status_code))
            exit(1)
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def check_key(prom_json, key):
    if key not in prom_json:
        print("{0} not in {1}.".format((key, prom_json)))
        exit(1)


userN = 10
user_pairs = create_users(userN)
# get id of each user
print("1. Getting users list.")
users_json = get_json_or_error("http://localhost:8000/api/users/")

users = [ (uname, upwd, get_id(users_json, uname)) for (uname, upwd) in user_pairs ]
print(users)

print("******************************************************************************************************************")        

# check token
print("2. Checking token created for each user")

# remove existing proms
print("2. Checking GET http://localhost:8000/promises/")
prom_old = get_json_or_error("http://localhost:8000/promises/")
print(prom_old)

print("******************************************************************************************************************")        
link = "http://localhost:8000/promises/"
print("3. Checking DELETE http://localhost:8000/promises/")
for prom in prom_old:
    print(prom)
    link2 = link + str(prom["id"]) + "/"
    print("\tDeleting promise {0}".format(link))
    forbidden_or_error_anon("DELETE", link2) # anonymous

    user1name = None
    user1pwd = None
    
    for (uname, upwd, uid) in users:
        if prom["user1"] == uid:
            user1name = uname
            user1pwd = upwd
            continue
    delete_or_error(link2, user1name, user1pwd)

print("******************************************************************************************************************")        
# create promises
link = "http://localhost:8000/promises/"
proms = []
promN = 5
sinceWhens = ["2010-01-28T08:18:36.959885Z", "2010-02-28T08:18:36.959885Z", "2010-03-28T08:18:36.959885Z", "2010-04-28T08:18:36.959885Z", "2010-05-28T08:18:36.959885Z"]
tilWhens = ["2011-01-28T08:18:36.959885Z", "2012-02-28T08:18:36.959885Z", "2013-03-28T08:18:36.959885Z", "2014-04-28T08:18:36.959885Z", "2015-05-28T08:18:36.959885Z"]
print("4. Checking POST http://localhost:8000/promises/ by creating {0} promises.".format(promN))
for i in range(0, promN):
    sinceWhen = sinceWhens[i]
    tilWhen = tilWhens[i]
    user1 = users[randint(0, len(users) - 1)][2]
    while True:
        user2 = users[randint(0, len(users) - 1)][2]
        if user1 != user2:
            break
    payload_for_store = {'sinceWhen':sinceWhen, 'tilWhen':tilWhen, 'user1':user1, 'user2':user2}
    proms.append(payload_for_store)

    payload = {'sinceWhen':sinceWhen, 'tilWhen':tilWhen, 'user2':user2}
    (pname, ppwd) = find_userinfo(users, user1)
    print("\tposting with user: {0}".format((pname, ppwd)))
    post_or_error(link, payload, pname, ppwd)

proms_json = get_json_or_error("http://localhost:8000/promises/")
print(proms_json)
print(proms)
if len(proms_json) != len(proms):
    print("ERROR: GET http://localhost:8000/promises/ has more or less items than proms")
    exit(1)

for prom in proms:
    found = False
    for prom_json in proms_json:
        check_key(prom_json, "user1")
        check_key(prom_json, "user2")
        check_key(prom_json, "id")
        check_key(prom_json, "created")
        check_key(prom_json, "sinceWhen")
        check_key(prom_json, "tilWhen")
        if prom_json["user1"] == prom["user1"] and prom_json["user2"] == prom["user2"] and prom_json["sinceWhen"] == prom["sinceWhen"] and prom_json["tilWhen"] == prom["tilWhen"]:
            found = True
            prom["id"] = prom_json["id"]
            prom["created"] = prom_json["created"]
            break
    if not found:
        print("ERROR: Not found : {0}".format(prom))
        exit(1)

print("******************************************************************************************************************")        
link = "http://localhost:8000/promises/"
sinceWhens = ["2011-01-28T08:18:36.959885Z", "2011-02-28T08:18:36.959885Z", "2011-03-28T08:18:36.959885Z", "2011-04-28T08:18:36.959885Z", "2011-05-28T08:18:36.959885Z"]
tilWhens = ["2019-01-28T08:18:36.959885Z", "2012-02-28T08:18:36.959885Z", "2013-03-28T08:18:36.959885Z", "2012-04-28T08:18:36.959885Z", "2020-05-28T08:18:36.959885Z"]
test_cnt = 0
print("5. Checking PUT http://localhost:8000/promises/id")
for prom in proms:
    print(prom)
    link2 = link + str(prom["id"]) + "/"
    print("\tModify promise {0}".format(link2))
    
    user1name = None
    user1pwd = None
    sinceWhen = sinceWhens[test_cnt]
    tilWhen = tilWhens[test_cnt]

    for (uname, upwd, uid) in users:        
        if prom["user1"] == uid:
            user1name = uname
            user1pwd = upwd
            continue
    payload = {'sinceWhen':sinceWhen, 'tilWhen':tilWhen}
    (pname, ppwd) = find_userinfo(users, user1)
    print("\tputing with user: {0}".format((pname, ppwd)))
    put_or_error(link2, payload, user1name, user1pwd)
    test_cnt = test_cnt + 1
        
print("******************************************************************************************************************")        
print("6. Checking GET http://localhost:8000/userall/")
userall_json = get_json_or_error("http://localhost:8000/userall/")
users_json = get_json_or_error("http://localhost:8000/users/")
for user_json in users_json:
    print("===================================================")
    print("id: {0}".format(user_json["id"]))
    whole_promises = [usr["whole_promises"] for usr in userall_json if usr["id"] == user_json["id"]][0]
    print("whole_promises: {0}".format(whole_promises))
    inviterProm = [user_json["promises_as_inviter"]][0]
    inviteeProm = [user_json["promises_as_invitee"]][0]
    print("inviterProm: {0}".format(inviterProm))
    print("inviteeProm: {0}".format(inviteeProm))
    
    # print(inviterProm + inviteeProm)

    if set(inviterProm + inviteeProm) == set(whole_promises):
        pass
    else:
        print("ERROR: Wrong Whole Promises list")
        exit(1)

print("===================================================")
print("TEST SUCCESSFUL (further tests will be added)")