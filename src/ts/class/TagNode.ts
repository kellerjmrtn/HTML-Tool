import { Attribute } from "./Attribute";

export class TagNode {
    type: string;
    attributes: Attribute[];
    openTag: string;
    currentIndex: number;

    constructor(tagText: string){
        // Set openTag
        this.openTag = tagText;

        // find tag name
        this.type = this.findTagName();

        this.currentIndex = 0;

        // find attributes
        this.attributes = this.findAllAttributes();
    }

    private findTagName(): string {
        return this.getOpenTagText().split(" ")[0];
    }

    private findNextAttribute(): Attribute {
        let tagString = this.getOpenTagText().trim();
        let len = tagString.length;
        let attrStart = this.currentIndex;
        let valStart = attrStart;

        let inSingleQuotes = false;
        let inDoubleQuotes = false;
        let inAttr = false;
        let inValue = false;

        let prop: string = "";

        for(let i = this.currentIndex; i < len; i++){
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
                                    this.currentIndex = i;
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
                    this.currentIndex = i + 1;
                    return new Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                } else {
                    inDoubleQuotes = !inDoubleQuotes;
                }
            } else if(charAt == "'" && inDoubleQuotes == false){
                if(inValue && inSingleQuotes){
                    this.currentIndex = i + 1;
                    return new Attribute(prop.trim(), tagString.slice(valStart, i + 1));
                } else {
                    inSingleQuotes = !inSingleQuotes;
                }
            } 
            
            if(i == len - 1 && inAttr){
                this.currentIndex = i + 1;
                return new Attribute(tagString.slice(attrStart, i + 1), "");
            }
        }

        return null;
    }

    private findAllAttributes(): Attribute[] {
        let allAttr: Attribute[] = [];
        
        while(true){
            let attr = this.findNextAttribute();
            if(attr != null){
                allAttr.push(attr);
            } else {
                break;
            }
        }
        
        /*let inAttr = false;
        let inValue = false;
        let inSingleQuotes = false;
        let inDoubleQuotes = false;
        let attrStart = 0;
        let valStart = 0;
        let prop: string;

        for(let i = 0; i < len; i++){
            let charAt = tagString.charAt(i);

            if(charAt == " " && inSingleQuotes == false && inDoubleQuotes == false){
                if(inAttr){
                    let nextEqualsMatch = tagString.slice(i).match(/(\s*?)[^(\s)]/);
                    let nextEquals = "";
                    if(nextEquals != null){
                        nextEquals = nextEqualsMatch[0]
                    }

                    if(!nextEquals.includes("=")){
                        allAttr.push(new Attribute(tagString.slice(attrStart, i), ""));
                        inAttr = false;
                    }
                } else {
                    attrStart = i + 1;
                    inAttr = true;
                }
            } else if(charAt == "=" && inSingleQuotes == false && inDoubleQuotes == false && inAttr == true){
                prop = tagString.slice(attrStart, i);
                inAttr = false;
                inValue = true;
                valStart = i + 1;
            } else if(charAt == "'"){
                if(inSingleQuotes){
                    allAttr.push(new Attribute(prop, tagString.slice(valStart, i + 1)));
                    inValue = false;
                }

                if(inDoubleQuotes == false){
                    inSingleQuotes = !inSingleQuotes;
                }
            } else if(charAt == '"'){
                if(inDoubleQuotes){
                    allAttr.push(new Attribute(prop, tagString.slice(valStart, i + 1)));
                    inValue = false;
                }

                if(inSingleQuotes == false){
                    inDoubleQuotes = !inDoubleQuotes;
                }
            } else if(i == len - 1 && inAttr == true){
                allAttr.push(new Attribute(tagString.slice(attrStart, i + 1), ""));
            }
        }*/

        /*if(tagString != null){
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
        }*/

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