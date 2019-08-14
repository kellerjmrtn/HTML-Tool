import { TagNode } from "./TagNode";
import { Lexer } from "./Lexer";

export class MiniDOM {
    private nodes: TagNode[];
    private language: string;
    private lex: Lexer;

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

    public getNodes(): TagNode[] {
        return this.nodes;
    }

    public buildDOM(): void {
        this.nodes = this.lex.findAllTags();
    }

    public toString(): string {
        let outString: string = "";

        // meta-data
        outString += "<!---  META-DATA:";
        outString += "\nLanugage: " + this.language;

        outString += "  --->\n\n<!----------- DOCUMENT START ----------->\n\n";

        for(let i = 0; i < this.nodes.length; i++){
            outString += this.nodes[i].toString(0);
        }

        return outString;
    }
}