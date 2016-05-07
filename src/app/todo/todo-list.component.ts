import {Component, Input} from 'angular2/core';
import Todo from "./todo";
import {TodoComponent} from "./todo.component";
import {CloneService} from "../services/clone.service";
import * as lodash from "lodash";

@Component({
	selector: 'todo-list',
	templateUrl: './app/todo/todo-list.component.html',
	styleUrls: ['./app/todo/todo-list.component.css'],
	directives: [TodoComponent],
	providers: [CloneService]
})
export class TodoListComponent {
	constructor (private cloneService: CloneService<Todo>) {
	}

	@Input() todos: Array<Todo>;

	editingId: string = null;
	editingOriginal: Todo = null;
	editingTemporary: boolean = false;

	onTodoEdit(todoId: string) {
		let todo = lodash.find(this.todos, {id: todoId});
		if (!todo) {
			return console.error(`Todo not found: ${todoId}`);
		}

		if (this.editingId) {
			this.onTodoCancel();
		}

		this.editingId = todoId;
		this.editingOriginal = this.cloneService.clone(todo);
		this.editingTemporary = false;
	}

	onTodoSave() {
		this.editingId = null;
		this.editingOriginal = null;
	}

	onTodoCancel() {
		if (!this.editingId) {
			return console.error(`No todo is being edited`);
		}

		let index = lodash.findIndex(this.todos, {id: this.editingId});
		if (this.editingTemporary) {
			this.todos.splice(index, 1);
		} else {
			this.todos[index] = this.editingOriginal;
		}
		this.editingId = null;
		this.editingOriginal = null;
	}

	onTodoAdd() {
		let todo = <Todo>{
			id: Math.random().toString(),
			text: '',
			done: false
		};
		this.todos.push(todo);

		this.onTodoEdit(todo.id);
		this.editingTemporary = true;
	}

	onTodoRemove(todoId) {
		let index = lodash.findIndex(this.todos, {id: todoId});
		if (index < 0) {
			return console.error(`No todo with id ${todoId} was found`);
		}

		this.todos.splice(index, 1);
	}
}
