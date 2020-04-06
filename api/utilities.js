let utilities = {};

utilities.parseTemplate = function (template,data) {
    const names=Object.keys(data);
    const vals=Object.values(data);
    //note: if template has backticks replace with \`
    const fn = new Function (...names,'return `' + template.replace(/`/g,'\\`') + '`');
    return fn(...vals);
};

module.exports = utilities;
