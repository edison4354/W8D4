function sum() {
    let res = 0

    for (let i = 0; i < arguments.length; i++) {
        res += arguments[i]
    }

    return res 
}

function sumRest(...args) {
    let res = 0

    for (let i = 0; i < args.length; i++) {
        res += args[i]
    }

    return res 
}

// console.log(sumRest(1, 2, 3, 4)) // === 10;
// console.log(sumRest(1, 2, 3, 4, 5)) // === 15;

// Function.prototype.myBind = function(context) {
//     const self = this
//     // return (arguments) => {
//     //     this.call(context, arguments)
//     // }
//     let arg = arguments.slice(1)

//     return function() {
//         const allArgs = arguments.concat(arg)

//         return self.apply(context, allArgs)
//     }
// }

Function.prototype.myBind = function(context, ...args) {
    const self = this
    // return (arguments) => {
    //     this.call(context, arguments)
    // }

    return function(...args_2) {
        const allArgs = args.concat(args_2)

        return self.apply(context, allArgs)
    }
}

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

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true  