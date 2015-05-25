incrmvariance
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a method to compute a moving sample variance incrementally.


## Installation

``` bash
$ npm install compute-incrmvariance
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var incrmvariance = require( 'compute-incrmvariance' );
```

#### incrmvariance( window )

Returns an initialized method to compute a moving sample variance incrementally. `window` sets the window size, i.e., the number of values over which to compute a moving sample variance.

``` javascript
var mvariance = incrmvariance( 3 );
```

#### mvariance( [value] )

If provided a `value`, the method updates and returns the sample variance of the current window. If not provided a `value`, the method returns the current sample variance.

``` javascript
var s2;

// Filling window...
s2 = mvariance( 2 );
// variance is 0

mvariance( 4 );
// variance is 2

mvariance( 0 );
// variance is 4

// Window starts sliding...
mvariance( -2 );
// variance is 9.5

mvariance( -1 );
// variance is 1

s2 = mvariance();
// returns 1
```


## Notes

1. 	If values have not yet been provided to `mvariance`, `mvariance` returns `null`.
1. 	The first `W-1` returned sample variances will have less statistical support than subsequent sample variances, as `W` values are needed to fill the window buffer. Until the window is full, the sample variance returned equals the [sample variance](https://github.com/compute-io/variance) of all values provided thus far.

The use case for this module differs from the conventional [vector](https://github.com/compute-io/mvariance) implementation and the [stream](https://github.com/flow-io/) implementation. Namely, this module decouples the act of updating the moving sample variance from the act of consuming the moving sample variance.



## Examples

``` javascript
var incrmvariance = require( 'compute-incrmvariance' );

// Initialize a method to calculate the moving sample variance incrementally:
var mvariance = incrmvariance( 5 ),
	s2;

// Simulate some data...
for ( var i = 0; i < 1000; i++ ) {
	s2 = mvariance( Math.random()*100 );
	console.log( s2 );
}
s2 = mvariance();
console.log( s2 );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.


[npm-image]: http://img.shields.io/npm/v/compute-incrmvariance.svg
[npm-url]: https://npmjs.org/package/compute-incrmvariance

[travis-image]: http://img.shields.io/travis/compute-io/incrmvariance/master.svg
[travis-url]: https://travis-ci.org/compute-io/incrmvariance

[coveralls-image]: https://img.shields.io/coveralls/compute-io/incrmvariance/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/incrmvariance?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/incrmvariance.svg
[dependencies-url]: https://david-dm.org/compute-io/incrmvariance

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/incrmvariance.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/incrmvariance

[github-issues-image]: http://img.shields.io/github/issues/compute-io/incrmvariance.svg
[github-issues-url]: https://github.com/compute-io/incrmvariance/issues
