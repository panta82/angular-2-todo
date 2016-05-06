import {Component, Input} from 'angular2/core';
import Todo from "./todo";
import {TodoComponent} from "./todo.component";

@Component({
	selector: 'todo-list',
	templateUrl: './app/todo/todo-list.component.html',
	styleUrls: ['./app/todo/todo-list.component.css'],
	directives: [TodoComponent]
})
export class TodoListComponent {
	@Input()
	todos: Array<Todo>;

	selected: Todo;
}
