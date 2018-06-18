import { take, put, call, fork, select } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

const url = 'http://'+location.host+'/api/rules/'

export function* loadRules() {
    var tripID = sessionStorage.getItem('tripID')
    var tripRuleUrl = url + 'trip/' + tripID + '/'
    var rules
    yield fetch(tripRuleUrl)
        .then((resp) => resp.json())
        .then(function(data) {
            rules = data
        })

    yield put({ type : 'STORE_RULE', rules });
}

export function* postRule(contents) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let data
    try {
        if (contents != undefined) {
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
    
    yield call(loadRules)
}

export function* watchPostRuleRequest() {
    while (true) {
        const { contents } = yield take(actions.POST_RULE_REQUEST)
        yield call(postRule, contents)
    }
}

export function* deleteRule(ruleId) {
    var token = sessionStorage.getItem('token')
    var tripID = sessionStorage.getItem('tripID')
    let ruleUrl = url + ruleId + '/'
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
    
    yield call(loadRules)
}

export function* watchDeleteRuleRequest() {
    while (true) {
        const { ruleId } = yield take(actions.DELETE_RULE_REQUEST)
        yield call(deleteRule, ruleId)
    }
}

export default function* () {
    yield fork(watchPostRuleRequest)
    yield fork(watchDeleteRuleRequest)
}
