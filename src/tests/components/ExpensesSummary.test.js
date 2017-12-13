import React from 'react'
import {shallow} from 'enzyme'
import {ExpenseSummary} from '../../components/ExpensesSummary'

test('should correctly render ExpenseSummary with 1 expense', () => {
	const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235}/>)
	expect(wrapper).toMatchSnapshot();
})

test('should correctly render ExpenseSummary with multiple expenses', () => {
	const wrapper = shallow(<ExpenseSummary expenseCount={23} expensesTotal={23554654}/>)
	expect(wrapper).toMatchSnapshot();
})