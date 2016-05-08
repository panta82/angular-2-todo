import {Component, Input, Output, EventEmitter} from 'angular2/core';
import Todo from "../../models/todo";

declare var __moduleName: any;

@Component({
	moduleId: __moduleName,
	selector: 'todo',
	templateUrl: 'todo.component.html',
	styleUrls: ['todo.component.css']
})
export class TodoComponent {
	@Input() todo: Todo;
	@Input() editMode: boolean;

	@Output() edit = new EventEmitter<string>();
	@Output() save = new EventEmitter<string>();
	@Output() cancel = new EventEmitter<string>();
	@Output() remove = new EventEmitter<string>();

	onEdit() {
		this.edit.emit(this.todo.id);
	}

	onSave() {
		this.save.emit(this.todo.id);
	}

	onCancel() {
		this.cancel.emit(this.todo.id);
	}

	onRemove() {
		this.remove.emit(this.todo.id);
	}
}
