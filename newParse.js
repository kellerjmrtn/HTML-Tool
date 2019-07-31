var fs = require("fs");
fs.readFile("input.html", "utf8", function (err, data) {
    console.log(data);
});
var Attribute = /** @class */ (function () {
    function Attribute() {
    }
    return Attribute;
}());
var TagNode = /** @class */ (function () {
    function TagNode() {
    }
    return TagNode;
}());
var tag = new TagNode();
tag.type = "div";
console.log(tag);
