import requests
from time import sleep
from random import randint
import os

def get_json_or_error(link):
    sleep(0.05)
    try:
        res = requests.get(link).json()
        return res
    except Exception:
        print("ERROR: Cannot get {0}".format(link))
        exit(1)

def get_id(users_json, uname):
    for user_json in users_json:
        if user_json["username"] == uname:
            return user_json["id"]
    print('Cannot find user {0}! Did you run "python manage.py shell < inittest.py"?'.format(uname))
    exit(1)

def create_users(N):
    ls = []
    for i in range(1, N):
        ls.append(("swpp{0}".format(i), "swpp{0}passwd".format(i)))
    return ls

def check_key(prom_json, key):
    if key not in prom_json:
        print("{0} not in {1}.".format((key, prom_json)))
        exit(1)
        
def post_or_error(link, data, token):
    sleep(0.05)
    try:
        cmd = "http POST {0} \"Authorization: Token {1}\" {2} > result".format(link,token,data)
        print(cmd)
        os.system(cmd)
        tokenfile = open("result","r")
        line = tokenfile.readline()
        print(line)
        tokenfile.close()
        os.system("rm result")
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
        exit(1)

def patch_or_error(link, data, token):
    sleep(0.05)
    try:
        cmd = "http PATCH {0} \"Authorization: Token {1}\" {2} > result".format(link,token,data)
        print(cmd)
        os.system(cmd)
        tokenfile = open("result","r")
        line = tokenfile.readline()
        print(line)
        tokenfile.close()
        os.system("rm result")
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
        exit(1)

def delete_or_error(link, token):
    sleep(0.05)
    try:
        cmd = "http DELETE {0} \"Authorization: Token {1}\" > result".format(link,token)
        print(cmd)
        os.system(cmd)
        tokenfile = open("result","r")
        line = tokenfile.readline()
        print(line)
        tokenfile.close()
        os.system("rm result")
    except Exception:
        print("ERROR: Cannot post {0}".format(link))
        exit(1)

userN = 10
print("\n\n<Start Backend Testing>")
print("--------------------------------------------------------")

# get id of each user
print("1. Getting users list from /api/users/")
user_pairs = create_users(userN)
users_json = get_json_or_error("http://localhost:8000/api/users/")
users = [ (uname, upwd, get_id(users_json, uname)) for (uname, upwd) in user_pairs ]
for u in users:
    print(u)
print("\n--------------------------------------------------------")
# check token

print("2. Checking token created for each user in /api-token-auth/")
user_tokens=['703064ee14987e8bf3b6023620042bf8b644d52a', 'd5e357e74b344bdc81294f21951fb4cd1c6125ed', '93aea797c495cf26d15ae4e6b9e1a4fb24c59b53', '34bd99efb366236ea79a188d341bec9f2db2ec94', '592eb4e5556134f8286ce09495c85a848c4162de', '01892b6ded7e4b3b5fbcb2eff647ea977e1e798f', '1222f5ff328721ad534456a1126a855f6f577466', 'bcad56e6c7c00bfe9202e59c10eaf02e6a856216', 'f0ba879707fb52ddcd66b15b00db82a19e081b49']  
'''
user_tokens = []
for (uname,upwd) in user_pairs:
    os.system("http POST http://localhost:8000/api-token-auth/ username={0} password={1} > token".format(uname,upwd))
    tokenfile = open("token","r")
    line = tokenfile.readline()
    token = line[10:len(line)-2]
    print("{0}'s token : {1}".format(uname,token))
    user_tokens.append(token)
    tokenfile.close()
os.system("rm token")
'''
#print(user_tokens)
print("\n--------------------------------------------------------")

