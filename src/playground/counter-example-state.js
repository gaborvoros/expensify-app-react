/*
 1. setup a state object in the constructor: should have all the data that we want to track and change
 2. use the state object in the jsx {this.state.count}
 3. change the state on an event, like click, with the method setState. just changing the state value is not working
 ***** NO this.state.count = this.state.value + 1 *******
 *
 * setState can have an argument which has the current state properties, usually called prevState
 * return a new object
 *
 *   this.setState(() => {
 *      return {
 *        count: 1
 *      }
 *   });
 *
 4. you need to provide only those state properties which are changing, like /// count: 1
 */

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOne = this.handleAddOne.bind(this);
		this.handleMinusOne = this.handleMinusOne.bind(this);
		this.handleReset = this.handleReset.bind(this);

		//state is defined in the constructor
		//state has all the data that we want to track and change in the app
		this.state = {
			count: props.count
		}
	}

	handleAddOne() {
		//use setState to change the state
		this.setState((prevState) => {
			//we return an object with the state properties which have to be changed, other which dont change can be omitted
			return {
				count: prevState.count + 1
			}
		});
	}

	handleMinusOne() {
		this.setState((prevState) => {
			return {
				count: prevState.count - 1
			}
		});
	}

	handleReset() {
		this.setState(() => {
			return {
				count: 0
			}
		});
	}

	render() {
		return (
				<div>
					{/* use state objects value */}
					<h1>Count: {this.state.count}</h1>
					<button onClick={this.handleAddOne}>+1</button>
					<button onClick={this.handleMinusOne}>-1</button>
					<button onClick={this.handleReset}>reset</button>
				</div>
		)
	}
}
Counter.defaultProps = {
	count: 0
}
ReactDOM.render(<Counter />, document.getElementById('app'))