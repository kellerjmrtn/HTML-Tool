import { MiniDOM } from "./class/MiniDOM";

let fs = require("fs");
let out : string;

fs.readFile("input.html", "utf8", function(err: any, data: string) {
    out = main(err, data);
});

function main(err: any, data: string) : string{
    if(err) throw err;

    let miniDOM = new MiniDOM(data);
    console.log(miniDOM.getLanguage());

    return null;
}