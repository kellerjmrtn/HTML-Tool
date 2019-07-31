var fs = require("fs");

fs.readFile("input.html", "utf8", function(err, data) {
    console.log(data);
})

class Attribute {
    property: String;
    value: String;
}

class TagNode {
    type: String;
    attributes: Attribute[];
    openTag: String;
}

var tag = new TagNode();
tag.type = "div";

console.log(tag);