var buster = require('buster');
var assert = buster.assertions.assert;
var format = require('../lib/reporters/lcov.js').format;

global._$jscoverage = {
    "person.js": [ 
        ,
        1,
        0,
        0,
        {"source": [ 
                    'function Person(){',
                    '\tthis.firstName = "Felipe";',
                    '\tthis.lastName = "Silva";',
                    '}' 
                ] }
    ]
};

var testCase = buster.testCase("Buster Coverage Tests", {
    "Given the global jscoverage object, I expect the following lcov report": function(){
        var lCovExpected = [
            'FS: person.js',
            'DS: 2, 1',
            'DS: 3, 0',
            'DS: 4, 0',
            'end_of_record'
        ];

        assert.equals(format(), lCovExpected.join('\n'));
    }
});