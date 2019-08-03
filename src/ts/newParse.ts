let fs = require("fs");
let out : string;

class Attribute {
    property: string;
    value: string;
}

class TagNode {
    type: string;
    attributes: Attribute[];
    openTag: string;
    language: string;

    constructor(tagText: string, language?: string){
        // Set openTag
        this.openTag = tagText;

        // find attributes
        while(true){
            break;
        }

        // find tag name
        let insideTag = tagText.slice(2, tagText.length - 1);
        if(insideTag.split(" ").length > 1){
            this.type = insideTag.split(" ")[0];
        } else {
            this.type = insideTag;
        }

        // find tag language
        if(language != undefined){
            this.language = language;
        }
    }

    public getOpenTag(): string {
        return this.openTag;
    }
}

class Lexer {
    private rawData: string;
    private language: string;

    constructor(rawData: string){
        this.rawData = rawData;
        this.language = this.findLanguage();
    }

    getDescriptorTag(): TagNode {
        let descriptorText = this.rawData.match(/<!.+?>/)[0];

        let descriptorNode = new TagNode(descriptorText);
        return descriptorNode;
    }

    getLanguage(): string {
        return this.language;
    }

    private findLanguage(): string {
        let openTag = this.getDescriptorTag().getOpenTag();
        let lang = openTag.slice(2, openTag.length - 1);

        if(lang.split(" ").length > 1){
            return lang.split(" ")[1];
        } else {
            return null;
        }
    }
}

class MiniDOM {
    nodes: TagNode[];
    language: string;
    lex: Lexer;

    constructor(rawData: string, language?: string){
        this.lex = new Lexer(rawData);

        if(language != undefined){
            this.language = language;
        } else {
            this.language = this.lex.getLanguage();
            // parse first node for language
            // if none found, try to guess language
        }
    }

    public getLanguage(): string {
        return this.language;
    }
}

fs.readFile("input.html", "utf8", function(err: any, data: string) {
    out = main(err, data);
});

function main(err: any, data: string) : string{
    if(err) throw err;

    let miniDOM = new MiniDOM(data);
    console.log(miniDOM.getLanguage());

    return null;
}