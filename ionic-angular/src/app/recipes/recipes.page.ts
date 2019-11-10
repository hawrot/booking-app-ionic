import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Recipe[] = [
      {
        id: 'rl1',
          title: 'Pizza',
          image: 'https://media-cdn.tripadvisor.com/media/photo-s/15/c5/a4/14/pepperoni-lovers.jpg',
          ingredients: ['ham', 'tomato', 'mushrooms']
      }
  ];
  constructor() { }

  ngOnInit() {
  }

}
