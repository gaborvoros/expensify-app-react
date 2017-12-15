import uuid from 'uuid';
import database from '../firebase/firebase'

export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
})

export const startAddExpense = (expenseData = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		const {
				description = '',
				note = '',
				amount = 0,
				createdAt = 0
		} = expenseData

		const expense = {description, note, amount, createdAt}

		return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
			//dispatch needs to be called or the redux store is not changed
			//ref.key has the newly generated key from firebase
			dispatch(addExpense({
				id: ref.key,
				...expense
			}))
		})
	}
}

export const removeExpense = ({id} = {}) => {
	return {
		type: 'REMOVE_EXPENSE',
		id
	}
}

export const startRemoveExpense = ({id} = {}) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		return database.ref(`users/${uid}/expenses/${id}`)
				.remove()
				.then(() => {
					dispatch(removeExpense({id}))
				}).catch((e) => {
			console.log('error', e)
		})
	}
}

export const editExpense = (id, updates) => {
	return {
		type: 'EDIT_EXPENSE',
		id,
		updates
	}
}

export const startEditExpense = (id, updates) => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		return database.ref(`users/${uid}/expenses/${id}`).update({
				...updates
		}).then(() => {
			dispatch(editExpense(id, updates))
		})
	}
}

export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
})

export const startSetExpense = () => {
	return (dispatch, getState) => {
		const uid = getState().auth.uid
		//using return allows in app.js to run '.then()'
		return database
				.ref(`users/${uid}/expenses`)
				.once('value')
				.then((snapshot) => {
					const expenses = [];
					snapshot.forEach((childSnapshot) => {
						expenses.push({
							id: childSnapshot.key,
							...childSnapshot.val()
						})
					})
					dispatch(setExpenses(expenses))
				}).catch((e) => {
					console.log('error fetching data', e)
				})
	}
}
