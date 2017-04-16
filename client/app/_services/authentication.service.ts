import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../_models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private currentUser:BehaviorSubject<User> =  new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                //propagate new user through system
                this.currentUser.next(user)
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUser.next(null);
    }
    isLoggedIn() {
        return this.currentUser.asObservable();
    }
}