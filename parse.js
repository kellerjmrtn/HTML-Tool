var fs = require("fs");
var start = Date.now();

var out;
fs.readFile("input.html", "utf8", function(err, data){
    out = read(err, data);
    
    fs.writeFile("out.html", out, function(err){
        console.log("write success!");
        var delta = Date.now() - start;

        console.log("Elapsed time: " + delta + " ms");
    });
});

function read(err, data){
    if (err) throw err;

    var lexerData = htmlLexer(data);
    var tabData = insertTabs(lexerData);

    return tabData.join("\n");
}

function htmlLexer(data){
    data = data.replace(/(\r)|(\n)/g,"").replace(/<!--.*?-->/g,"");
    var dataCopy = data;
    
    var tags = [];

    var element;
    var elementOpen;
    var elementClose;
    var taglen;

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
        
        tags.push(element);

        taglen = tags.length;
        if(taglen > 1){
            text = getTextBetween(dataCopy, tags[taglen - 2], tags[taglen - 1]);

            if(text != ""){
                tags.splice(tags.length - 1, 0, text);
            }
            dataCopy = dataCopy.substring(dataCopy.indexOf(tags[taglen - 2]) + tags[taglen - 2].length);
        }

        data = data.substring(data.indexOf(element) + element.length);
    }

    return tags;
}

function getTextBetween(data, first, last){
    return data.split(first)[1].split(last)[0].trim();
}

function insertTabs(data){
    var i;
    var len = data.length;
    var index2;
    var elm;
    var j;
    var temp;

    for(i = 0; i < len; i++){
        elm = data[i];

        if(elm.match(/<[^/][^<>]*>/) != null){
            temp = elm.indexOf("<") + 1;

            if(elm.split(" ").length > 1){
                temp = elm.split(" ")[0].slice(0, temp) + "/" + elm.split(" ")[0].slice(temp) + ">";
            } else {
                temp = elm.slice(0, temp) + "/" + elm.slice(temp);
            }
            
            index2 = data.indexOf(temp, i);

            for(j = i + 1; j < index2; j++){
                data[j] = "\t" + data[j];
            }
        }
    }

    return data;
}