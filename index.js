var registrar = (function () {
    'use strict';

    return function() {
        function isTypeOf (type, value) {
            return typeof value === type;
        }

        function isValidTypeName (value) {
            return isTypeOf('string', value) && value.match(/^[^\(\)\<\>\;\=\,\s]+$/) !== null;
        }

        function throwOnBadType (name, predicate) {
            if(!isValidTypeName(name)){
                throw new Error('Invalid type name: ' + name);
            }

            if (!isTypeOf('undefined', registry[name])) {
                throw new Error('Type already registered with name ' + name);
            }

            if (!isTypeOf('function', predicate)) {
                throw new Error('Type predicate parameter must be a function');
            }
        }

        var registry = {};

        function get (name) {
            return registry[name];
        }

        function set (name, predicate){
            throwOnBadType(name, predicate);

            registry[name] = predicate;
        }

        return {
            get: get,
            set: set
        };
    }

})();

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = registrar;
}