import { Component, OnInit } from '@angular/core';
import { User, Carousel } from '../_models/index';
import { AuthenticationService } from '../_services/index';
var path = require('path');
declare var window: any;

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
    			'src': require('../../assets/carousel1.jpg'),
    			'alt':"Carousel 1 image",
                'class' : 'd-block img-fluid'
    		}
    	},
        {
            'id':'1',
            'title': "Real-time Dashboard",
            'lead': "Display digital instead of old analogue!",
            'button': {
                'link':"/register",
                'title': "Live demo!"
            },
            'img':{
                'src': require('../../assets/carousel2.jpg'),
                'alt':"Carousel 2 image",
                'class' : 'd-block img-fluid'
            }
        },
        {
            'id':'2',
            'title': "Data Visualization",
            'lead': "Display telemetry data for insight and enhance your driving experience!",
            'button': {
                'link':"/register",
                'title': "See the example!"
            },
            'img':{
                'src': require('../../assets/carousel3.jpg'),
                'alt':"Carousel 3 image",
                'class' : 'd-block img-fluid'
            }
        }];
    constructor(private authenticationService:AuthenticationService) {
        authenticationService.isLoggedIn().subscribe(user => this.currentUser = user);
    }
    ngOnInit() {
    	console.log("Home initialisied");
        if (window.Holder) {
            window.Holder.run()
        }
    }
}