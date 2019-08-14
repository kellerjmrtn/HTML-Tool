import { MiniDOM } from "./class/MiniDOM";

let fs = require("fs");
let out : string;
let start = Date.now();

fs.readFile("input.html", "utf8", function(err: any, data: string) {
    out = main(err, data);

    fs.writeFile("out.html", out, function(err){
        console.log("write success!");

        let delta = Date.now() - start;
        console.log("Elapsed time: " + delta + " ms");
    });
});

function main(err: any, data: string) : string{
    if(err) throw err;

    let miniDOM = new MiniDOM(data);
    miniDOM.buildDOM();

    return miniDOM.toString();
}