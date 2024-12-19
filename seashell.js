const PROMPT = "anjalibaby@Anjalis-MacBook-Pro ";
const exitMessage = '\nSaving session...' +
  '\n...copying shared history...' +
  '\n...saving history...truncating history files...' +
  '\n...completed.\n\n[Process completed]';

let runProcess = true;

let currentDirectory = ['~'];

const echo = function (args) {
  return args.join(' ');
};

const cd = function (args) {
  if (args[0] === '..') {
    if (currentDirectory.length === 1) {
      return 'No other parent directory';
    }

    currentDirectory.pop();
    return;
  }

  currentDirectory.push(args[0]);
};

const rm = function (args) {
  if (!args[0].includes('.')) {
    return 'rm: ' + args + ': is a directory';
  }

  return;
};

const shell = function (command, args) {
  if (command === '') {
    return;
  }

  switch (command) {
    case 'echo': return args.join(' ');
    case 'cd': return cd(args);
    case 'exit': runProcess = false;
      return exitMessage;
    case 'touch':
    case 'mkdir': return;
    case 'rm': return rm(args);
    case 'clear': console.clear();
      return;
    default: return 'ssh: command not found';
  }
};


while (runProcess) {
  const directory = currentDirectory.at(-1);
  const commandString = prompt(PROMPT + directory + ' %');
  const [command, ...args] = commandString.split(' ');

  const commandResult = shell(command, args);

  if (commandResult) {
    console.log(shell(command, args));
  }
}