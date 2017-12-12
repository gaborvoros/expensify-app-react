'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function () {
	//default value can be defined, constructor is called each time
	function Person() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Anonymus';
		var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

		_classCallCheck(this, Person);

		this.name = name;
		this.age = age;
	}

	_createClass(Person, [{
		key: 'getGreeting',
		value: function getGreeting() {
			//return 'Hi ' + this.name;

			//es6
			return 'Hi I\'m ' + this.name + '.';
		}
	}, {
		key: 'getDescription',
		value: function getDescription() {
			return this.name + ' is ' + this.age + ' years old.';
		}
	}]);

	return Person;
}();

//creating a subclass


var Student = function (_Person) {
	_inherits(Student, _Person);

	//we override the constructor
	function Student() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Anonymus';
		var age = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
		var major = arguments[2];

		_classCallCheck(this, Student);

		var _this = _possibleConstructorReturn(this, (Student.__proto__ || Object.getPrototypeOf(Student)).call(this, name, age));
		//name and age are already defined, so there is no need to define again
		/*this.name = name;
  this.age = age;*/

		//call parent classes constructor and add a new property


		_this.major = major;
		return _this;
	}

	_createClass(Student, [{
		key: 'hasMajor',
		value: function hasMajor() {
			// !! -> flip it 2 times so if there is no value provided it ends up as false and not undefined
			return !!this.major;
		}

		//override the method from the parent class

	}, {
		key: 'getDescription',
		value: function getDescription() {
			//its also possible to call the return value of the method with super from the parent class
			var description = _get(Student.prototype.__proto__ || Object.getPrototypeOf(Student.prototype), 'getDescription', this).call(this);

			if (this.hasMajor()) {
				description += ' Their major is ' + this.major + '.';
			}

			return description;
		}
	}]);

	return Student;
}(Person);

var Traveler = function (_Person2) {
	_inherits(Traveler, _Person2);

	function Traveler(name, age, homeLocation) {
		_classCallCheck(this, Traveler);

		var _this2 = _possibleConstructorReturn(this, (Traveler.__proto__ || Object.getPrototypeOf(Traveler)).call(this, name, age));

		_this2.homeLocation = homeLocation;
		return _this2;
	}

	_createClass(Traveler, [{
		key: 'getGreeting',
		value: function getGreeting() {
			var home = _get(Traveler.prototype.__proto__ || Object.getPrototypeOf(Traveler.prototype), 'getGreeting', this).call(this);

			//homeLocation has no default value in the constructor so there is no need for a flipping function
			if (this.homeLocation) {
				home += ' I\'m visiting from ' + this.homeLocation;
			}
			return home;
		}
	}]);

	return Traveler;
}(Person);

var me = new Student('Gabor Vörös', 36, 'React');
console.log(me);
console.log(me.getDescription());

var other = new Student();
console.log(other);
console.log(other.getDescription());

var trav1 = new Traveler('John Doe', 34, 'Pecs');
console.log(trav1.getGreeting());

var trav2 = new Traveler('John Doe');
console.log(trav2.getGreeting());