function insert(str, index, value){
    return str.substring(0, index) + value + str.substring(index);
}

var st = "</div>";

console.log(st.replace(/[\/<>]/g,""));