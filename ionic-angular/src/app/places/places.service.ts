import {Injectable} from '@angular/core';

import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'Manhattan Mansion',
            'In the heart of New York City.',
            'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
            149.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),
        new Place(
            'p2',
            'L\'Amour Toujours',
            'A romantic place in Paris!',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
            189.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),
        new Place(
            'p3',
            'The Foggy Palace',
            'Not your average city trip!',
            'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
            99.99,
            new Date('2020-01-01'),
            new Date('2020-12-31'),
            'abc'
        )
    ]);


    get places() {
        // return [...this._places];
        return this._places.asObservable();
    }

    constructor(private authService: AuthService) {
    }

    getPlaces(id: string) {
        // return {...this._places.find(p => p.id === id)};
        return this.places.pipe(take(1));
    }

    getPlace(id: string) {
        //  return {...this._places.find(p => p.id === id)};

        return this.places.pipe(take(1), map(places => {
            return {...places.find(p => p.id === id)};
        }));
    }

    addPlace(title: string, description: string, price: number, availableFrom: Date, availableTo: Date) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
            price,
            availableFrom,
            availableTo,
            this.authService.userId
        );
        //this._places.push(newPlace);

        //Method below takes one object from the subscription
        return this.places.pipe(take(1), tap(places => {
            this._places.next(places.concat(newPlace));
        }))
    }

    updatePlace(placeId: string, title: string, description: string) {
      return this.places.pipe(take(1), tap(places => {
            const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
            const updatedPlaces = [...places];
            const oldPlace = updatedPlaces[updatedPlaceIndex];
            updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
            this._places.next(updatedPlaces);
        }));
    }
}
