import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { AlertService } from '../_services/index';
// import { RSVP } from 'rsvp';
let RSVP = require('rsvp');

@Injectable()
export class BluetoothService {
	private mockDevices = ["device1", "device2", "device3"]
	constructor(private alertService:AlertService) {
	}
	getAll():Observable<any> {
		return this.requestDevices({'acceptAllDevices': true});
	}
	private requestDevices(options:RequestDeviceOptions):Observable<BluetoothDevice> {
		if (this.isWebBluetoothEnabled()) {
			let promise:Promise<BluetoothDevice> = navigator.bluetooth.requestDevice(options);
			return Observable.fromPromise(promise);
		}
		return Observable.throw(new Error('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled in Chrome Flags settings.'));
	}
	private isWebBluetoothEnabled():Boolean {
    if (navigator.bluetooth) {
      return true;
    } else {
      this.alertService.error('Web Bluetooth API is not available.\n' +
          'Please make sure the "Experimental Web Platform features" flag is enabled in Chrome Flags settings.');
      return false;
    }
  }
}