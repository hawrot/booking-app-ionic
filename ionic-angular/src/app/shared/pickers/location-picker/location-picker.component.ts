import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {MapModalComponent} from '../../map-modal/map-modal.component';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.scss'],
})
export class LocationPickerComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {}

  onPickLocation(){
    this.modalCtrl.create({component: MapModalComponent}).then(modalEl =>{
      modalEl.onDidDismiss().then(modalData =>{
        console.log(modalData);
      });
      modalEl.present();
    })
  }
  private getAddress(lat: number, lng: number){
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key='+ environment.googleMapsAPIKey);
  }

}
