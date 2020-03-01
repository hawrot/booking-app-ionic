import {Injectable} from '@angular/core';

import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {delay, map, switchMap, take, tap} from 'rxjs/operators';
import {HttpClient, HttpClientModule} from '@angular/common/http';

interface PlaceData {
    availableFrom: string;
    availableTo: string;
    description: string;
    imageUrl: string;
    price: number;
    title: string;
    userId: string;

}

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private _places = new BehaviorSubject<Place[]>([]);


    get places() {
        // return [...this._places];
        return this._places.asObservable();
    }

    constructor(private authService: AuthService, private  http: HttpClient) {
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

    fetchPlaces() {
        return this.http.get<{ [key: string]: PlaceData }>('https://ionic-angular-course-f44b5.firebaseio.com/offered-places.json')
            .pipe(map(resData => {
                    const places = [];
                    for (const key in resData) {
                        if (resData.hasOwnProperty(key)) {
                            places.push(new Place(
                                key, resData[key].title,
                                resData[key].description,
                                resData[key].imageUrl,
                                resData[key].price,
                                new Date(resData[key].availableFrom),
                                new Date(resData[key].availableTo),
                                resData[key].userId
                                )
                            );
                        }
                    }
                    return places;
                }),
                tap(places => {
                    this._places.next(places);
                    console.log(places);
                })
            )
    }

    addPlace(title: string, description: string, price: number, availableFrom: Date, availableTo: Date) {
        let generatedId: string;
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
        return this.http.post<{ name: string }>('https://ionic-angular-course-f44b5.firebaseio.com/offered-places.json', {
            ...newPlace,
            id: null
        }).pipe(switchMap(resData => {
                generatedId = resData.name;
                return this.places;
            }),
            take(1),
            tap(places => {
                newPlace.id = generatedId;
                this._places.next(places.concat(newPlace));
            })
        );


        /*//Method below takes one object from the subscription
        return this.places.pipe(take(1), tap(places => {
            this._places.next(places.concat(newPlace));
        }))*/
    }

    updatePlace(placeId: string, title: string, description: string) {
        let updatedPlaces: Place[];

        return  this.places.pipe(take(1), switchMap(places => {
            const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
            updatedPlaces = [...places];
            const oldPlace = updatedPlaces[updatedPlaceIndex];
            updatedPlaces[updatedPlaceIndex] = new Place(oldPlace.id, title, description, oldPlace.imageUrl, oldPlace.price, oldPlace.availableFrom, oldPlace.availableTo, oldPlace.userId);
            this._places.next(updatedPlaces);
            return this.http.put(`https://ionic-angular-course-f44b5.firebaseio.com/offered-places/${placeId}.json`,
                {...updatedPlaces[updatedPlaceIndex], id: null}
            );
        }),
        tap(()=> {
            this._places.next(updatedPlaces);
        })
    )
    }
}
