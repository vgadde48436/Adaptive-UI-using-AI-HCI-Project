# Adaptive UI using AI-HCI Project

This project demonstrates an adaptive user interface using AI-related human-computer interaction concepts. The application is a browser-based **Adaptive Task Assistant** that changes its interface based on user experience level, workload, task priority, and focus preference.

## GitHub Repository

https://github.com/vgadde48436/Adaptive-UI-using-AI-HCI-Project

## Project Purpose

The purpose of this prototype is to show how artificial intelligence concepts can improve user experience by adapting interface guidance, recommendations, and visual emphasis to the user's current situation.

## Adaptive Features

- Beginner users receive more guidance and clearer instructions.
- Advanced users see productivity metrics and reduced basic help text.
- Users with many high-priority tasks receive a focus-mode recommendation.
- Urgent tasks are visually highlighted.
- The interface explains why it changed so the user understands the adaptation.

## Files Included

- `index.html` - Main application page.
- `styles.css` - Interface styling and adaptive visual states.
- `app.js` - Adaptive UI logic and task behavior.
- `tests/adaptiveLogic.test.js` - Basic logic tests for adaptive mode decisions.
- `docs/report-content.txt` - Report content summary for documentation.
- `package.json` - Project metadata and test command.

## How to Run

1. Download or clone the repository.
2. Open `index.html` in any modern web browser.
3. Select a user experience level.
4. Add tasks with different priority levels.
5. Observe how the interface adapts to the user context.

## How to Run Tests

If Node.js is installed, run:

```bash
npm test
```

The tests check whether the adaptive logic returns the expected interface mode for beginner, focus, and advanced scenarios.

## Technologies Used

- HTML
- CSS
- JavaScript
- Rule-based AI-style adaptive decision logic

## AI Tool Disclosure

OpenAI ChatGPT was used to help brainstorm the project structure, explain adaptive UI and Intelligent User Interface concepts, and support development of the prototype code and documentation. The final project should be reviewed and edited by the student before submission.
