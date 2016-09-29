var path      = require('path');
var stylint   = require('stylint');
var clone     = require('lodash.clonedeep');
var origCache = require('stylint/src/core/cache');
var origState = require('stylint/src/core/state');
var chai      = require('chai');
var expect    = chai.expect;

const stylintInstance = stylint().create();

describe('stylint-json-reporter', () => {
    beforeEach(() => {
        stylintInstance.state = clone(origState);
        stylintInstance.cache = clone(origCache);

        stylintInstance.state.quiet            = true;
        stylintInstance.state.watching         = true;
        stylintInstance.state.strictMode       = false;
        stylintInstance.config.reporter        = require.resolve('./index');
        stylintInstance.config.reporterOptions = undefined;
        stylintInstance.config.maxErrors       = undefined;
        stylintInstance.config.maxWarnings     = undefined;

        stylintInstance.init()
    });

    it('should report if all green', () => {
        var outputJSON = stylintInstance.reporter('just done without errors', 'done').msg;
        var output     = JSON.parse(outputJSON);

        expect(output.length).to.equal(1);
        var report = output[0];
        expect(report).to.have.keys('filePath', 'messages', 'errorCount', 'warningCount');
        expect(report.messages).to.be.an('array');
        expect(report.errorCount).to.be.a('number');
        expect(report.warningCount).to.be.a('number');
        expect(report.filePath).to.be.a('string');

        expect(report.errorCount).to.equal(0);
        expect(report.warningCount).to.equal(0);
        expect(report.messages).to.be.empty;
    });

    it('should report violations', () => {
        stylintInstance.cache.file     = path.resolve('file.styl');
        stylintInstance.cache.lineNo   = 15;
        stylintInstance.cache.errs     = ['', ''];
        stylintInstance.cache.warnings = [''];
        stylintInstance.state.severity = '';
        stylintInstance.reporter('leading zeros for decimal points are required');
        stylintInstance.cache.lineNo   = 10;
        stylintInstance.cache.col      = 16;
        stylintInstance.state.severity = 'Warning';
        stylintInstance.reporter('unnecessary semicolon found');
        stylintInstance.cache.file     = 'file.styl';
        stylintInstance.cache.lineNo   = 21;
        stylintInstance.cache.col      = 4;
        stylintInstance.state.severity = 'Error';
        stylintInstance.reporter('property is not valid');

        var outputJSON = stylintInstance.reporter('finished with some errors', 'done').msg;
        var output     = JSON.parse(outputJSON);

        expect(output.length).to.equal(1);
        var report = output[0];
        expect(report.messages.length).to.equal(3);
        expect(report.filePath).to.equal('file.styl');

        var firstMessage = report.messages[0];
        expect(firstMessage.severity).to.be.empty;
        expect(firstMessage.message).to.equal('leading zeros for decimal points are required');
        expect(firstMessage.line).to.equal(15);

        var secondMessage = report.messages[1];
        expect(secondMessage.severity).to.equal('Warning');
        expect(secondMessage.message).to.equal('unnecessary semicolon found');
        expect(secondMessage.line).to.equal(10);
        expect(secondMessage.column).to.equal(16);

        var thirdMessage = report.messages[2];
        expect(thirdMessage.severity).to.equal('Error');
        expect(thirdMessage.message).to.equal('property is not valid');
        expect(thirdMessage.line).to.equal(21);
        expect(thirdMessage.column).to.equal(4);
    });
});
