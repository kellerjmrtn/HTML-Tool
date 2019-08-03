"use strict";
exports.__esModule = true;
var TagNode = /** @class */ (function () {
    function TagNode(tagText, language) {
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
        // find tag language
        if (language != undefined) {
            this.language = language;
        }
    }
    TagNode.prototype.getOpenTag = function () {
        return this.openTag;
    };
    return TagNode;
}());
exports.TagNode = TagNode;
