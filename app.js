function getAdaptiveMode(context) {
  const highPriorityCount = context.tasks.filter((task) => task.priority === 'high').length;
  const totalTaskCount = context.tasks.length;

  if (context.experience === 'beginner') {
    return {
      mode: 'beginner',
      name: 'Beginner Guidance Mode',
      reason: 'The interface is showing extra help because the user selected beginner experience.',
      recommendation: 'Use the guided layout. Add one task at a time and focus on completing high-priority work first.',
      signal: 'Learning'
    };
  }

  if (context.focus || highPriorityCount >= 2 || totalTaskCount >= 5) {
    return {
      mode: 'focus',
      name: 'Focus Mode',
      reason: 'The interface detected high workload, urgent tasks, or a user preference for fewer distractions.',
      recommendation: 'Focus mode is recommended. Complete high-priority tasks first and ignore lower-priority items temporarily.',
      signal: 'High'
    };
  }

  if (context.experience === 'advanced') {
    return {
      mode: 'advanced',
      name: 'Advanced Productivity Mode',
      reason: 'The interface reduced basic guidance because the user selected advanced experience.',
      recommendation: 'Use the productivity metrics to review workload and prioritize tasks efficiently.',
      signal: 'Optimized'
    };
  }

  return {
    mode: 'balanced',
    name: 'Balanced Mode',
    reason: 'The current workload appears manageable, so the interface is using a balanced layout.',
    recommendation: 'Continue adding tasks. The system will adapt if workload, urgency, or user preference changes.',
    signal: 'Balanced'
  };
}

if (typeof document !== 'undefined') {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const prioritySelect = document.getElementById('prioritySelect');
  const experienceLevel = document.getElementById('experienceLevel');
  const focusPreference = document.getElementById('focusPreference');
  const resetBtn = document.getElementById('resetBtn');
  const appShell = document.getElementById('appShell');
  const modeName = document.getElementById('modeName');
  const modeReason = document.getElementById('modeReason');
  const recommendationText = document.getElementById('recommendationText');
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const emptyState = document.getElementById('emptyState');
  const metricsPanel = document.getElementById('metricsPanel');
  const totalTasks = document.getElementById('totalTasks');
  const highTasks = document.getElementById('highTasks');
  const completionSignal = document.getElementById('completionSignal');

  let tasks = [];

  function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task) => {
      const item = document.createElement('li');
      item.className = task.priority === 'high' ? 'high' : '';
      item.innerHTML = `
        <span>${task.name}</span>
        <span class="priority">${task.priority}</span>
      `;
      taskList.appendChild(item);
    });

    taskCount.textContent = `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'}`;
    emptyState.hidden = tasks.length > 0;
  }

  function updateAdaptiveInterface() {
    const context = {
      experience: experienceLevel.value,
      focus: focusPreference.checked,
      tasks
    };

    const adaptiveState = getAdaptiveMode(context);
    const highPriorityCount = tasks.filter((task) => task.priority === 'high').length;

    appShell.classList.remove('beginner-mode', 'focus-mode', 'advanced-mode');
    if (adaptiveState.mode !== 'balanced') {
      appShell.classList.add(`${adaptiveState.mode}-mode`);
    }

    modeName.textContent = adaptiveState.name;
    modeReason.textContent = adaptiveState.reason;
    recommendationText.textContent = adaptiveState.recommendation;
    totalTasks.textContent = tasks.length;
    highTasks.textContent = highPriorityCount;
    completionSignal.textContent = adaptiveState.signal;
    metricsPanel.hidden = tasks.length === 0 && adaptiveState.mode !== 'advanced';
  }

  function addTask(event) {
    event.preventDefault();
    const name = taskInput.value.trim();

    if (!name) {
      return;
    }

    tasks.push({
      name,
      priority: prioritySelect.value,
      createdAt: new Date().toISOString()
    });

    taskInput.value = '';
    prioritySelect.value = 'medium';
    renderTasks();
    updateAdaptiveInterface();
  }

  function resetDemo() {
    tasks = [];
    experienceLevel.value = 'intermediate';
    focusPreference.checked = false;
    renderTasks();
    updateAdaptiveInterface();
  }

  taskForm.addEventListener('submit', addTask);
  experienceLevel.addEventListener('change', updateAdaptiveInterface);
  focusPreference.addEventListener('change', updateAdaptiveInterface);
  resetBtn.addEventListener('click', resetDemo);

  renderTasks();
  updateAdaptiveInterface();
}

if (typeof module !== 'undefined') {
  module.exports = { getAdaptiveMode };
}
