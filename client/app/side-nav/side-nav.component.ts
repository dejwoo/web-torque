import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'side-nav.component.html',
    selector: 'side-nav',
})

export class SideNavComponent implements OnInit {
    currentUser: User;
    constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {}
}