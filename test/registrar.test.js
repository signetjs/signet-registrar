'use strict';

var assert = require('chai').assert;
var registrar = require('../index');

describe('registry', function () {

    it('should be a factory function', function () {
        assert.equal(typeof registrar(), 'object');
    });

    describe('set', function () {

        var registry;

        beforeEach(function(){
            registry = registrar();
        });

        it('should set a type predicate', function () {
            var predicate = function () {  };

            registry.set('testType', predicate);

            assert.equal(registry.get('testType'), predicate);
        });

        it('should throw an error if key is not a string', function () {
            var errorSet = registry.set.bind(null, {}, function () {  });

            assert.throws(errorSet, 'Invalid type name: ' + {});
        });

        it('should throw an error if key is invalid', function () {
            var badTypeName = 'bad type <[;]>=>,';
            var errorCall = registry.set.bind(null, badTypeName, function () {  });

            assert.throws(errorCall, 'Invalid type name: ' + badTypeName);
        });

        it('should throw an error if key already exists', function () {
            registry.set('foo', function () {  });
            var errorCall = registry.set.bind(null, 'foo', function () {  });

            assert.throws(errorCall, 'Type already registered with name foo');
        });

        it('should throw an error if type predicate param is not a function', function () {
            var errorCall = registry.set.bind(null, 'foo', null);

            assert.throws(errorCall, 'Type predicate parameter must be a function');
        });

    });

});
