"use strict";
exports.__esModule = true;
var Attribute_1 = require("./Attribute");
var TagNode = /** @class */ (function () {
    function TagNode(tagText) {
        this.tagText = tagText;
        this.children = [];
        if (tagText[1] == "/") {
            this.openTag = false;
            this.selfClose = false;
        }
        else {
            this.openTag = true;
        }
        // find tag name
        this.type = this.findTagName();
        TagNode.currentIndex = 0;
        // find attributes
        this.attributes = this.findAllAttributes();
    }
    TagNode.prototype.findTagName = function () {
        return this.getFormatTagText().split(" ")[0];
    };
    TagNode.prototype.findNextAttribute = function () {
        var tagString = this.getFormatTagText().trim();
        var len = tagString.length;
        var attrStart = TagNode.currentIndex;
        var valStart = attrStart;
        var inSingleQuotes = false;
        var inDoubleQuotes = false;
        var inAttr = false;
        var inValue = false;
        var prop = "";
        for (var i = TagNode.currentIndex; i < len; i++) {
            var charAt = tagString.charAt(i);
            if (charAt == " ") {
                if (inSingleQuotes == false && inDoubleQuotes == false) {
                    if (inValue) {
                        valStart = i + 1;
                    }
                    else {
                        if (inAttr) {
                            var nextEqualsMatch = tagString.slice(i).match(/(\s*?)[^(\s)]/);
                            var nextEquals = "";
                            if (nextEquals != null) {
                                nextEquals = nextEqualsMatch[0];
                                if (!nextEquals.includes("=")) {
                                    TagNode.currentIndex = i;
                                    return new Attribute_1.Attribute(tagString.slice(attrStart, i), "");
                                }
                            }
                        }
                        else {
                            attrStart = i + 1;
                            inAttr = true;
                        }
                    }
                }
            }
            else if (charAt == "=" && inDoubleQuotes == false && inSingleQuotes == false && inAttr == true) {
                prop = tagString.slice(attrStart, i);
                inAttr = false;
                inValue = true;
                valStart = i + 1;
            }
            else if (charAt == '"' && inSingleQuotes == false) {
                if (inValue && inDoubleQuotes) {
                    TagNode.currentIndex = i + 1;
                    return new Attribute_1.Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                }
                else {
                    inDoubleQuotes = !inDoubleQuotes;
                }
            }
            else if (charAt == "'" && inDoubleQuotes == false) {
                if (inValue && inSingleQuotes) {
                    TagNode.currentIndex = i + 1;
                    return new Attribute_1.Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                }
                else {
                    inSingleQuotes = !inSingleQuotes;
                }
            }
            if (i == len - 1 && inAttr) {
                TagNode.currentIndex = i + 1;
                return new Attribute_1.Attribute(tagString.slice(attrStart, i + 1), "");
            }
        }
        return null;
    };
    TagNode.prototype.findAllAttributes = function () {
        var allAttr = [];
        TagNode.currentIndex = 0;
        while (true) {
            var attr = this.findNextAttribute();
            if (attr != null) {
                allAttr.push(attr);
            }
            else {
                break;
            }
        }
        return allAttr;
    };
    TagNode.prototype.getTagText = function () {
        return this.tagText;
    };
    TagNode.prototype.getFormatTagText = function () {
        return this.tagText.replace(/^</g, "").replace(/>$/g, "");
    };
    TagNode.prototype.getAttributes = function () {
        return this.attributes;
    };
    TagNode.prototype.getChildren = function () {
        return this.children;
    };
    TagNode.prototype.setChildren = function (children) {
        this.children = children;
    };
    TagNode.prototype.addChild = function (child) {
        this.children.push(child);
    };
    TagNode.prototype.isOpenTag = function () {
        return this.openTag;
    };
    return TagNode;
}());
exports.TagNode = TagNode;
