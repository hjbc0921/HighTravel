import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import { STORE_TRIP_ID } from '../user/actions'

const url = 'http://127.0.0.1:8000/api/rules/'

export function* loadRules() {
    console.log('loadRules')
    var tripID = sessionStorage.getItem('tripID')
    var tripRuleUrl = url + 'trip/' + tripID + '/'
    console.log(tripRuleUrl)
    
    var rules
    yield fetch(tripRuleUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            console.log('rules for trip')
            rules = data
            console.log(rules)
        })

    console.log('tripRules',rules)

    yield put({ type : 'STORE_RULE', rules });

}

export function* postRule(contents) {
    console.log('post in postRule')

    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')

    let data
    try {
        if (contents != undefined) {
            console.log('**************')
            data = yield call(fetch, url, {
                method: 'POST',
                body: JSON.stringify({ contents: contents, tripID: tripID }),
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        }
    } catch (e) {
        console.log('post rule failed')
    }
    
    console.log('before loadRules')
    yield call(loadRules)
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

export function* deleteRule(ruleId) {
    console.log('post in deleteRule')

    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')

    console.log(ruleId)

    let ruleUrl = url + ruleId + '/'
    console.log(ruleUrl)
    let data
    if (ruleId != undefined) {
        data = yield call(fetch, ruleUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json;'
            }
        })
    }
    
    console.log('before loadRules')
    yield call(loadRules)
}

export function* watchDeleteRuleRequest() {
    while (true) {
        console.log('post in watch')
        const { ruleId } = yield take(actions.DELETE_RULE_REQUEST)
        console.log(ruleId)
        yield call(deleteRule, ruleId)
        console.log('post in watch end')
    }
}

export function* watchStoreTripId() {
    while (true) {
        const action = yield take(STORE_TRIP_ID)
        yield call(loadRules)
    }
}

export default function* () {
    yield fork(watchStoreTripId)
    yield fork(watchPostRuleRequest)
    yield fork(watchDeleteRuleRequest)
}
