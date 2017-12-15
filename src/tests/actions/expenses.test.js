import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpense,
	startRemoveExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
	const expensesData = {}
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}
	})
	database.ref('expenses').set(expensesData).then(() => done())
})

test('should setup remove expense', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
});

test('should remove expense from firebase', (done) => {
	const store = createMockStore({})
	const id = expenses[0].id
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})
		return database(`expenses/${id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy()

	})
	done()
})

test('should setup update expense', () => {
	const action = editExpense('abc123', {note: 'New note value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'abc123',
		updates: {
			note: 'New note value'
		}
	})
});

test('should setup add expense with provided values', () => {

	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[0]
	})
});

//as dispatch call an async function with the database stuff we need done to wait till its finished
test('should add expense to database and store', (done) => {
	const store = createMockStore({})
	const expenseData = {
		description: 'mouse',
		amount: 30,
		note: 'hejj',
		createdAt: 123456
	}
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		})
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done()
	})
})

test('should add expense with default to database and store', (done) => {
	const store = createMockStore({})
	const expenseDefault = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0
	}
	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseDefault
			}
		})
		return database.ref(`expenses/${actions[0].expense.id}`).once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseDefault)
		done()
	})
})

test('should setup setexpense action with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore({})
	store.dispatch(startSetExpense()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})