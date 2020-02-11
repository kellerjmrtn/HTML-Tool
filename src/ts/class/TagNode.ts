import { Attribute } from "./Attribute";

export class TagNode {
    type: string;
    attributes: Attribute[];
    tagText: string;
    openTag: boolean;
    selfClose: boolean;
    children: TagNode[];
    parent: TagNode;
    depth: number;

    static currentIndex: number;

    constructor(tagText: string){
        this.tagText = tagText;
        this.children = [];
        this.parent = null;
        this.depth = 0;

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
        return this.getFormatTagText().split(" ")[0].replace("/", "");
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
                                    return new Attribute(tagString.slice(attrStart, i), '"' + tagString.slice(attrStart, i) + '"');
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
                return new Attribute(tagString.slice(attrStart, i + 1), '"' + tagString.slice(attrStart, i + 1) + '"');
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

    public getChildren(): TagNode[] {
        return this.children;
    }

    public addChild(child: TagNode): void {
        if(child != null){
            this.children.push(child);
        }
    }

    public getParent(): TagNode {
        return this.parent;
    }

    public setParent(parent: TagNode): void {
        this.parent = parent;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public isOpenTag(): boolean {
        return this.openTag;
    }

    public setOpenTag(openTag: boolean): void {
        this.openTag = openTag;
    }

    public getDepth(): number {
        return this.depth;
    }

    public setDepth(depth: number): void {
        this.depth = depth;
    }

    public toString(tabs: number): string {
        let outString: string = "";
        let tabString: string = "";

        for(let i = 0; i < tabs; i++){
            tabString += "\t";
        }

        outString += this.tagText + "\n";

        //META-DATA
        outString += tabString + "<!--- META-DATA:";
        if(this.parent != null){
            outString += "\n" + tabString + "parent: " + this.parent.getType();
        }
        
        if(this.openTag == true){
            for(let i = 0; i < this.attributes.length; i++){
                outString += "\n" + tabString + this.attributes[i].toString();
            }
        }

        outString += "  --->\n\n";

        for(let i = 0; i < this.children.length; i++){
            outString += tabString + this.children[i].toString(tabs + 1) + "\n";
        }

        return outString;
    }
}