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
          title: 'reciepe1',
          image: 'https://www.google.com/maps/uv?hl=en&pb=!1s0x4888469e24fb9069:0xd3cdc763958f30a!3m1!7e115!4shttps://lh5.googleusercontent.com/p/AF1QipOfIO7qWuTnMWFcKjPbEajbVXyi_X9yr2gYjIRW%3Dw260-h160-k-no!5smozza+-+Google+Search&imagekey=!1e10!2sAF1QipOfIO7qWuTnMWFcKjPbEajbVXyi_X9yr2gYjIRW&sa=X&ved=2ahUKEwjhlZXDoeDlAhXNShUIHeP3C8gQoiowE3oECA8QBg',
          ingredients: ['one', 'two', 'three']
      }
  ];
  constructor() { }

  ngOnInit() {
  }

}
