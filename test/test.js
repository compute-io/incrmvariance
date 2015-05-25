/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	incrmvariance = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-incrmvariance', function tests() {

	it( 'should export a function', function test() {
		expect( incrmvariance ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer', function test() {
		var values = [
			'5',
			-5,
			0,
			Math.PI,
			true,
			null,
			undefined,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				incrmvariance( value );
			};
		}
	});

	it( 'should return a function', function test() {
		expect( incrmvariance( 3 ) ).to.be.a( 'function' );
	});

	it( 'should compute a moving sample variance incrementally', function test() {
		var data,
			N,
			d,
			expected,
			actual,
			mvar;

		data = [ 2, 3, 4, -1, 3, 1 ];
		N = data.length;

		mvar = incrmvariance( 3 );

		actual = new Array( N );
		for ( var i = 0; i < N; i++ ) {
			d = data[ i ];
			actual[ i ] = mvar( d );
		}

		expected = [ 0, 0.5, 1, 7, 7, 4 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should return the current moving sample variance if provided no arguments', function test() {
		var data = [ 2, 3, 10 ],
			len = data.length,
			mvar = incrmvariance( 3 ),
			i;

		for ( i = 0; i < len-1; i++ ) {
			mvar( data[ i ] );
		}
		assert.strictEqual( mvar(), 0.5 );

		for ( i = 0; i < len; i++ ) {
			mvar( data[ i ] );
		}
		assert.closeTo( mvar(), 19, 1e-10 );
	});

	it( 'should return null if asked for a moving sample variance when not having received any data', function test() {
		var mvar = incrmvariance( 3 );
		assert.isNull( mvar() );
	});

	it( 'should return 0 if asked for a moving sample variance when having received only a single datum', function test() {
		var mvar = incrmvariance( 3 );
		mvar( 4 );
		assert.strictEqual( mvar(), 0 );
	});

	it( 'should always return 0 if provided a window size equal to 1', function test() {
		var mvariance = incrmvariance( 1 );
		mvariance( 4 );
		assert.strictEqual( mvariance(), 0 );
		assert.strictEqual( mvariance( 5 ), 0 );
		assert.strictEqual( mvariance( 2 ), 0 );
		for ( var i = 0; i < 100; i++ ) {
			assert.strictEqual( mvariance( i ), 0 );
		}
	});

});
