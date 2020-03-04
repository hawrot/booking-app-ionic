import {Component, OnInit} from '@angular/core';
import {CameraResultType, CameraSource, Capacitor, Plugins} from '@capacitor/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {

  selectedImage: string;

  constructor() { }

  ngOnInit() {}

  onPickImage(){
    if(!Capacitor.isPluginAvailable('Camera')){
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    });
  }

}
