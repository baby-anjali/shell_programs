const PROMPT = "anjalibaby@Anjalis-MacBook-Pro % "

const echo = function (args) {
  return args.join(' ');
}

const shell = function (command, args) {
  switch (command) {
    case 'echo': return echo(args);
  }
}
while (true) {
  const commandString = prompt(PROMPT);
  const [command, ...args] = commandString.split(' ');

  console.log(shell(command, args));
}