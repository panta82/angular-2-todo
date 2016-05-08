import { Injectable } from 'angular2/core';
import * as lodash from "lodash";

import Todo from "../models/todo";

const LOCAL_STORAGE_KEY = 'todos';

@Injectable()
export class TodosService {
	private _data: Array<Todo> = null;

	constructor() {
		this.loadData();
	}

	private loadData() {
		this._data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
	}

	private saveData() {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._data));
	}

	list(): Promise<Array<Todo>> {
		return Promise.resolve(this._data.slice());
	}

	find(todoId: string): Promise<Todo> {
		let todo = lodash.find(this._data, {id: todoId});
		if (!todo) {
			return Promise.reject(new Error(`Todo ${todoId} not found`));
		}
		return Promise.resolve(todo)
	}

	update(todo: Todo): Promise<Todo> {
		if (todo.id) {
			let index = lodash.findIndex(this._data, {id: todo.id});
			if (index < 0) {
				return Promise.reject(new Error(`Todo ${todo.id} not found`));
			}
			this._data[index] = todo;
		} else {
			todo.id = Math.floor(Math.random() * 999999999).toString();
			this._data.push(todo);
		}
		this.saveData();
		return Promise.resolve(todo);
	}

	remove(todoId: string): Promise<boolean> {
		let index = lodash.findIndex(this._data, {id: todoId});
		if (index < 0) {
			return Promise.reject(new Error(`Todo ${todoId} not found`));
		}

		this._data.splice(index, 1);
		this.saveData();
		return Promise.resolve(true);
	}
}