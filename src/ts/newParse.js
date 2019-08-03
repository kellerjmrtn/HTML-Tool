var fs = require("fs");
var out;
var Attribute = /** @class */ (function () {
    function Attribute() {
    }
    return Attribute;
}());
var TagNode = /** @class */ (function () {
    function TagNode(tagText) {
        // Set openTag
        this.openTag = tagText;
        // find attributes
        while (true) {
            break;
        }
        // find tag name
        var insideTag = tagText.slice(2, tagText.length - 1);
        if (insideTag.split(" ").length > 1) {
            this.type = insideTag.split(" ")[0];
        }
        else {
            this.type = insideTag;
        }
        // set open tag --- UNFINISHED
    }
    TagNode.prototype.getOpenTag = function () {
        return this.openTag;
    };
    return TagNode;
}());
var Lexer = /** @class */ (function () {
    function Lexer(rawData) {
        this.rawData = rawData;
        this.language = this.findLanguage();
    }
    Lexer.prototype.getDescriptorTag = function () {
        var descriptorText = this.rawData.match(/<!.+?>/)[0];
        var descriptorNode = new TagNode(descriptorText);
        return descriptorNode;
    };
    Lexer.prototype.getLanguage = function () {
        return this.language;
    };
    Lexer.prototype.findLanguage = function () {
        var openTag = this.getDescriptorTag().getOpenTag();
        var lang = openTag.slice(2, openTag.length - 1);
        if (lang.split(" ").length > 1) {
            return lang.split(" ")[1];
        }
        else {
            return null;
        }
    };
    return Lexer;
}());
var MiniDOM = /** @class */ (function () {
    function MiniDOM(rawData, language) {
        this.lex = new Lexer(rawData);
        if (language != undefined) {
            this.language = language;
        }
        else {
            this.language = this.lex.getLanguage();
            // parse first node for language
            // if none found, try to guess language
        }
    }
    MiniDOM.prototype.getLanguage = function () {
        return this.language;
    };
    return MiniDOM;
}());
fs.readFile("input.html", "utf8", function (err, data) {
    out = main(err, data);
});
function main(err, data) {
    if (err)
        throw err;
    var miniDOM = new MiniDOM(data);
    console.log(miniDOM.getLanguage());
    return null;
}
