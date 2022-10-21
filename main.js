// JEITO ANTIGO
// const circle = require('./circle.js');
// let r = 3;
// console.log(`Circle with radius ${r}) has area: ${circle.area(r)}
// circumference: ${circle.circumference(r)}`)


import { area, circumference } from "./circles.js";

const r = 3;

console.log(`Circle with radius ${r} has area: ${area(r)}; 
circumference: ${circumference(r)}`);
