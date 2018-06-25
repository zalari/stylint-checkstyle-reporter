const fs = require('fs');
const path = require('path');

const files = {};
const getFileData = (file) => {
  return files[file] || {
    path: path.relative(process.cwd(), file),
    messages: []
  };
};

// TODO: move to (and publish) separate module
module.exports = function (message, done) {

  if (done === 'done') {
    const options = this.config.reporterOptions || {};
    const reportPath = path.resolve(options.reportPath || 'stylint-checkstyle-report.xml');
    const data = `<?xml version="1.0" encoding="utf-8"?>
<checkstyle version="4.3">
${Object.keys(files).map(file => `  <file name="${files[file].path}">
${files[file].messages.map(message => `    <error line="${message.line}" column="${message.column}" severity="${message.severity}" message="${message.message}" source="${message.source}" />`).join("\r\n")}
  </file>`).join("\r\n")}
</checkstyle>`;

    fs.writeFileSync(reportPath, data);

    console.log(`Stylint report written to ${reportPath}`);

    return this.done();
  }

  const fileData = getFileData(this.cache.file);
  const { rule, lineNo, col } = this.cache;

  fileData.messages.push({
    message,
    rule,
    line: lineNo,
    column: col,
    severity: this.state.severity.toLowerCase(),
    source: `failure.stylint.${rule}`
  });

  files[this.cache.file] = fileData;
};
