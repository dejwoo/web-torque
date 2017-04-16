import { Component } from '@angular/core';
import { User } from './_models/index';
import { AuthenticationService } from './_services/index';
import '../assets/app.css';

@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
	currentUser: User;
	constructor(authenticationService:AuthenticationService) {
		authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
}