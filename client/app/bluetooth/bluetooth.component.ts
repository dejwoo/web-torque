import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { BluetoothService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'bluetooth.component.html'
})

export class BluetoothComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    devices: any[] = [];

    constructor(private bluetoothService: BluetoothService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        // this.getBluetoothDevices();
    }

    private getBluetoothDevices() {
        this.bluetoothService.getAll().subscribe((device:BluetoothDevice[]) => { this.devices.push(device)});
    }
}