import { initialState } from './selectors'
import { changeExpenseContent, deleteExpenseRows, addexpenseFail, addexpenseRequest, addexpenseSuc, patchexpenseSuc, patchexpenseFail } from './actions'
import expense_reducer from './reducer'

describe('change Expense content', () => {
    it('change Expense content', () => {
        expect(expense_reducer(
            {message: '', updated2: true},
            changeExpenseContent({id: 1, contents: 'test for jest', money: 10, spender: 'swpp', date: '2018-01-01'})
        )).toEqual({message: '', updated2: false})
    })
})

describe('delete Expense', () => {
    it('delete Expense rows', () => {
        expect(expense_reducer(
            {message: '', updated2: true},
            deleteExpenseRows([1,2])
        )).toEqual({message: '', updated2: false})
    })
})

describe('add Expense fail', () => {
    it('add Expense fail', () => {
        expect(expense_reducer(
            {message: '', updated2: true},
            addexpenseFail('add expense fail')
        )).toEqual({message: 'add expense fail', updated2: false})
    })
})

describe('add Expense Request', () => {
    it('add Expense Request', () => {
        expect(expense_reducer(
            {message: '', updated2: true},
            addexpenseRequest('add expense', '2018-01-01', 10)
        )).toEqual({message: '', updated2: false})
    })
})

describe('add Expense Suc', () => {
    it('add Expense Suc', () => {
        expect(expense_reducer(
            {message: '', updated2: false},
            addexpenseSuc()
        )).toEqual({message: '', updated2: true})
    })
})

describe('patch Expense Suc', () => {
    it('patch Expense Suc', () => {
        expect(expense_reducer(
            {message: '', updated2: false},
            patchexpenseSuc()
        )).toEqual({message: '', updated2: true})
    })
})

describe('patch Expense Fail', () => {
    it('patch Expense Fail', () => {
        expect(expense_reducer(
            {message: '', updated2: true},
            patchexpenseFail()
        )).toEqual({message: '', updated2: false})
    })
})
