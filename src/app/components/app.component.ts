import {Component} from 'angular2/core';
import {TodoListComponent} from './todo/todo-list.component';
import Todo from "../models/todo";
import {TodosService} from "../services/todos.service";

declare var __moduleName: any;

@Component({
	moduleId: __moduleName,
	selector: 'app',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
	directives: [TodoListComponent],
	providers: [TodosService]
})
export class AppComponent {
}