## ADDED Requirements

### Requirement: Display Todo List
The system SHALL display a minimalist Todo list widget on the new tab page.

#### Scenario: User opens new tab
- **WHEN** the new tab is loaded
- **THEN** the Todo list widget is visible, showing previously saved tasks.

### Requirement: Add Task
The user SHALL be able to add new tasks to the Todo list.

#### Scenario: User enters a new task
- **WHEN** the user types a task in the input field and presses Enter
- **THEN** the task is added to the list
- **AND** the tasks are saved to `chrome.storage.local`.

### Requirement: Toggle Task Status
The user SHALL be able to mark a task as completed or incomplete.

#### Scenario: User clicks a task checkbox
- **WHEN** the user toggles the completion status of a task
- **THEN** the visual state of the task updates (e.g., strikethrough)
- **AND** the updated state is saved to `chrome.storage.local`.

### Requirement: Delete Task
The user SHALL be able to remove a task from the list.

#### Scenario: User clicks delete button
- **WHEN** the user clicks the delete icon next to a task
- **THEN** the task is removed from the DOM
- **AND** the updated list is saved to `chrome.storage.local`.
