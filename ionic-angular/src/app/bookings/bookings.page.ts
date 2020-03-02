import { Component, OnInit, OnDestroy } from '@angular/core';
import {IonItemSliding, LoadingController} from '@ionic/angular';
import { Subscription } from 'rxjs';

import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSub: Subscription;
  isLoading = false;

  constructor(private bookingService: BookingService, private loadingController: LoadingController) {}

  ngOnInit() {
   this.bookingSub = this.bookingService.bookings.subscribe(bookings => {
      this.loadedBookings = bookings;
    });
  }

  ionViewWillEnter(){
    this.isLoading =true;
    this.bookingService.fetchBookings().subscribe(()=>{
      this.isLoading = false;
    });
  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingController.create({
      message: 'Canceling the booking...'
    }).then(loadingEl =>{
      loadingEl.present();
      this.bookingService.cancelBooking(bookingId).subscribe(()=>{
        loadingEl.dismiss();
      });
    })

    // cancel booking wiht id offerId
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
