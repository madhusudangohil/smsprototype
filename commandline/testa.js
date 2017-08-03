let x = require('./a.js');

let obja = new x(20);

let objb = new x();

x.prototype.substract = function(s){
    this.number -= s;
}

obja.multiply(2);
objb.multiply(3);
objb.substract(50);

obja.show();

objb.show();