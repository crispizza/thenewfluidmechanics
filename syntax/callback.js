function a(){
    console.log('A');
}

a();

var b = function(){
    console.log('B');
}

b();

function slowfunc(callback){
    callback();
}

slowfunc(a);
slowfunc(b);