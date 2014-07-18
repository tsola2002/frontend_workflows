/**
 * Created by solidstunna101 on 17/07/14.
 */
var MyModule = (function(){
    function sayHi (name){
        return "Hi, " + name + "!";
    }

    return {
        sayHi: sayHi
    };
}());