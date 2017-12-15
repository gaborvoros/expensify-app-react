import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter, {history} from './routers/AppRouter';
import configStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import {startSetExpense} from './actions/expenses';
import {setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css'
import {firebase} from './firebase/firebase'

const store = configStore();
let hasRendered = false;
const renderApp = () => {
	if(!hasRendered){
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true
	}
}

// PRovider takes over the higher component function
//provider allows to provide the store to all other components
//all components have acces to store
const jsx = (
		<Provider store={store}>
			<AppRouter/>
		</Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if(user){
		store.dispatch(startSetExpense()).then(() => {
			renderApp()
			if(history.location.pathname === '/'){
				history.push('/dashboard')
			}
		})
	}else{
		renderApp()
		history.push('/')
	}
})