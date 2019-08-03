"use strict";
exports.__esModule = true;
var Attribute_1 = require("./Attribute");
var TagNode = /** @class */ (function () {
    function TagNode(tagText) {
        // Set openTag
        this.openTag = tagText;
        // find tag name
        this.type = this.findTagName();
        // find attributes
        this.attributes = this.findAttributes();
    }
    TagNode.prototype.findTagName = function () {
        return this.getOpenTagText().split(" ")[0];
    };
    TagNode.prototype.findAttributes = function () {
        var tagString = this.getOpenTagText().trim();
        var allAttr = [];
        if (tagString != null) {
            var attrArray = tagString.split(" ");
            for (var i = 0; i < attrArray.length; i++) {
                if (attrArray[i] != this.type) {
                    var attr = attrArray[i].split("=");
                    if (attr.length > 1) {
                        allAttr.push(new Attribute_1.Attribute(attr[0], attr[1]));
                    }
                    else {
                        allAttr.push(new Attribute_1.Attribute(attr[0], ""));
                    }
                }
            }
        }
        return allAttr;
    };
    TagNode.prototype.getOpenTag = function () {
        return this.openTag;
    };
    TagNode.prototype.getOpenTagText = function () {
        return this.openTag.replace(/^</g, "").replace(/>$/g, "");
    };
    TagNode.prototype.getAttributes = function () {
        return this.attributes;
    };
    return TagNode;
}());
exports.TagNode = TagNode;
