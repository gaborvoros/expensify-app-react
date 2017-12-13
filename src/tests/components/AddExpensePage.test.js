import React from 'react'
import {shallow} from 'enzyme'
import {AddExpensePage} from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let startAddExpense, history, wrapper

beforeEach(() => {
	//simulate onsubmit function from component
	startAddExpense = jest.fn()
	//simulate push to array in component
	 history = {push: jest.fn()}
	 wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>)
})

test('should render AddExpensePage correctly', () => {
	expect(wrapper).toMatchSnapshot();
})

test('should handle onsubmit', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])
	expect(history.push).toHaveBeenLastCalledWith('/')
	expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1])
})