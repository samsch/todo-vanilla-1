# To-do App - Vanilla JS
This is a To-do app built using just JS, HTML, and CSS. It's modeled to be very similar to the [same app written in React](https://github.com/samsch/todo-react-1/tree/v0.1.2). Specifically, it uses the same css file, and same html structure (practically, anyway. React has it's extra comment nodes and such, and whitespace is handled differently).

This app is spaghetti code (especially in comparison to the React version). The business logic is completely mixed with the view, and it needs to use JS function declarations rather than `const` function expressions because it relies on function hoisting.
