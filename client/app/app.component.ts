import { Component, OnInit } from '@angular/core';
import '../assets/app.css';
import { AuthenticationService, CommService } from './_services/index';
import { User, Sidebar } from './_models/index';
@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{
	private currentUser: User;
	private sidebar: Sidebar;

	constructor(private authenticationService:AuthenticationService, commService:CommService) {
		this.sidebar = {
			'state':"full",
			'error':"null"
		};
		commService.sidebarChangeState(this.sidebar);
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
        commService.getSidebarStateSubject().subscribe(sidebar => this.sidebar = sidebar);
    }
    ngOnInit() {
    }
}