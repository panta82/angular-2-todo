import {Component, Input} from 'angular2/core';
import Todo from "./todo";

@Component({
	selector: 'todo',
	templateUrl: './app/todo/todo.component.html',
	styleUrls: ['./app/todo/todo.component.css']
})

export class TodoComponent {
	@Input()
	todo: Todo;
}
