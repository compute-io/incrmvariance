'use strict';

var incrmvariance = require( './../lib' );

// Initialize a method to calculate the moving sample variance incrementally:
var mvariance = incrmvariance( 5 );

// Simulate some data...
var value, s2;

console.log( '\nValue\tSample Variance\n' );

for ( var i = 0; i < 100; i++ ) {

	value = Math.random() * 100;
	s2 = mvariance( value );

	console.log( '%d\t%d', value.toFixed( 4 ), s2.toFixed( 4 ) );
}
