const PROMPT = "anjalibaby@Anjalis-MacBook-Pro ";
const exitMessage = '\nSaving session...' +
  '\n...copying shared history...' +
  '\n...saving history...truncating history files...' +
  '\n...completed.\n\n[Process completed]';

const files = [];

let runProcess = true;
const allDirectories = ['~'];
let path = ['~'];

const echo = function (args) {
  return args.join(' ');
};

const cd = function (args) {
  if (args.join('') === '') {
    path = path.reverse().slice(-1);
    return;
  }

  if (args.length > 1) {
    return 'cd: too many arguments';
  }

  if (args[0] === '..') {
    if (path.length === 1) {
      return 'No other parent directory';
    }

    path.pop();
    return;
  }

  path.push(args[0]);
};

const rm = function (args) {
  if (!args[0].includes('.')) {
    return 'rm: ' + args + ': is a directory';
  }

  return;
};

const pwd = function () {
  const path = path.slice(1);
  const separator = path.length > 0 ? '/' : '';

  return '/Users/anjalibaby' + separator + path.join('/');
};

const rmdir = function (args) {
  const currentIndex = allDirectories.indexOf(path.at(-1));
  const list = allDirectories.slice(currentIndex);
  console.log(list);

  for (const dir of args) {
    if (!list.includes(args)) {
      return 'rmdir:' + dir + ': No such file or directory';
    }

    const dirIndex = path.indexOf(dir);
    path.splice(dirIndex, 1);
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
    case 'rmdir': return rmdir(args);
    case 'mkdir': return;
    case 'pwd': return pwd();
    case 'rm': return rm(args);
    case 'clear': console.clear();
      return;
    default: return 'ssh: command not found';
  }
};


while (runProcess) {
  const directory = path.at(-1);
  const commandString = prompt(PROMPT + directory + ' %');
  const [command, ...args] = commandString.split(' ');

  const commandResult = shell(command, args);

  if (commandResult) {
    console.log(shell(command, args));
  }
}