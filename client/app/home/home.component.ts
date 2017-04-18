import { Component, OnInit } from '@angular/core';

import { User, Carousel } from '../_models/index';
import { AuthenticationService } from '../_services/index';


@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    private currentUser: User;
    testName:String;
    carousels: Carousel[] = [
    	{
    		'id':'0',
    		'title': "Web Torque",
    		'lead': "Record car-telemetry with ease!",
    		'button': {
    			'link':"/register",
    			'title': "Sign up today!"
    		},
    		'img':{
    			'src':"data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
    			'alt':"Image0"
    		}
    	}];
    constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {
    	this.testName = "test";
    }
}