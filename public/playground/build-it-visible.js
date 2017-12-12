'use strict';

var appRoute = document.getElementById('app');

var txt = 'hey there this is a text';
var toggleVal = false;

var visibilityToggle = function visibilityToggle() {
	//change value to opposit boolean
	toggleVal = !toggleVal;
	render();
};

function renderText(val) {
	if (val) {
		return React.createElement(
			'p',
			null,
			txt
		);
	}
}

var render = function render() {
	var template = React.createElement(
		'div',
		null,
		React.createElement(
			'h1',
			null,
			'Visibility Toggle'
		),
		React.createElement(
			'button',
			{ onClick: visibilityToggle },
			toggleVal ? 'Hide details' : 'Show details'
		),
		renderText(toggleVal),
		toggleVal && React.createElement(
			'p',
			null,
			'Put jsx directly into the other jsx'
		)
	);
	ReactDOM.render(template, appRoute);
};
render();