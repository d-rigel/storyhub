function sayMyName(name: string): void {
  if (name === 'Nnadozie') {
    return console.log("You're right");
  } else {
    return console.log("You're wrong again");
  }
}

// sayMyName('Jackson');
const output = sayMyName('Nnadozie');
console.log(output);
