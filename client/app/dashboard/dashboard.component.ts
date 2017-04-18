import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService, private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
}