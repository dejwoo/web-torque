import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, BluetoothService } from './_services/index';
import { HomeComponent } from './home/index';
import { BluetoothComponent } from './bluetooth/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavComponent } from './nav/index';
import { RealtimeComponent } from './realtime/index';
import { DashboardComponent } from './dashboard/index';
import { SideNavComponent } from './side-nav/index';
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        BluetoothComponent,
        NavComponent,
        SideNavComponent,
        DashboardComponent,
        RealtimeComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        BluetoothService,
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }