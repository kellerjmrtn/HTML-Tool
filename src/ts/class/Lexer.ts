import { TagNode } from "./TagNode";

export class Lexer {
    private rawData: string;
    private language: string;
    private formatData: string;
    private currentIndex: number;

    constructor(rawData: string){
        this.rawData = rawData;
        this.language = this.findLanguage();
        this.formatData = rawData.replace(/(\r)/g, "").replace(/(\n)/g, " ").replace(/<!--.*?-->/g, "");
        this.currentIndex = 0;
    }

    getDescriptorTag(): TagNode {
        let descriptorText = this.rawData.match(/<.+?>/)[0];

        let descriptorNode = new TagNode(descriptorText);
        return descriptorNode;
    }

    getLanguage(): string {
        return this.language;
    }

    private findLanguage(): string {
        let openTag = this.getDescriptorTag();

        if(openTag.getFormatTagText().toUpperCase().includes("!DOCTYPE")){
            let allAttr = openTag.getAttributes();

            for(let i = 0; i < allAttr.length; i++){
                if(allAttr[i].getProperty().toUpperCase() == "HTML"){
                    return "html";
                }
            }

            return "unsupported";
        } else if(openTag.getFormatTagText().toUpperCase().includes("?XML")){
            return "xml";
        } else {
            return null;
        }

        // Guess language?
    }

    private findNextTag(): TagNode {
        let len: number = this.formatData.length;
        let tagStart: number = this.currentIndex;
        let inDoubleQuotes = false;
        let inSingleQuotes = false;
        let inTag = false;
        let currentTag: TagNode;

        for(let i = this.currentIndex; i < len; i++){
            let charAt = this.formatData.charAt(i);

            if(charAt == "<" && inDoubleQuotes == false && inSingleQuotes == false && inTag == false){
                inTag = true;
                tagStart = i;
            } else if(charAt == ">" && inDoubleQuotes == false && inSingleQuotes == false && inTag == true){
                this.currentIndex = i + 1;
                currentTag =  new TagNode(this.formatData.slice(tagStart, i + 1));

                if(currentTag.isOpenTag()){
                    currentTag.addChild(this.findNextTag());
                    return currentTag;
                } else {
                    return null;
                }
            } else if(charAt == '"' && inSingleQuotes == false && inTag == true){
                inDoubleQuotes = !inDoubleQuotes;
            } else if(charAt == "'" && inDoubleQuotes == false && inTag == true){
                inSingleQuotes = !inSingleQuotes;
            }
        }

        return null;
    }

    public findAllTags(): TagNode[] {
        let allTags: TagNode[] = [];

        while(true){
            let tag = this.findNextTag();

            console.log(tag);
            console.log("huh");

            if(tag != null){
                allTags.push(tag);
            } else {
                break;
            }
        }

        return allTags;
    }
}