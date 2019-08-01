var fs = require("fs");
var out;
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
var MiniDOM = /** @class */ (function () {
    function MiniDOM(rawData, language) {
        if (language != undefined) {
            this.language = language;
        }
        else {
            this.language = this.findOpeningDescriptor();
            // parse first node for language
            // if none found, try to guess language
        }
    }
    MiniDOM.prototype.findOpeningDescriptor = function () {
        return null;
    };
    MiniDOM.Lexer = /** @class */ (function () {
        function class_1() {
        }
        class_1.prototype.getNode = function () {
            return null;
        };
        return class_1;
    }());
    return MiniDOM;
}());
fs.readFile("input.html", "utf8", function (err, data) {
    out = main(err, data);
});
function main(err, data) {
    if (err)
        throw err;
    var miniDOM = new MiniDOM(data);
    return null;
}
