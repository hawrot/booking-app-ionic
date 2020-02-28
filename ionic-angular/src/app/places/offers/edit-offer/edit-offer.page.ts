import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Place} from '../../place.model';
import {PlacesService} from '../../places.service';
import {NavController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    place: Place;
    form: FormGroup;
    private placeSub: Subscription;

    constructor(private route: ActivatedRoute, private placesService: PlacesService, private navCtrl: NavController) {
    }


    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/places/tabs/offers');
                return;
            }
            this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place =>{
                this.place = place;
                this.form = new FormGroup({
                    title : new FormControl(this.place.title, {updateOn: 'blur', validators: [Validators.required]}),
                    description : new FormControl(this.place.description, {updateOn: 'blur', validators: [Validators.required]}),
                })
            })
            //this.place = this.placesService.getPlace(paramMap.get('placeId'));

        })
    }

    onUpdateOffer(){
        if(!this.form.valid){
            return;
        }
        console.log(this.form);
    }

    ngOnDestroy() {
        if(this.placeSub){
            this.placeSub.unsubscribe();
        }
    }

}
