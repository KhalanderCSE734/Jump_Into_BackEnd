console.log("Hello There");

//Require is similar to import statements

// const math = require("./math");
// The above is similar to 'import math from './math'
// console.log( "Math value is ", math);
// console.log( "Math value is ", math(2,4));

// console.log(math);


const math = require("./math");         //OR
const {addFn,subFn} = require("./math");

// console.log(math.addFn(2,4));
// console.log(math.subFn(2,4));

console.log(addFn(2,4));
console.log(subFn(2,4));
