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

	onTodoEdit(todoId: string) {
		let todo = lodash.find(this.todos, {id: todoId});
		if (!todo) {
			return console.error(`Todo not found: ${todoId}`);
		}

		if (this.editingId) {
			this.doCancelTodoEdit();
		}

		this.editingId = todoId;
		this.editingOriginal = this.cloneService.clone(todo);
	}

	onTodoSave() {
		this.editingId = null;
		this.editingOriginal = null;
	}

	onTodoCancel() {
		this.doCancelTodoEdit();
	}

	doCancelTodoEdit() {
		if (!this.editingId) {
			return console.error(`No todo is being edited`);
		}

		let index = lodash.findIndex(this.todos, {id: this.editingId});
		this.todos[index] = this.editingOriginal;
		this.editingId = null;
		this.editingOriginal = null;
	}
}
