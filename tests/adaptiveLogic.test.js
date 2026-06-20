const assert = require('assert');
const { getAdaptiveMode } = require('../app');

function task(priority) {
  return { name: `${priority} task`, priority };
}

const beginnerState = getAdaptiveMode({
  experience: 'beginner',
  focus: false,
  tasks: []
});
assert.strictEqual(beginnerState.mode, 'beginner');

const focusState = getAdaptiveMode({
  experience: 'intermediate',
  focus: false,
  tasks: [task('high'), task('high')]
});
assert.strictEqual(focusState.mode, 'focus');

const advancedState = getAdaptiveMode({
  experience: 'advanced',
  focus: false,
  tasks: [task('medium')]
});
assert.strictEqual(advancedState.mode, 'advanced');

const balancedState = getAdaptiveMode({
  experience: 'intermediate',
  focus: false,
  tasks: [task('medium')]
});
assert.strictEqual(balancedState.mode, 'balanced');

console.log('All adaptive logic tests passed.');
