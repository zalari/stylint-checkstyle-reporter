'use strict';

var path     = require('path');
var messages = [];

module.exports = function (message, done) {
    if (done === 'done') {
        var result = [];

        result.push({
            filePath    : path.relative(process.cwd(), this.cache.file),
            messages    : messages,
            errorCount  : this.cache.errs.length,
            warningCount: this.cache.warnings.length
        });

        this.cache.msg = JSON.stringify(result);

        return this.done();
    }

    messages.push({
        severity: this.state.severity,
        message : message,
        rule    : this.cache.rule,
        line    : this.cache.lineNo,
        column  : this.cache.col
    });

    return '';
};
