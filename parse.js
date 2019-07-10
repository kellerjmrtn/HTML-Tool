var fs = require("fs");

fs.readFile("input.html", "utf8", read);

var selfClose = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
]

var stack = [];
var out = [];

function read(err, data){
    if (err) throw err;

    data = data.replace(/(\r)|(\n)/g,"").replace(/<!--.*?-->/g,"");

    var element;
    var elementOpen;
    var elementClose; 

    while(true){
        elementOpen = data.match(/<[^/][^<>]*>/);
        elementClose = data.match(/<\/[^<>]*>/);
        
        if(elementOpen == null && elementClose == null){
            break;
        } else if(elementOpen == null){
            element = elementClose[0];
        } else if(elementClose == null){
            element = elementOpen[0];
        } else {
            element = elementOpen[0];
            if(data.indexOf(elementClose) < data.indexOf(elementOpen) && data.indexOf(elementClose) != -1){
                element = elementClose[0];
            }
        }
        
        stack.push(element);

        data = data.substring(data.indexOf(element) + element.length);
    }
    
    /* Close self closing tags */
    var len = stack.length;
    var len2 = selfClose.length;
    var i;
    var j;
    var elm;
    var re;
    var find;

    for(i = 0; i < len; i++){
        elm = stack[i];
        find = null;

        for(j = 0; j < len2; j++){
            re = new RegExp("<" + selfClose[j]);
            find = elm.toLowerCase().match(re);

            if(find != null){
                find = find[0];
                break;
            }
        }

        if(find != null){
            stack.splice(i + 1, 0, "</" + selfClose[j] + ">");
        }
    }

    len = stack.length;
    var parseStack = [];
    var insert = "";
    var finalString = "";

    i = 0;
    j = 0;
    var k;

    for(i = 0; i < len; i++){
        parseStack.push(stack[i]);
        j = parseStack.length - 1;
        elm = parseStack[j];

        if(stack[i].replace(/<\/[^<>]*>/,"") == ""){
            j = j - 1;
        }

        if(!selfClose.includes(elm.replace(/[\/<>]/g,"")) || selfClose.includes(elm.replace(/[<>]/g,""))){
            insert = "";
            for(k = 0; k < j; k++){
                insert += "\t";
            }
            finalString += insert + elm + "\n";
        }

        if(stack[i].replace(/<\/[^<>]*>/,"") == ""){
            parseStack.pop();
            parseStack.pop();
        } 
    }

    console.log(out);
    console.log(finalString);
}