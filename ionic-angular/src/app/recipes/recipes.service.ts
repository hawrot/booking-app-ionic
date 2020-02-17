import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

 private recipes: Recipe[] = [
    {
      id: 'rl1',
      title: 'Pizza',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/15/c5/a4/14/pepperoni-lovers.jpg',
      ingredients: ['ham', 'tomato', 'mushrooms']
    },
    {
      id: 'rl2',
      title: 'Burger',
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/15/c5/a4/14/pepperoni-lovers.jpg',
      ingredients: ['pork', 'tomato', 'mushrooms']
    }
  ];

  constructor() { }

  getAppRecipes() {
   return [...this.recipes];
  }

  getRecipe(recipeId: string) {
   return {...this.recipes.find(recipe => {
     return recipe.id === recipeId;
   })};

  }
}