# make new trips
print("3. Making new trips in /api/trips/")
link = "http://localhost:8000/api/trips/"
trips = []
tripN = 5
sinceWhens = ["2014-02-28", "2016-01-31", "2018-09-21", "2014-03-04", "2013-05-06"]
tilWhens = ["2014-03-28", "2015-01-31", "2018-10-21", "2014-06-04", "2013-06-06"]
titles = ["test1","test2","test3","test4","test5"]
for i in range(0, tripN):
    sinceWhen = sinceWhens[i]
    tilWhen = tilWhens[i]
    title = titles[i]
    data = "\"sinceWhen\"={0} \"tilWhen\"={1} \"title\"={2}".format(sinceWhen,tilWhen,title)
    trips.append(data)
    token = user_tokens[i+3]
    print("posting with user: swpp{0}".format(i+3))
    print(data)
    #post_or_error(link, data, token)

print("\n--------------------------------------------------------")

# check trips
print("4. Get newly made trips from /api/trips/")
trips_json = get_json_or_error("http://localhost:8000/api/trips/")

for trip in trips:
    print(trip)
print("id","title","sinceWhen","tilWhen","users",sep="\t")
for prom_json in trips_json:
    check_key(prom_json, "users")
    check_key(prom_json, "title")
    check_key(prom_json, "id")
    check_key(prom_json, "sinceWhen")
    check_key(prom_json, "tilWhen")
    print(prom_json["id"],prom_json["title"],prom_json["sinceWhen"],prom_json["tilWhen"],prom_json["users"],sep="\t")
print("\n--------------------------------------------------------")  

# delete trips
print("5. Delete trip1 from /api/trips/1/")
link = "http://localhost:8000/api/trips/1/"
token = user_tokens[3] #user:swpp4
'''
delete_or_error(link,token)
trips_json = get_json_or_error("http://localhost:8000/api/trips/")
for prom_json in trips_json:
    print(prom_json["id"],prom_json["title"],prom_json["sinceWhen"],prom_json["tilWhen"],prom_json["users"],sep="\t")
'''
print("\n--------------------------------------------------------") 
# patch trips
print("6. Get trip2 and Change trip2's trip title in /api/trips/2/")
link = "http://localhost:8000/api/trips/2/"
data = "\"title\"=\"changed to new title!\""
token = user_tokens[5] #user:swpp6
'''
trips_json = get_json_or_error(link)
print("id","title","sinceWhen","tilWhen","users",sep="\t")
print(trips_json["id"],trips_json["title"],trips_json["sinceWhen"],trips_json["tilWhen"],trips_json["users"],sep="\t")
patch_or_error(link,data,token)
'''
print("\n--------------------------------------------------------") 
# add user to trips
print("7. Add another user to trip3 in /api/trips/3/")
'''
link = "http://localhost:8000/api/trips/3/"
data = "\"users\":[7,8]\""
token = user_tokens[6] #user:swpp7
patch_or_error(link,data,token)
print(get_json_or_error(link))
'''
print("\n--------------------------------------------------------") 
# add rules to trips
print("8. Add rules to trip2,3 in /api/rules/")
rules = ["wake up at 8","take a shower","swpp assignment","eat lunch","take a test"]
link = "http://localhost:8000/api/rules/"
data1 = "\"contents\"=\"{0}\" \"tripID\"=\"2\"".format(rules[0])
data2 = "\"contents\"=\"{0}\" \"tripID\"=\"2\"".format(rules[1])
data3 = "\"contents\"=\"{0}\" \"tripID\"=\"3\"".format(rules[2])
data4 = "\"contents\"=\"{0}\" \"tripID\"=\"3\"".format(rules[3])
data5 = "\"contents\"=\"{0}\" \"tripID\"=\"3\"".format(rules[4])
'''
post_or_error(link,data1,user_tokens[5])
post_or_error(link,data2,user_tokens[5])
post_or_error(link,data3,user_tokens[6])
post_or_error(link,data4,user_tokens[6])
post_or_error(link,data5,user_tokens[6])
'''
print("\n--------------------------------------------------------") 
# get all rules of certain trip
print("9. Get rules for trip2 from /api/rules/trip/2/")
link = "http://localhost:8000/api/rules/trip/2/"
trips_json = get_json_or_error(link)
print(trips_json)
print("\n--------------------------------------------------------") 