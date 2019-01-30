const {SHA256} =  require('crypto-js');
const jwt = require('jsonwebtoken');


var obj = {
    id : 10
}


var token1 = jwt.sign(obj,'abc123');
console.log(token1);

var encode = jwt.verify(token1,'abc123');
console.log(encode);



// var demo = 'hi this is demo';
// var demo1 = {
//     id : 4
// }

// var data = SHA256(JSON.stringify(demo1)).toString();


// var data = SHA256(demo1).toString();
// var hash = SHA256(demo).toString();
// var dataString = data.toString();

// var aa = JSON.stringify(demo1).toString();
// console.log(data);
// console.log(aa.toString());



// var p1 = SHA256()

// var token = {
//     data,
//     hash1: SHA256(JSON.stringify(data)).toString()
// }

// console.log(token.hash1);
