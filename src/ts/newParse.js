"use strict";
exports.__esModule = true;
var MiniDOM_1 = require("./class/MiniDOM");
var fs = require("fs");
var out;
fs.readFile("input.html", "utf8", function (err, data) {
    out = main(err, data);
});
function main(err, data) {
    if (err)
        throw err;
    var miniDOM = new MiniDOM_1.MiniDOM(data);
    console.log(miniDOM.getLanguage());
    return null;
}
