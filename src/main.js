// Get references to elements used throughout app.
const el = {
  newItemForm: document.getElementById('new-item-form'),
  newItemInput: document.getElementById('new-item-input'),
  todoList: document.getElementById('todo-items'),
  completedList: document.getElementById('completed-items'),
};
// Add references for children elements. Could be done above,
// but would duplicate getElementById calls or make the
// structure more complicated than the simple object it should be.
el.noTodosItem = el.todoList.querySelector('li');
el.noCompletedItem = el.completedList.querySelector('li');

// Remove all nodes from lists (Cleans out text nodes to make
// content checks easier later).
Array.from(el.todoList.childNodes).forEach((node: Node) => el.todoList.removeChild(node));
Array.from(el.completedList.childNodes).forEach((node: Node) => el.completedList.removeChild(node));

// Put empty notices back into lists.
el.todoList.appendChild(el.noTodosItem);
el.completedList.appendChild(el.noCompletedItem);


// Handlers for adding and removing empty notices.
// Checks that the element exists in the parent before removing,
// or that the parent has no children (to-do items) before adding.
function removeNoTodoFromParent() {
  if(el.noTodosItem.parentElement === el.todoList) {
    el.todoList.removeChild(el.noTodosItem);
  }
}

function addNoTodoToParentIfParentEmpty() {
  if(el.todoList.childNodes.length === 0) {
    el.todoList.appendChild(el.noTodosItem);
  }
}

function removeNoCompletedFromParent() {
  if(el.noCompletedItem.parentElement === el.completedList) {
    el.completedList.removeChild(el.noCompletedItem);
  }
}

function addNoCompletedToParentIfParentEmpty() {
  if(el.completedList.childNodes.length === 0) {
    el.completedList.appendChild(el.noCompletedItem);
  }
}


// Button listeners. These are added and removed in
// completeItem and unfinishItem.
function doneButtonListener(e: Event) {
  completeItem(e.target.parentElement, e.target);
}

function unfinishButtonListener(e: Event) {
  unfinishItem(e.target.parentElement, e.target);
}


// These are the functions which do the work of tranfering
// a to-do item from unfinshed to completed and back.
function completeItem(li: HTMLLIElement, button: HTMLButtonElement) {
  li.parentElement.removeChild(li);
  button.removeEventListener('click', doneButtonListener);
  button.addEventListener('click', unfinishButtonListener);
  li.classList.add('todo-completed-item');
  li.classList.remove('todo-item');
  el.completedList.appendChild(li);
  addNoTodoToParentIfParentEmpty();
  removeNoCompletedFromParent();
}

function unfinishItem(li: HTMLLIElement, button: HTMLButtonElement) {
  li.parentElement.removeChild(li);
  button.removeEventListener('click', unfinishButtonListener);
  button.addEventListener('click', doneButtonListener);
  li.classList.add('todo-item');
  li.classList.remove('todo-completed-item');
  el.todoList.appendChild(li);
  removeNoTodoFromParent();
  addNoCompletedToParentIfParentEmpty();
}


// Creates a new to-do item and adds it to the to-do list.
function newItem(text) {
  const li = document.createElement('li');
  const button = document.createElement('button');
  const textNode = document.createTextNode(text);
  button.addEventListener('click', doneButtonListener);
  button.innerText = 'Done';
  li.appendChild(button);
  li.appendChild(textNode);
  el.todoList.appendChild(li);
  removeNoTodoFromParent();
}


// Handler for new to-do form submission.
el.newItemForm.addEventListener('submit', e => {
  e.preventDefault();
  newItem(el.newItemInput.value);
  el.newItemInput.value = '';
});
