import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from './actions'

export function* watchMenu() {
    while (true) {
        const {e} = yield take(actions.CHANGE_CONTENTS)   
        yield put(actions.change(e))
    }
}

export function* watchToggle() {
    while (true) {
        const {col} = yield take(actions.TOGGLE_COLLAPSED)
        yield put(actions.toggled(col))
    }
}

export default function* () {
    yield fork(watchToggle)
    yield fork(watchMenu)
}
