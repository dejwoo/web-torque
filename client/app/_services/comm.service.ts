import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Subject }    from 'rxjs/Subject';
import { Sidebar } from '../_models/index';

@Injectable()
export class CommService {
	private sidebarState = new Subject<Sidebar>();
	sidebarChangeState(state: Sidebar) {
		this.sidebarState.next(state);
	}
	getSidebarStateSubject():Subject<Sidebar> {
		return this.sidebarState;
	}
	constructor() {
	}
}
