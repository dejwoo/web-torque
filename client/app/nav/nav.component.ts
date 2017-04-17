import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'nav.component.html',
    selector: 'app-nav',
})

export class NavComponent implements OnInit {
    currentUser: User;
    constructor(authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {}
}