import { TagNode } from "./TagNode";

export class Lexer {
    private rawData: string;
    private language: string;

    constructor(rawData: string){
        this.rawData = rawData;
        this.language = this.findLanguage();
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

        if(openTag.getOpenTagText().toUpperCase().includes("!DOCTYPE")){
            let allAttr = openTag.getAttributes();

            for(let i = 0; i < allAttr.length; i++){
                if(allAttr[i].getProperty().toUpperCase() == "HTML"){
                    return "html";
                }
            }

            return "unsupported";
        } else if(openTag.getOpenTagText().toUpperCase().includes("?XML")){
            return "xml";
        } else {
            return null;
        }

        // Guess language?
    }
}