import { Component, OnInit } from '@angular/core';

import { User, Carousel } from '../_models/index';
import { AuthenticationService } from '../_services/index';
var path = require('path');

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
    			'src': require('../../assets/carousel1.png'),
    			'alt':"Carousel 1 image",
                'class' : 'img-fluid'
    		}
    	}];
    constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {
    	this.testName = "test";
    }
}