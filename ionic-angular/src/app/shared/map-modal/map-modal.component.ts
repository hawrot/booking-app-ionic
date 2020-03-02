import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  @ViewChild('map') mapsElementRef: ElementRef;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss();
  }

  ngAfterViewInit() {
    this.getGoogleMaps().then(googleMaps => {
      const mapEl = this.mapsElementRef.nativeElement;
      const map = new googleMaps.Map(mapEl, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 16
      });
    }).catch(err =>{console.log(err)});
  }

  private getGoogleMaps(): Promise<any>{
    const win = window as any;
    const googleModule = win.google;
    if(googleModule && googleModule.maps){
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject)=>{
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAXPs1BkCAp-uWQ0Z8gYbx6jUF-wXYjvJE';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps){
          resolve(loadedGoogleModule.maps);
        }else {
          reject('Google Maps SDK not available');
        }
      }
    })
  }

}
