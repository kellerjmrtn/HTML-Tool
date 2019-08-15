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
        if (openTag.getFormatTagText().toUpperCase().includes("!DOCTYPE")) {
            var allAttr = openTag.getAttributes();
            for (var i = 0; i < allAttr.length; i++) {
                if (allAttr[i].getProperty().toUpperCase() == "HTML") {
                    return "html";
                }
            }
            return "unsupported DOCTYPE";
        }
        else if (openTag.getFormatTagText().toUpperCase().includes("?XML")) {
            return "xml";
        }
        else {
            return "unknown language";
        }
        // Guess language?
    };
    Lexer.prototype.findNextTag = function (parent, depth) {
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
                var tag = new TagNode_1.TagNode(this.formatData.slice(tagStart, i + 1));
                tag.setParent(parent);
                tag.setDepth(depth);
                if (tag.isOpenTag()) {
                    var nextTag = this.findNextTag(tag, depth + 1);
                    if (nextTag != null) {
                        console.log("tag: " + tag.getTagText());
                        console.log("nextTag: " + nextTag.getTagText());
                        console.log(nextTag.getType() == tag.getType() && nextTag.isOpenTag() == false);
                        if (nextTag.getType() == tag.getType() && nextTag.isOpenTag() == false) {
                            parent.addChild(nextTag);
                            nextTag.setParent(parent);
                            nextTag.setDepth(depth);
                        }
                        else {
                            tag.addChild(nextTag);
                        }
                    }
                }
                /*if(parent.getType() == tag.getType() && tag.isOpenTag() == false){
                    console.log(parent.getTagText());
                    tag.setParent(parent);
                    return null;
                } else {
                    tag.setParent(parent);
                    tag.addChild(this.findNextTag(tag));
                    let newChild: TagNode;
                    while(true){
                        newChild = this.findNextTag(tag);

                        if(newChild != null){
                            if(newChild.isOpenTag()){
                                tag.addChild(newChild);
                            } else {
                                tag.addChild(newChild);
                                return null;
                            }
                        } else {
                            break;
                        }
                    }
                }*/
                return tag;
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
        var tagDoc = new TagNode_1.TagNode("<document>");
        while (true) {
            var tag = this.findNextTag(tagDoc, 0);
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
