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
        os.system("http POST {0} \"Authorization: Token {1}\" {2} > result".format(link,token,data))
        tokenfile = open("result","r")
        line = tokenfile.readline()
        print(line)
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
for prom_json in trips_json:
    check_key(prom_json, "users")
    check_key(prom_json, "title")
    check_key(prom_json, "id")
    check_key(prom_json, "sinceWhen")
    check_key(prom_json, "tilWhen")
    print(str(prom_json["id"])+" "+prom_json["title"]+" "+prom_json["sinceWhen"]+" "+prom_json["tilWhen"])
print("\n--------------------------------------------------------")  

#    