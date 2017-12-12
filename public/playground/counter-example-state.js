'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Counter = function (_React$Component) {
	_inherits(Counter, _React$Component);

	function Counter(props) {
		_classCallCheck(this, Counter);

		var _this = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

		_this.handleAddOne = _this.handleAddOne.bind(_this);
		_this.handleMinusOne = _this.handleMinusOne.bind(_this);
		_this.handleReset = _this.handleReset.bind(_this);

		//state is defined in the constructor
		//state has all the data that we want to track and change in the app
		_this.state = {
			count: props.count
		};
		return _this;
	}

	_createClass(Counter, [{
		key: 'handleAddOne',
		value: function handleAddOne() {
			//use setState to change the state
			this.setState(function (prevState) {
				//we return an object with the state properties which have to be changed, other which dont change can be omitted
				return {
					count: prevState.count + 1
				};
			});
		}
	}, {
		key: 'handleMinusOne',
		value: function handleMinusOne() {
			this.setState(function (prevState) {
				return {
					count: prevState.count - 1
				};
			});
		}
	}, {
		key: 'handleReset',
		value: function handleReset() {
			this.setState(function () {
				return {
					count: 0
				};
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Count: ',
					this.state.count
				),
				React.createElement(
					'button',
					{ onClick: this.handleAddOne },
					'+1'
				),
				React.createElement(
					'button',
					{ onClick: this.handleMinusOne },
					'-1'
				),
				React.createElement(
					'button',
					{ onClick: this.handleReset },
					'reset'
				)
			);
		}
	}]);

	return Counter;
}(React.Component);

Counter.defaultProps = {
	count: 0
};
ReactDOM.render(React.createElement(Counter, null), document.getElementById('app'));