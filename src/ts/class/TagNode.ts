import { Attribute } from "./Attribute";

export class TagNode {
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