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
import './firebase/firebase'

const store = configStore();

// PRovider takes over the higher component function
//provider allows to provide the store to all other components
//all components have acces to store
const jsx = (
		<Provider store={store}>
			<AppRouter/>
		</Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
