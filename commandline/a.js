'use strict'

let aa  = function a(num =10){
    this.number = num;

    this.show = function(){
        console.log(this.number);
    }
}

aa.prototype.multiply = function(multiplier){
    this.number = this.number * multiplier;
}



module.exports = aa;