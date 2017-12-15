import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpense,
	startRemoveExpense,
	startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])
const uid = 'testuid'
const defaultAuthState = {auth: {uid}}

beforeEach((done) => {
	const expensesData = {}
	expenses.forEach(({id, description, note, amount, createdAt}) => {
		expensesData[id] = {description, note, amount, createdAt}
	})
	database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done())
})

test('should setup remove expense', () => {
	const action = removeExpense({id: '123abc'});
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
});

test('should remove expense from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[0].id
	store.dispatch(startRemoveExpense({id})).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})
		return database(`users/${uid}/expenses/${id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy()

	})
	done()
})

test('should edit expense', () => {
	const action = editExpense('abc123', {note: 'New note value'});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: 'abc123',
		updates: {
			note: 'New note value'
		}
	})
});

test('should edit expense in firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[0].id
	const updates = {
		description: 'heating bill'
	}
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions()
		expect(actions[0]),toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		})
		return database.ref(`users/${uid}/expenses/${id}`).once('value')
	}).then((snapshot) => {
		expect(snapshot.val().description).toBe(updates.description)
	})
	done()
})

test('should setup add expense with provided values', () => {

	const action = addExpense(expenses[0]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[0]
	})
});

//as dispatch call an async function with the database stuff we need done to wait till its finished
test('should add expense to database and store', (done) => {
	const store = createMockStore(defaultAuthState)
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData)
		done()
	})
})

test('should add expense with default to database and store', (done) => {
	const store = createMockStore(defaultAuthState)
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
		return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')

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
	const store = createMockStore(defaultAuthState)
	store.dispatch(startSetExpense()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})