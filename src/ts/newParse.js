"use strict";
exports.__esModule = true;
var MiniDOM_1 = require("./class/MiniDOM");
var fs = require("fs");
var out;
var start = Date.now();
fs.readFile("input.html", "utf8", function (err, data) {
    out = main(err, data);
    var delta = Date.now() - start;
    console.log("Elapsed time: " + delta + " ms");
});
function main(err, data) {
    if (err)
        throw err;
    var miniDOM = new MiniDOM_1.MiniDOM(data);
    miniDOM.buildDOM();
    console.log(miniDOM.getLanguage());
    var allNodes = miniDOM.getNodes();
    console.log(allNodes);
    return null;
}
