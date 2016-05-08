/// <reference path="../../../../typings/browser/ambient/lodash/index.d.ts" />

import {Component, Input} from 'angular2/core';
import * as lodash from "lodash";

import {TodoComponent} from "./todo.component";
import {CloneService} from "../../services/clone.service";
import {TodosService} from "../../services/todos.service";
import Todo from "../../models/todo";

declare var __moduleName: any;

const NEW_ID_PLACEHOLDER = '__new__';

@Component({
	moduleId: __moduleName,
	selector: 'todo-list',
	templateUrl: 'todo-list.component.html',
	styleUrls: ['todo-list.component.css'],
	directives: [TodoComponent],
	providers: [CloneService]
})
export class TodoListComponent {
	constructor (private cloneService: CloneService<Todo>, private todosService: TodosService) {
	}

	todos: Array<Todo> = [];
	isWaiting: boolean = false;

	editingId: string = null;
	editingOriginal: Todo = null;
	isCreatingNew: boolean = false;

	ngOnInit() {
		this.loadTodosFromService();
	}

	loadTodosFromService() {
		this.isWaiting = true;
		return this.todosService.list()
			.then(
				todos => {
					this.todos = todos;
					this.isWaiting = false;
				},
				error => {
					alert(error.message);
					this.isWaiting = false;
				}
			)
	}

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
	}

	onTodoSave() {
		let index = lodash.findIndex(this.todos, {id: this.editingId});
		if (index < 0) {
			return console.error(`Editing todo ${this.editingId} was not found`);
		}

		let todoToSave = this.cloneService.clone(this.todos[index]);
		if (todoToSave.id === NEW_ID_PLACEHOLDER) {
			todoToSave.id = null;
		}

		this.isWaiting = true;
		this.todosService.update(todoToSave)
			.then(
				savedTodo => {
					this.isWaiting = false;
					this.editingId = null;
					this.editingOriginal = null;
					this.isCreatingNew = false;
					this.loadTodosFromService();
				},
				error => {
					this.isWaiting = false;
					alert(error.message);
				}
			);
	}

	onTodoCancel() {
		if (!this.editingId) {
			return console.error(`No todo is being edited`);
		}

		let index = lodash.findIndex(this.todos, {id: this.editingId});
		if (this.isCreatingNew) {
			this.todos.splice(index, 1);
		} else {
			this.todos[index] = this.editingOriginal;
		}
		this.editingId = null;
		this.editingOriginal = null;
		this.isCreatingNew = false;
	}

	onTodoAdd() {
		let todo = <Todo>{
			id: NEW_ID_PLACEHOLDER,
			text: '',
			done: false
		};
		this.todos.push(todo);

		this.onTodoEdit(todo.id);
		this.isCreatingNew = true;
	}

	onTodoRemove(todoId) {
		if (this.editingId) {
			this.onTodoCancel();
		}
		this.isWaiting = true;
		this.todosService.remove(todoId)
			.then(
				res => {
					this.isWaiting = false;
					this.loadTodosFromService();
				},
				error => {
					this.isWaiting = false;
					alert(error.message);
				}
			);
	}

	onTodoDone(todoId) {
		let todo: Todo = lodash.find(this.todos, {id: todoId});
		if (!todo) {
			return console.error(`Todo not found: ${todoId}`);
		}

		var oldDone = todo.done;
		todo.done = !todo.done;
		this.todosService.update(todo)
			.catch(
				error => {
					alert(error.message);
					todo.done = oldDone;
				}
			);
	}
}
