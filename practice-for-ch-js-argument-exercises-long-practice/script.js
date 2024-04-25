// function sum() {
//     let res = 0

//     for (let i = 0; i < arguments.length; i++) {
//         res += arguments[i]
//     }

//     return res 
// }

function sumRest(...args) {
    let res = 0

    for (let i = 0; i < args.length; i++) {
        res += args[i]
    }

    return res 
}

// console.log(sumRest(1, 2, 3, 4)) // === 10;
// console.log(sumRest(1, 2, 3, 4, 5)) // === 15;

Function.prototype.myBind = function(context) {
    const self = this
    // return (arguments) => {
    //     this.call(context, arguments)
    // }
    console.log(arguments)
    let arg = Array.from(arguments).slice(1)

    return function() {
        const allArgs = Array.from(arguments).concat(arg)

        return self.apply(context, allArgs)
    }
}

// Function.prototype.myBind = function(context, ...args) {
//     const self = this
//     // return (arguments) => {
//     //     this.call(context, arguments)
//     // }

//     return function(...args_2) {
//         const allArgs = args.concat(args_2)

//         return self.apply(context, allArgs)
//     }
// }

class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
}
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
}
  
const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

// markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true  



function curriedSum(num) {

  let sum = 0
  let count = 0

    return function _add(num2) {
      sum += num2
      count += 1
      if (count === num) { 
        return sum
      } else {
        return _add
      }
    }
}


// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56

Function.prototype.curry = function(numArgs) {
    const allArgs = [];
    const that = this;

    return function _collect(arg) {
        allArgs.push(arg)
        if (allArgs.length === numArgs) {
            return that(...allArgs)
        } else {
            return _collect
        }
    }
}

function test(arg1, arg2, arg3) {
    console.log(arg1, arg2, arg3)
}

const curryTest = test.curry(3)
// curryTest(1)
// curryTest(2)
// curryTest(3)


Function.prototype.inherits = function(superClass) {
  function Surrogate() {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

function MovingObject () {}

function Ship () {}
console.log(Ship.inherits(MovingObject));

function Asteroid () {}
console.log(Asteroid.inherits(MovingObject));