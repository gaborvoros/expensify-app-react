import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {addExpense, removeExpense, editExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'

const store = configStore();

const expense1 = store.dispatch(addExpense({description: 'water bill', amount: 100, createdAt: 100}));
const expense2 = store.dispatch(addExpense({description: 'gas bill', amount: 35, createdAt: 200}));
const expense3 = store.dispatch(addExpense({description: 'rent', amount: 10052, createdAt: 1000}));


const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);




// PRovider takes over the higher component function
//provider allows to provide the store to all other components
//all components have acces to store
const jsx = (
		<Provider store={store}>
			<AppRouter/>
		</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
