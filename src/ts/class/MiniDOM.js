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
    return MiniDOM;
}());
exports.MiniDOM = MiniDOM;
