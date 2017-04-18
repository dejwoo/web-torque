import { Component } from '@angular/core';
import '../assets/app.css';
import { AuthenticationService } from './_services/index';
import { User } from './_models/index';
@Component({
    moduleId: module.id.toString(),
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent {
	private currentUser: User;

	constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
}