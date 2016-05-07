import { Injectable } from 'angular2/core';

@Injectable()
export class CloneService<T> {
	clone(ob: T) {
		let clone = <T>{};

		for (var key in ob) {
			if (ob.hasOwnProperty(key)) {
				clone[key] = (<any>ob)[key];
			}
		}

		return clone;
	}
}