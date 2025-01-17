const repeatCount = process.stdout.rows - 4;

console.log(process.stdout.rows);

const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : '';
console.log(blank);
