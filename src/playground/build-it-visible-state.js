class VisibilityToggle extends React.Component {
	constructor(props) {
		super(props);
		this.handleVisibility = this.handleVisibility.bind(this)
		this.state = {
			visibility: false
		}
	}

	handleVisibility() {
		this.setState((prevState) => {
			return {
				visibility: !prevState.visibility
			}
		});
	}

	render() {
		return (
				<div>
					<h1>Visibility Toggle</h1>
					<button onClick={this.handleVisibility}>{this.state.visibility ? 'Hide details' : 'Show details'}</button>
					{this.state.visibility && (<p>hey there this is a text</p>)}
				</div>
		)
	}
}
ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));