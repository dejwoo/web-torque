﻿import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'footer.component.html',
    selector: 'app-footer',
})

export class FooterComponent implements OnInit {
    currentUser: User;
    constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {}
}