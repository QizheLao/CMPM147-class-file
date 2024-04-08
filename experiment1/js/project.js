// project.js - purpose and description here
// Author: Qizhe Lao
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

// define a class
class MyProjectClass {
  // constructor function
  constructor(param1, param2) {
    // set properties using 'this' keyword
    this.property1 = param1;
    this.property2 = param2;
  }
  
  // define a method
  myMethod() {
    // code to run when method is called
  }
}

function main() {
  const fillers = {
    adventurer: ["slug"],
    location: ["Rachel Carson", "Oaks", "Porter", "Cowell", "Stevenson", "Crown", "Merrill", "C9", "C10"],
    people: ["stdent", "professor", "adviser"],
    item: ["dentures", "Chat GPT", "computer", "crowbar", "orbital strike", "learn python the hard way"],
    num: ["two", "three", "eleven", "so many", "too many", "an unsatisfying number of", "barely any", "an unspecified amount of", "surely a satisfactory number of"],
    loots: ["college credits", "in campus housing", "parking permit", "class permission code", "10$ amazon gift card"],
    trouble: ["hit by a bus", "hit by a ceiling fan", "failing a class", "failing a CS class", "back from another dimension", "killed by Terminids", "need a pet to heal the soul"],
    message: ["work", "job"],
    
  };
  
  const template = `$adventurer, I have a $message for you!
  
  I have just come from $location college where the $people are $trouble. taking this $item, and help them.
  
  The hero who save them will be awarded with $num $loots. $adventurer, save them!
  `;
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  const slotPattern = /\$(\w+)/;
  
  function replacer(match, name) {
    let options = fillers[name];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    } else {
      return `<UNKNOWN:${name}>`;
    }
  }
  
  function generate() {
    let story = template;
    while (story.match(slotPattern)) {
      story = story.replace(slotPattern, replacer);
    }
  
    /* global box */
    $("#box").text(story);
    // box.innerText = story;
  }
  
  /* global clicker */
  $("#clicker").click(generate);
  // clicker.onclick = generate;
  
  generate();

    // // create an instance of the class
  // let myInstance = new MyProjectClass("value1", "value2");

  // // call a method on the instance
  // myInstance.myMethod();
}

// let's get this party started - uncomment me
main();