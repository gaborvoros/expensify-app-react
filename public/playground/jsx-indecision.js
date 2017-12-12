'use strict';

var app = {
	title: 'Indecision app',
	subtitle: 'Put your life in the hands of a computer',
	options: []
};

//call this function in form without (), so like {onFormSubmit}, otherwise it will want to return back a value -> undefined
var onFormSubmit = function onFormSubmit(event) {
	event.preventDefault();
	var option = event.target.elements.option.value;

	if (option) {
		//add it to option
		app.options.push(option);
		//clear form
		event.target.elements.option.value = '';
		render();
	}
	console.log(app.options);
};

var removeAll = function removeAll() {
	app.options = [];
	render();
};

var appRoute = document.getElementById('app');

var onMakeDecision = function onMakeDecision() {
	//generate random number - between 0 and the length of the array
	var randomNum = Math.floor(Math.random() * app.options.length);

	//pull some item from the options randomly based of the random number generated
	var option = app.options[randomNum];
	alert(option);
};

var render = function render() {
	var template = React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			app.title
		),
		app.subtitle && React.createElement(
			'p',
			null,
			app.subtitle
		),
		React.createElement(
			'p',
			null,
			app.options.length > 0 ? 'Here are your options' : 'No options'
		),
		React.createElement(
			'button',
			{ disabled: app.options.length === 0, onClick: onMakeDecision },
			'What should I do?'
		),
		React.createElement(
			'button',
			{ onClick: removeAll },
			'Remove All'
		),
		React.createElement(
			'ol',
			null,

			//map and array needs to be used as objects are not working here
			/*app.options.map((option) => {
    return <li key={option}>{option}</li>
    })*/
			//es6
			app.options.map(function (option) {
				return React.createElement(
					'li',
					{ key: option },
					option
				);
			})
		),
		React.createElement(
			'form',
			{ onSubmit: onFormSubmit },
			React.createElement('input', { type: 'text', name: 'option' }),
			React.createElement(
				'button',
				{ type: 'submit' },
				'Add Option'
			)
		)
	);
	ReactDOM.render(template, appRoute);
};
render();