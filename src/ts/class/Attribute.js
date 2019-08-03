"use strict";
exports.__esModule = true;
var Attribute = /** @class */ (function () {
    function Attribute(property, value) {
        this.property = property;
        this.value = value;
    }
    Attribute.prototype.getProperty = function () {
        return this.property;
    };
    Attribute.prototype.getValue = function () {
        return this.value;
    };
    return Attribute;
}());
exports.Attribute = Attribute;
