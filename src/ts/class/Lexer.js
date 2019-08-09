"use strict";
exports.__esModule = true;
var TagNode_1 = require("./TagNode");
var Lexer = /** @class */ (function () {
    function Lexer(rawData) {
        this.rawData = rawData;
        this.language = this.findLanguage();
        this.formatData = rawData.replace(/(\r)/g, "").replace(/(\n)/g, " ").replace(/<!--.*?-->/g, "");
        this.currentIndex = 0;
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
        // Guess language?
    };
    Lexer.prototype.findNextTag = function () {
        var len = this.formatData.length;
        var tagStart = this.currentIndex;
        var inDoubleQuotes = false;
        var inSingleQuotes = false;
        var inTag = false;
        for (var i = this.currentIndex; i < len; i++) {
            var charAt = this.formatData.charAt(i);
            if (charAt == "<" && inDoubleQuotes == false && inSingleQuotes == false && inTag == false) {
                inTag = true;
                tagStart = i;
            }
            else if (charAt == ">" && inDoubleQuotes == false && inSingleQuotes == false && inTag == true) {
                this.currentIndex = i + 1;
                return new TagNode_1.TagNode(this.formatData.slice(tagStart, i + 1));
            }
            else if (charAt == '"' && inSingleQuotes == false && inTag == true) {
                inDoubleQuotes = !inDoubleQuotes;
            }
            else if (charAt == "'" && inDoubleQuotes == false && inTag == true) {
                inSingleQuotes = !inSingleQuotes;
            }
        }
        return null;
    };
    Lexer.prototype.findAllTags = function () {
        var allTags = [];
        while (true) {
            var tag = this.findNextTag();
            if (tag != null) {
                allTags.push(tag);
            }
            else {
                break;
            }
        }
        return allTags;
    };
    return Lexer;
}());
exports.Lexer = Lexer;
