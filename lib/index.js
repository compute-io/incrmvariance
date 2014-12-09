/**
*
*	COMPUTE: incrmvariance
*
*
*	DESCRIPTION:
*		- Provides a method to compute a moving sample variance incrementally.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isInteger = require( 'validate.io-integer' );


// INCREMENTAL MOVING SAMPLE VARIANCE //

/**
* FUNCTION: incrmvariance( W )
*	Returns a method to compute a moving sample variance incrementally.
*
* @param {Number} W - window size
* @returns {Function} method to compute a moving sample variance incrementally
*/
function incrmvariance( W ) {
	if ( !isInteger( W ) || W < 1 ) {
		throw new TypeError( 'incrmvariance()::invalid input argument. Window size must be a positive integer.' );
	}
	var arr = new Array( W ),
		n = W - 1,
		M2 = 0,
		mu = 0,
		N = 0,
		i = -1,
		delta,
		tmp,
		d1,
		d2;
	/**
	* FUNCTION: incrmvariance( [value] )
	*	If a `value` is provided, updates and returns the updated sample variance. If no `value` is provided, returns the current sample variance.
	*
	* @param {Number} [value] - value used to update the moving sample variance
	* @returns {Number} sample variance
	*/
	return function incrmvariance( x ) {
		if ( !arguments.length ) {
			if ( N === 0 ) {
				return null;
			}
			if ( N === 1 ) {
				return 0;
			}
			if ( N < W ) {
				return M2 / (N-1);
			}
			return M2 / n;
		}
		// Update the index for managing the circular buffer...
		i = (i+1) % W;

		// Fill up the initial window; else, update the existing window...
		if ( N < W ) {
			arr[ i ] = x;
			N += 1;
			delta = x - mu;
			mu += delta / N;
			M2 += delta * (x - mu);
			if ( N === 1 ) {
				return 0;
			}
			return M2 / (N-1);
		}
		if ( N === 1 ) {
			return 0;
		}
		tmp = arr[ i ];
		arr[ i ] = x;
		delta = x - tmp;
		d1 = tmp - mu;
		mu += delta / W;
		d2 = x - mu;
		M2 += delta * (d1 + d2);

		return M2 / n;
	};
} // end FUNCTION incrmvariance()


// EXPORTS //

module.exports = incrmvariance;
