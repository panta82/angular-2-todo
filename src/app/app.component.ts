import {Component} from 'angular2/core';
import {TodoComponent} from './todo/todo.component';

import Todo from "./todo/todo";

@Component({
	selector: 'app',
	templateUrl: './app/app.component.html',
	styleUrls: ['./app/app.component.css'],
	directives: [TodoComponent]
})

export class AppComponent {
	data: Array<Todo> = FIXTURES;
	selected: Todo;
}

var FIXTURES: Array<Todo> = [
	{ text: 'Todo1', done: false },
	{ text: 'Todo2', done: false }
];