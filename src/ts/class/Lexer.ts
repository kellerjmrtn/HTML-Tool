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

            return "unsupported DOCTYPE";
        } else if(openTag.getFormatTagText().toUpperCase().includes("?XML")){
            return "xml";
        } else {
            return "unknown language";
        }

        // Guess language?
    }

    private findNextTag(parent: TagNode, depth: number): TagNode {
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
                let tag = new TagNode(this.formatData.slice(tagStart, i + 1));
                tag.setParent(parent);
                tag.setDepth(depth);

                if(tag.isOpenTag()){
                    let nextTag = this.findNextTag(tag, depth + 1);

                    if(nextTag != null){
                        console.log("tag: " + tag.getTagText());
                        console.log("nextTag: " + nextTag.getTagText())
                        console.log(nextTag.getType() == tag.getType() && nextTag.isOpenTag() == false);
                        if(nextTag.getType() == tag.getType() && nextTag.isOpenTag() == false){
                            parent.addChild(nextTag);
                            nextTag.setParent(parent);
                            nextTag.setDepth(depth);
                        } else {
                            tag.addChild(nextTag);
                        }
                    }
                }

                /*if(parent.getType() == tag.getType() && tag.isOpenTag() == false){
                    console.log(parent.getTagText());
                    tag.setParent(parent);
                    return null;
                } else {
                    tag.setParent(parent);
                    tag.addChild(this.findNextTag(tag));
                    let newChild: TagNode;
                    while(true){
                        newChild = this.findNextTag(tag);

                        if(newChild != null){
                            if(newChild.isOpenTag()){
                                tag.addChild(newChild);
                            } else {
                                tag.addChild(newChild);
                                return null;
                            }
                        } else {
                            break;
                        }
                    }
                }*/
                
                return tag;
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
        let tagDoc = new TagNode("<document>");

        while(true){
            let tag = this.findNextTag(tagDoc, 0);

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