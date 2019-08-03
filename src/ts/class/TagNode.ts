import { Attribute } from "./Attribute";

export class TagNode {
    type: string;
    attributes: Attribute[];
    openTag: string;

    constructor(tagText: string){
        // Set openTag
        this.openTag = tagText;

        // find tag name
        this.type = this.findTagName();

        // find attributes
        this.attributes = this.findAttributes();
    }

    private findTagName(): string {
        return this.getOpenTagText().split(" ")[0];
    }

    private findAttributes(): Attribute[] {
        let tagString = this.getOpenTagText().trim();
        let allAttr: Attribute[] = [];

        if(tagString != null){
            let attrArray = tagString.split(" ");

            for(let i = 0; i < attrArray.length; i++){
                if(attrArray[i] != this.type){
                    let attr = attrArray[i].split("=");

                    if(attr.length > 1){
                        allAttr.push(new Attribute(attr[0], attr[1]));
                    } else {
                        allAttr.push(new Attribute(attr[0], ""));
                    }
                }
            }
        }

        return allAttr;
    }

    public getOpenTag(): string {
        return this.openTag;
    }

    public getOpenTagText(): string {
        return this.openTag.replace(/^</g, "").replace(/>$/g, "");
    }

    public getAttributes(): Attribute[] {
        return this.attributes;
    }
}