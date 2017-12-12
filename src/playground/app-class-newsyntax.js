import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));

/*
 *class Options extends React.Component {
 *	render() {
 *		return (
 *				<div>
 *				 //handleDeleteOptions comes from the top class IndecisionApp
 *             //so it can manipulate the state defined in the constructor
 *					<button onClick={this.props.handleDeleteOptions}>Remove All</button>
 *					<p>Length: {this.props.options.length}</p>
 *					{
 *						this.props.options.map((option) => <Option key={option} optionText={option}/>)
 *					}
 *					<Option />
 *				</div>
 *		)
 *	}
 *}
 */


//stateless component - can take arguments from the properties
//faster than class based components
/*
 * const User = (props) => {
 *   return (
 *      <div>
 *        <p>Name: {props.name}</p>
 *        <p>Age: </p>
 *      </div>
 *    )
 * }
 */

/*-----------------------------------------------------------*/

//constructor function has to be created
class OldSyntax {
	constructor() {
		this.name = 'Mike';
		//binding is needed if we reference/use this.name
		this.getGreeting= this.getGreeting.bind(this);
	}
	getGreeting() {
		//needs to be bind in the constructor
		return `Hi, my name is ${this.name}`
	}
}
const oldSyntax = new OldSyntax();
console.log(oldSyntax);
const getGreeting = oldSyntax.getGreeting;
//doesnt work without binding first, as there is no binding
console.log(getGreeting());

/*-----------------------------------------------------------*/

//with the new syntax we dont need this.name, just normal key - value pairs, without defining const or let or var
class NewSyntax {
	name = 'Jen';
	//its always bound to the class instance
	getGreeting = () => {
		return `Hi, my name is ${this.name}`
	}
}
const newSyntax = new NewSyntax();
console.log(newSyntax);
const newGreeting = newSyntax.getGreeting;

console.log(newGreeting());