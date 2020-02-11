console.log('<di>v sty>le="background-col<or:red;">'.replace(/^</g, "").replace(/>$/g, ""));

console.log('  d   ="t<es>t" hah="nope" tr ick="balsl" false="nah" off>'.match(/(\s*?)[^(\s)]x/));

console.log("this\b\b  is");

var struct = {
    estimate: "no",
    test: {
        innerList: "no1,2,three"
    }
}

var s = struct.test.innerList;

s = s.split(",");

console.log(s);
console.log(struct);

console.log("fld_os_squareFootage_1".match(/(?:_)([0-9]+)$/));