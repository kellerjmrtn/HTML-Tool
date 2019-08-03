import { MiniDOM } from "./class/MiniDOM";

let fs = require("fs");
let out : string;
let start = Date.now();

fs.readFile("input.html", "utf8", function(err: any, data: string) {
    out = main(err, data);

    let delta = Date.now() - start;
    console.log("Elapsed time: " + delta + " ms");
});

function main(err: any, data: string) : string{
    if(err) throw err;

    let miniDOM = new MiniDOM(data);
    console.log(miniDOM.getLanguage());

    return null;
}