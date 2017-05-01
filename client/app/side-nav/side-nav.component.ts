import { Component, OnInit } from '@angular/core';

import { User, Sidebar } from '../_models/index';
import { AuthenticationService, CommService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'side-nav.component.html',
    selector: 'side-nav',
})

export class SideNavComponent implements OnInit {
    private currentUser: User;
    private sidebar: Sidebar;
    private reportStateUpstream: Function;
    constructor(private authenticationService:AuthenticationService,  commService:CommService) {
    	this.sidebar = {
			'state':"full",
			'error':"null"
		};
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
        commService.getSidebarStateSubject().subscribe(sidebar => {
        	if (sidebar.state != this.sidebar.state) {
        		if (this.sidebar) {
        			this.toggleSidebar();
        		} else {
        			this.sidebar = sidebar;
        			this.reportStateUpstream()
        		}
        	}
        });
        this.reportStateUpstream = function() {
        	commService.sidebarChangeState(this.sidebar);
        }

    }
    toggleSidebar() {
		this.sidebar.state = this.sidebar.state == "full" ? "compact" : "full";
		this.reportStateUpstream();
    }
    ngOnInit() {
    }
}