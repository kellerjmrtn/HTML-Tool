"use strict";
exports.__esModule = true;
var Lexer_1 = require("./Lexer");
var MiniDOM = /** @class */ (function () {
    function MiniDOM(rawData, language) {
        this.lex = new Lexer_1.Lexer(rawData);
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
    MiniDOM.prototype.getNodes = function () {
        return this.nodes;
    };
    MiniDOM.prototype.buildDOM = function () {
        this.nodes = this.lex.findAllTags();
    };
    MiniDOM.prototype.toString = function () {
        var outString = "";
        // meta-data
        outString += "<!---  META-DATA:";
        outString += "\nLanugage: " + this.language;
        outString += "  --->\n\n<!----------- DOCUMENT START ----------->\n\n";
        for (var i = 0; i < this.nodes.length; i++) {
            outString += this.nodes[i].toString(0);
        }
        return outString;
    };
    return MiniDOM;
}());
exports.MiniDOM = MiniDOM;
