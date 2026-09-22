// Simple automated tests for calculator logic
// Mirrors the calculation logic in script.js and checks expected results

function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b === 0 ? 'Error' : a / b;
    case '%':
      return a % b;
    default:
      throw new Error('Unknown operator: ' + operator);
  }
}

const tests = [
  { a: 5, op: '+', b: 3, expected: 9 },
  { a: 10, op: '-', b: 4, expected: 6 },
  { a: 7, op: '*', b: 6, expected: 42 },
  { a: 20, op: '/', b: 4, expected: 5 },
  { a: 10, op: '/', b: 0, expected: 'Error' },
  { a: 9, op: '%', b: 4, expected: 1 },
];

let passed = 0;
let failed = 0;

tests.forEach(({ a, op, b, expected }, i) => {
  const result = calculate(a, op, b);
  if (result === expected) {
    console.log(`PASS: test ${i + 1} (${a} ${op} ${b} = ${result})`);
    passed++;
  } else {
    console.error(`FAIL: test ${i + 1} (${a} ${op} ${b}) expected ${expected}, got ${result}`);
    failed++;
  }
});

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
