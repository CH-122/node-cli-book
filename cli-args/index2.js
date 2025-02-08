import { Command } from "commander";

const program = new Command()

program.name('string-util').description('A utility for string manipulation').version('1.0.0');

program.command('split').description('分割字符串为数组').argument('<string>', '分割的字符串').option('--first', '只展示第一个字符串').option('-s, --separator <char>', '分割符', ',').action(
  (str, options) => {
    const limit = options.first ? 1 : undefined;

    console.log('separator', options.separator);


    const separator = options.separator === "''" || options.separator === '""' ? '' : options.separator;

    console.log(str.split(separator, limit));

  }
)

program.parse(process.argv);
