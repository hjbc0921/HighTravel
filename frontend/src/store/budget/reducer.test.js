import { initialState } from './selectors'
import { changeBudgetContent, deleteBudgetRows, loadBudget, addbudgetFail, addbudgetRequest, addbudgetSuc, patchbudgetSuc, patchBudgetFail } from './actions'
import budget_reducer from './reducer'

describe('change Budget content', () => {
    it('change Budget content', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [], updated: true, patched: false},
            changeBudgetContent({message: '', tripBudgets: [], updated: true, patched: false})
        )).toEqual({message: '', tripBudgets: [], updated: false, patched: false})
    })
})

describe('delete Budget', () => {
    it('delete Budget rows', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: true, patched: false},
            deleteBudgetRows({id: 1, contents: 'test for jest', money: 10})
        )).toEqual({message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: false, patched: false})
    })
})

describe('load Budget', () => {
    it('load Budgets', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [], updated: false, patched: false},
            loadBudget([{id: 1, contents: 'test for jest', money: 10}])
        )).toEqual({message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: true, patched: false})
    })
})

describe('add Budget fail', () => {
    it('add Budget fail', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [], updated: true, patched: false},
            addbudgetFail('add budget fail')
        )).toEqual({message: 'add budget fail', tripBudgets: [], updated: false, patched: false})
    })
})

describe('add Budget Request', () => {
    it('add Budget Request', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [], updated: true, patched: false},
            addbudgetRequest('add budget', 10)
        )).toEqual({message: '', tripBudgets: [], updated: false, patched: false})
    })
})

describe('add Budget Suc', () => {
    it('add Budget Suc', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [], updated: false, patched: false},
            addbudgetSuc([{id: 1, contents: 'test for jest', money: 10}])
        )).toEqual({message: '', tripBudgets: [], updated: true, patched: false})
    })
})

describe('patch Budget Suc', () => {
    it('patch Budget Suc', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: false, patched: false},
            patchbudgetSuc()
        )).toEqual({message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: true, patched: false})
    })
})

describe('patch Budget Fail', () => {
    it('patch Budget Fail', () => {
        expect(budget_reducer(
            {message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: true, patched: false},
            patchBudgetFail()
        )).toEqual({message: '', tripBudgets: [{id: 1, contents: 'test for jest', money: 10}], updated: false, patched: false})
    })
})
