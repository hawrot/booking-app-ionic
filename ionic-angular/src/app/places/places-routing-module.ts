import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlacesPage} from './places.page';

const routers: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children:
            [
                {
                    path: 'discover',
                    children: [
                        {
                            path: '',
                            loadChildren: './discover/discover.module#DiscoverPageModule'
                        },
                        {
                            path: ':placeId',
                            loadChildren: './discover.place-detail.module#PlaceDetailPageModule'
                        }
                    ]
                },
                {
                    path: 'offers',
                    children: [
                        {
                            path: '',
                            loadChildren: './offers/offers.module#OffersPageModule'
                        },
                        {
                            path: 'new',
                            loadChildren: './offers/new-offer.module#NewOfferPageModule'
                        },
                        {
                            path: 'edit/:pageId',
                            loadChildren: './offers/edit-offer/edit-offer.module#EditOfferPageModule'
                        },
                        {
                            path: ':placeId',
                            loadChildren: './offers/offer-booking/offer-bookings.module#OfferBookingsPageModule'
                        }
                    ]
                },
                {
                    path: '',
                    redirectTo: '/places/tabs/discover',
                    pathMatch: 'full'
                }
            ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routers)],
    exports: [RouterModule]
})
export class PlacesRoutingModule {
}
