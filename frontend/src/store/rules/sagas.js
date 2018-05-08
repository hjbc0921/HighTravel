import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/api/rules/'
const tripID = 1
const token = 'd741b531943db7d1f456af85105ce666624089b2'

export function* loadRules() {
    console.log('loadRule')
    //let tripID;
    const state = yield select()
    //tripID = state.tripID
    var tripRuleUrl = url + 'trip/' + tripID + '/'
    console.log(tripRuleUrl)
    
    var tripRules;
    yield fetch(tripRuleUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('rules for trip')
            tripRules = data
            console.log(tripRules)
        })
    console.log('tripRules')
    console.log(tripRules)
    console.log(typeof tripRules)
    console.log(Array.isArray(tripRules))

    //var rules = tripRules.contents
    yield put({ type : 'STORE_RULE', tripRules });

}

export function* postRule(contents) {
    console.log('post in postRule')

    //let token;
    //let tripID;
    const state = yield select()
    //token = state.token
    //tripID = state.tripID

    console.log('**************')

    let data;
    if (contents != undefined) {
        console.log('**************')
        data = yield call(fetch, url, {
            method: 'POST',
            body: JSON.stringify({ contents: contents, tripID: tripID }),
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
        console.log('---------------------------')
    }
    
    console.log('before loadRules')
    yield call(loadRules);
}

export function* watchPostRuleRequest() {
    while (true) {
        console.log('post in watch')
        const { contents } = yield take(actions.POST_RULE_REQUEST)
        console.log(contents)
        yield call(postRule, contents)
        console.log('post in watch end')
    }
}

export default function* () {
    yield call(loadRules)
    console.log(typeof token)
    console.log('watchPostRuleRequest')
    yield fork(watchPostRuleRequest)
    console.log('watchloadRules')
    //yield fork(loadRules)
}
