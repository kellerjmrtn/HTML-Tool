"use strict";
exports.__esModule = true;
var TagNode_1 = require("./TagNode");
var Lexer = /** @class */ (function () {
    function Lexer(rawData) {
        this.rawData = rawData;
        this.language = this.findLanguage();
    }
    Lexer.prototype.getDescriptorTag = function () {
        var descriptorText = this.rawData.match(/<.+?>/)[0];
        var descriptorNode = new TagNode_1.TagNode(descriptorText);
        return descriptorNode;
    };
    Lexer.prototype.getLanguage = function () {
        return this.language;
    };
    Lexer.prototype.findLanguage = function () {
        var openTag = this.getDescriptorTag();
        if (openTag.getOpenTagText().toUpperCase().includes("!DOCTYPE")) {
            var allAttr = openTag.getAttributes();
            for (var i = 0; i < allAttr.length; i++) {
                if (allAttr[i].getProperty().toUpperCase() == "HTML") {
                    return "html";
                }
            }
            return "unsupported";
        }
        else if (openTag.getOpenTagText().toUpperCase().includes("?XML")) {
            return "xml";
        }
        else {
            return null;
        }
        /*let lang = openTag.slice(2, openTag.length - 1);

        if(lang.split(" ").length > 1){
            return lang.split(" ")[1];
        } else {
            return null;
        }*/
    };
    return Lexer;
}());
exports.Lexer = Lexer;
