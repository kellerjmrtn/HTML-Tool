import { TagNode } from "./TagNode";
import { Lexer } from "./Lexer";

export class MiniDOM {
    nodes: TagNode[];
    language: string;
    lex: Lexer;

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
}