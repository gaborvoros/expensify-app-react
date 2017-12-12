'use strict';

var nameVar = 'Gabor';
var nameVar = 'Mike';

console.log('nameVar: ' + nameVar);

var nameLet = 'Gabor';
nameLet = 'Juli';

//redeclaration not working with let
//let nameLet = 'Juli';
console.log('nameLet: ' + nameLet);

//const can not redefine
var nameConst = 'Gabor';
//nameConst = 'Juli';
console.log('nameConst: ' + nameConst);

//block scoping - var based variables are function based -> they work outside of if
var fullName = 'Gabor Voros';
if (fullName) {
	var firstName = fullName.split(' ')[0];
	console.log(firstName);
}
console.log(firstName);

//const and let are not working outside if
var fullName2 = 'Gabor Voros';
if (fullName) {
	var _firstName = fullName.split(' ')[0];
	console.log(_firstName);
}
console.log(firstName2);