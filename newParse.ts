var fs = require("fs");
var out : string;

class Attribute {
    property: string;
    value: string;
}

class TagNode {
    type: string;
    attributes: Attribute[];
    openTag: string;
}

class MiniDOM {
    nodes: TagNode[];
    language: string;
    
    private static Lexer = class {
        rawData: string;

        getNode(): TagNode {


            return null;
        }
    }

    constructor(rawData: string, language?: string){
        if(language != undefined){
            this.language = language;
        } else {
            this.language = this.findOpeningDescriptor();
            // parse first node for language
            // if none found, try to guess language
        }
    }

    findOpeningDescriptor() : string {
        return null;
    }
}

fs.readFile("input.html", "utf8", function(err: any, data: string) {
    out = main(err, data);
});

function main(err: any, data: string) : string{
    if(err) throw err;

    var miniDOM = new MiniDOM(data);

    return null;
}