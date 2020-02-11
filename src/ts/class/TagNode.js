"use strict";
exports.__esModule = true;
var Attribute_1 = require("./Attribute");
var TagNode = /** @class */ (function () {
    function TagNode(tagText) {
        this.tagText = tagText;
        this.children = [];
<<<<<<< HEAD
=======
        this.parent = null;
        this.depth = 0;
>>>>>>> 41c24b7eab3facb8fde860a12aed030c21024792
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
        return this.getFormatTagText().split(" ")[0].replace("/", "");
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
                                    return new Attribute_1.Attribute(tagString.slice(attrStart, i), '"' + tagString.slice(attrStart, i) + '"');
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
                return new Attribute_1.Attribute(tagString.slice(attrStart, i + 1), '"' + tagString.slice(attrStart, i + 1) + '"');
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
<<<<<<< HEAD
    TagNode.prototype.setChildren = function (children) {
        this.children = children;
    };
    TagNode.prototype.addChild = function (child) {
        this.children.push(child);
=======
    TagNode.prototype.addChild = function (child) {
        if (child != null) {
            this.children.push(child);
        }
    };
    TagNode.prototype.getParent = function () {
        return this.parent;
    };
    TagNode.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    TagNode.prototype.getType = function () {
        return this.type;
    };
    TagNode.prototype.setType = function (type) {
        this.type = type;
>>>>>>> 41c24b7eab3facb8fde860a12aed030c21024792
    };
    TagNode.prototype.isOpenTag = function () {
        return this.openTag;
    };
<<<<<<< HEAD
=======
    TagNode.prototype.setOpenTag = function (openTag) {
        this.openTag = openTag;
    };
    TagNode.prototype.getDepth = function () {
        return this.depth;
    };
    TagNode.prototype.setDepth = function (depth) {
        this.depth = depth;
    };
    TagNode.prototype.toString = function (tabs) {
        var outString = "";
        var tabString = "";
        for (var i = 0; i < tabs; i++) {
            tabString += "\t";
        }
        outString += this.tagText + "\n";
        //META-DATA
        outString += tabString + "<!--- META-DATA:";
        if (this.parent != null) {
            outString += "\n" + tabString + "parent: " + this.parent.getType();
        }
        if (this.openTag == true) {
            for (var i = 0; i < this.attributes.length; i++) {
                outString += "\n" + tabString + this.attributes[i].toString();
            }
        }
        outString += "  --->\n\n";
        for (var i = 0; i < this.children.length; i++) {
            outString += tabString + this.children[i].toString(tabs + 1) + "\n";
        }
        return outString;
    };
>>>>>>> 41c24b7eab3facb8fde860a12aed030c21024792
    return TagNode;
}());
exports.TagNode = TagNode;
