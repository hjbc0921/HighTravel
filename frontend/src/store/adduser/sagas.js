import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/api/trips/'
const userUrl = 'http://127.0.0.1:8000/api/users/'
const tripID = 7
const token = 'd741b531943db7d1f456af85105ce666624089b2'

export function* loadUsers() {
    console.log('loadUsers')
    //let tripID;
    const state = yield select()
    console.log(state)
 //   var token = state.intro.token
    //tripID = state.tripID
    
    var ourTrip;
    yield fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('trip list')
            ourTrip = data.find(t => t.id === tripID)
        })

    console.log(ourTrip)
    var users = ourTrip.users
    console.log(users)
    var names = []
    for (var i=0; i<users.length; i++) {
        var u = users[i]
        names.push({ id : u.id, name: u.username })
    }
    
    console.log(names)

    yield put({ type : 'STORE_USERS', names });

}

export function* addUser(username) {
    //let token;
    //let tripID;
     
    console.log('post in addUser')
    const state = yield select()
    console.log(state)
    var users = state.adduser.adduser
    console.log(users)
    var userID, invitee
    var ids = []
    if (users != undefined)
        ids = users.map(u => u.id)

    var member = users.find(u => u.name === username)
    console.log(member)
    if (member != undefined) { // user is already in trip
        console.log('already exists')
    }
    else {
        // change username to userID
        yield fetch(userUrl)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data)
                invitee = data.find(u => u.username === username)
                console.log('error here?')
                console.log(invitee)
                if (invitee != undefined) // username is valid
                    userID = invitee.id
        })

        if (userID != undefined) { // if username is valid (userID exists)
            console.log(ids)
            ids.push(userID)
            console.log(ids)
            console.log(userID)
            var tripUrl = url + tripID + '/'
            var data
            if (userID != undefined) {
                console.log('**************')
                data = yield call(fetch, tripUrl, {
                    method: 'PATCH',
                    body: JSON.stringify({ users: ids }),
                    headers: {
                        'Authorization': `token ${token}`,
                        'Content-Type': 'application/json;'
                    }
                })
            }
            console.log('before loadRules')
            yield call(loadUsers);
        }
    }
}

export function* watchAddUserRequest() {
    while (true) {
        console.log('adduser watch')
        const { username } = yield take(actions.ADDUSER_REQUEST)
        console.log(username)
        yield call(addUser, username)
        console.log('adduser watch end')
    }
}

export default function* () {
    yield call(loadUsers)
    console.log('watchAddUserRequest')
    yield fork(watchAddUserRequest)
}
