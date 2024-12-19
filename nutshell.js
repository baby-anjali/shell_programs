const PROMPT = "anjalibaby@Anjalis-MacBook-Pro "
let runProcess = true;

let currentDirectory = [''];

const echo = function (args) {
  return args.join(' ');
}

const cd = function (args) {
  if (args[0] === '..' && currentDirectory.length > 1) {
    currentDirectory.pop();
    return;
  }

  if (currentDirectory.length === 1) {
    return 'No other parent directory';
  }

  currentDirectory.push(args[0]);
}

const shell = function (command, args) {
  switch (command) {
    case 'echo': return echo(args);
    case 'cd': return cd(args);
    case 'exit': runProcess = false;
      return '\nSaving session...\n...copying shared history...\n...saving history...truncating history files...\n...completed.\n\n[Process completed]';
    default: return 'nutshell: command not found';
  }
}


while (runProcess) {
  const directory = currentDirectory.at(-1);
  const commandString = prompt(PROMPT + directory + '~');
  const [command, ...args] = commandString.split(' ');

  const commandResult = shell(command, args);
  if (commandResult !== undefined) {
    console.log(shell(command, args));
  }
}