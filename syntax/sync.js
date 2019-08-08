const fs = require('fs');

//readFileSync
console.log('1-A');
console.log(fs.readFileSync('syntax/sample.txt','utf8'));
console.log('1-C');

//readFile //Async
console.log('2-A');
fs.readFile('syntax/sample.txt','utf8',function(err,data){
    console.log(data);
});
console.log('2-C'); 
