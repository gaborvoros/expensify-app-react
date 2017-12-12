const appRoute = document.getElementById('app');

const txt = 'hey there this is a text';
let toggleVal = false

const visibilityToggle = () => {
	//change value to opposit boolean
	toggleVal = !toggleVal;
	render();
}

function renderText(val) {
	if (val) {
		return <p>{txt}</p>
	}
}

const render = () => {
	const template = (
			<div>
				<h1>Visibility Toggle</h1>
				{/* toggleVal === false && <button onClick={toggleShow}>Show details</button> */}
				{/* toggleVal && <button onClick={toggleHide}>Hide details</button> */}
				<button onClick={visibilityToggle}>
					{toggleVal ? 'Hide details' : 'Show details'}
				</button>
				{renderText(toggleVal)}
				{toggleVal && (
						<p>Put jsx directly into the other jsx</p>
				)}
			</div>
	);
	ReactDOM.render(template, appRoute);
}
render();
