setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
Promise.resolve().then(() => console.log(4));
process.nextTick(() => console.log(3));
new Promise(function (resolve, reject) {
    console.log(6)
});
(() => console.log(5))();

if (!Function.prototype.bind) {
    Function.prototype.bind = function (obj) {
        if(typeof this){
            throw new Error("")
        }
        var _this = this
        var oThis = obj
        var objArr = Array.prototype.slice(arguments, 1)
        var F = function () {};

        function fB() {
            var iArr = Array.prototype.slice(arguments);
            return _this.apply(this instanceof fB ? this : oThis, iArr.concat(objArr))
        }

        if (this.prototype) {
            F.prototype = this.prototype
        }

        fB.prototype = new F()

        return fB
    }
}