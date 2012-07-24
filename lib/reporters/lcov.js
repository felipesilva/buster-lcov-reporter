var buster = require('buster');

module.exports = {
    create: function (opt) {
        opt = opt || {};
        var reporter = buster.create(this);
        reporter.io = opt.io || require("util");

        return reporter;
    },
    listen: function (runner) {
        runner.bind(this, {
            "suite:end": "printReport"
        });
    },
    format: function(){
        var jscoverage = global._$jscoverage;
        var lcov = [];

        for (var file in jscoverage) {
            lcov[0] = 'SF: ' + file;

            for(var i=0; i<jscoverage[file].length; i++){
                timesExecuted = jscoverage[file][i];
                lineNumber = i + 1;

                if (timesExecuted !== undefined && typeof timesExecuted !== 'object') {
                    lcov.push('DA: ' + lineNumber + ', ' + timesExecuted);
                }
            }

            lcov.push('end_of_record');
        }
        
        return lcov.join('\n');
    },
    printReport: function(){
        this.io.puts(this.format());
    }
};
