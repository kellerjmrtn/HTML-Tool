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
}