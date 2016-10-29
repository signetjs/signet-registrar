'use strict';

var assert = require('chai').assert;
var registrarFactory = require('../index');

describe('registrar', function () {

    it('should be a factory function', function () {
        assert.equal(typeof registrarFactory(), 'object');
    });

    describe('set', function () {

        var registrar;

        beforeEach(function(){
            registrar = registrarFactory();
        });

        it('should set a type predicate', function () {
            var predicate = function () {  };

            registrar.set('testType', predicate);

            assert.equal(registrar.get('testType'), predicate);
        });

        it('should throw an error if key is not a string', function () {
            var errorSet = registrar.set.bind(null, {}, function () {  });

            assert.throws(errorSet, 'Invalid type name: ' + {});
        });

        it('should throw an error if key is invalid', function () {
            var badTypeName = 'bad type <[;]>=>,';
            var errorCall = registrar.set.bind(null, badTypeName, function () {  });

            assert.throws(errorCall, 'Invalid type name: ' + badTypeName);
        });

        it('should throw an error if key already exists', function () {
            registrar.set('foo', function () {  });
            var errorCall = registrar.set.bind(null, 'foo', function () {  });

            assert.throws(errorCall, 'Type already registered with name foo');
        });

        it('should throw an error if type predicate param is not a function', function () {
            var errorCall = registrar.set.bind(null, 'foo', null);

            assert.throws(errorCall, 'Type predicate parameter must be a function');
        });

    });

});
