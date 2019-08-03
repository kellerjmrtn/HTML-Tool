import { TagNode } from "./TagNode";

export class Lexer {
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