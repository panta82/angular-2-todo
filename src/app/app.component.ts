import {Component} from 'angular2/core';
import {TodoListComponent} from './todo/todo-list.component';

import Todo from "./todo/todo";

@Component({
	selector: 'app',
	templateUrl: './app/app.component.html',
	styleUrls: ['./app/app.component.css'],
	directives: [TodoListComponent]
})
export class AppComponent {
	data: Array<Todo> = FIXTURES;
}

var FIXTURES: Array<Todo> = [
	{ text: 'Todo1', done: false },
	{ text: 'Todo2', done: false }
];