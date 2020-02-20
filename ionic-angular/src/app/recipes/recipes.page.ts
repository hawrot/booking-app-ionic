import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipesService} from './recipes.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.page.html',
    styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {

    recipes: Recipe[];

    constructor(private recipesService: RecipesService) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.recipes = this.recipesService.getAppRecipes();
        console.log('ionViewWillEnter');
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter');
    }

    ionViewWillLeave() {
        console.log('ionViewWILLLeave');
    }

    ionViewDidLeave() {
        console.log('ionViewDidLeave');
    }

    ngOnDestroy(): void {
    }

}
