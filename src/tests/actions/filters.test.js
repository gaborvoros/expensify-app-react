import moment from 'moment';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from '../../actions/filters';

test('should generate setStartDate obj', () => {
	const action = setStartDate(moment(0))
	expect(action).toEqual({
		type: 'SET_START_DATE',
		startDate: moment(0)
	})
})

test('should generate setEndDate obj', () => {
	const action = setEndDate(moment(0))
	expect(action).toEqual({
		type: 'SET_END_DATE',
		endDate: moment(0)
	})
})

test('should sort by amount', () => {
	const action = sortByAmount();
	expect(action).toEqual({
		type: 'SORT_BY_AMOUNT'
	})
})

test('should sort by date', () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: 'SORT_BY_DATE'
	})
})

test('should sort by text with provided value', () => {
	const text = 'bill'
	const action = setTextFilter(text);
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: text
	})
})

test('should sort by text with default value', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	})
})