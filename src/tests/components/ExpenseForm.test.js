import React from 'react'
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render expenseform correctly', () => {
	const wrapper = shallow(<ExpenseForm/>)
	expect(wrapper).toMatchSnapshot();
})

test('should render expenseform correctly with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>)
	expect(wrapper).toMatchSnapshot();
})

test('should render error for invalid submission', () => {
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	})

	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
	const value = 'New value'
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('input').at(0).simulate('change', {
		target: {value}
	})

	expect(wrapper.state('description')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should set note on textarea change', () => {
	const value = 'New value'
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('textarea').simulate('change', {
		target: {value}
	})

	expect(wrapper.state('note')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should set amount if valid', () => {
	const value = '23.50'
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('input').at(1).simulate('change', {
		target: {value}
	})

	expect(wrapper.state('amount')).toBe(value);
	expect(wrapper).toMatchSnapshot();
})

test('should set amount if invalid', () => {
	const value = '23.122'
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('input').at(1).simulate('change', {
		target: {value}
	})

	expect(wrapper.state('amount')).toBe('');
	expect(wrapper).toMatchSnapshot();
})

test('should call onsubmit prop for valid submission', () => {
	const onSumbitSpy = jest.fn()
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSumbitSpy}/>)
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	})

	expect(wrapper.state('error')).toBe('');
	expect(onSumbitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	});
})

test('should set new date on change', () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('SingleDatePicker').prop('onDateChange')(now)
	expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calender focus change', () => {
	const focused = true
	const wrapper = shallow(<ExpenseForm/>)
	wrapper.find('SingleDatePicker').prop('onFocusChange')({focused})
	expect(wrapper.state('focused')).toBe(focused)
})