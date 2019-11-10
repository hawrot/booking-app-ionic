 import { NgModule } from '@angular/core';
 import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

 const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
      loadChildren: './recipes/recipes.module#RecipesPageModule'
  },
  { path: 'recipe-detail', loadChildren: './recipes/recipe-detail/recipe-detail.module#RecipeDetailPageModule' }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
