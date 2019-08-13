import { Attribute } from "./Attribute";

export class TagNode {
    type: string;
    attributes: Attribute[];
    tagText: string;
    openTag: boolean;
    selfClose: boolean;

    static currentIndex: number;

    constructor(tagText: string){
        this.tagText = tagText;

        if(tagText[1] == "/"){
            this.openTag = false;
            this.selfClose = false;
        } else {
            this.openTag = true;
        }

        // find tag name
        this.type = this.findTagName();

        TagNode.currentIndex = 0;

        // find attributes
        this.attributes = this.findAllAttributes();
    }

    private findTagName(): string {
        return this.getFormatTagText().split(" ")[0];
    }

    private findNextAttribute(): Attribute {
        let tagString = this.getFormatTagText().trim();
        let len = tagString.length;
        let attrStart = TagNode.currentIndex;
        let valStart = attrStart;

        let inSingleQuotes = false;
        let inDoubleQuotes = false;
        let inAttr = false;
        let inValue = false;

        let prop: string = "";

        for(let i = TagNode.currentIndex; i < len; i++){
            let charAt = tagString.charAt(i);

            if(charAt == " "){
                if(inSingleQuotes == false && inDoubleQuotes == false){
                    if(inValue){
                        valStart = i + 1
                    } else {
                        if(inAttr){
                            let nextEqualsMatch = tagString.slice(i).match(/(\s*?)[^(\s)]/);
                            let nextEquals = "";
                            if(nextEquals != null){
                                nextEquals = nextEqualsMatch[0];

                                if(!nextEquals.includes("=")){
                                    TagNode.currentIndex = i;
                                    return new Attribute(tagString.slice(attrStart, i), "");
                                }
                            } 
                        } else {
                            attrStart = i + 1;
                            inAttr = true;
                        }
                    }
                }
            } else if(charAt == "=" && inDoubleQuotes == false && inSingleQuotes == false && inAttr == true){
                prop = tagString.slice(attrStart, i);
                inAttr = false;
                inValue = true;
                valStart = i + 1;
            } else if(charAt == '"' && inSingleQuotes == false){
                if(inValue && inDoubleQuotes){
                    TagNode.currentIndex = i + 1;
                    return new Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                } else {
                    inDoubleQuotes = !inDoubleQuotes;
                }
            } else if(charAt == "'" && inDoubleQuotes == false){
                if(inValue && inSingleQuotes){
                    TagNode.currentIndex = i + 1;
                    return new Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                } else {
                    inSingleQuotes = !inSingleQuotes;
                }
            } 
            
            if(i == len - 1 && inAttr){
                TagNode.currentIndex = i + 1;
                return new Attribute(tagString.slice(attrStart, i + 1), "");
            }
        }

        return null;
    }

    private findAllAttributes(): Attribute[] {
        let allAttr: Attribute[] = [];
        TagNode.currentIndex = 0;

        while(true){
            let attr = this.findNextAttribute();

            if(attr != null){
                allAttr.push(attr);
            } else {
                break;
            }
        }

        return allAttr;
    }

    public getTagText(): string {
        return this.tagText;
    }

    public getFormatTagText(): string {
        return this.tagText.replace(/^</g, "").replace(/>$/g, "");
    }

    public getAttributes(): Attribute[] {
        return this.attributes;
    }
}