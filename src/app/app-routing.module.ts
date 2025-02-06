import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RecipeAddComponent } from './recipe-add/recipe-add.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent }, // Home page
  { path: 'recipe/:id', component: RecipeDetailComponent }, // Recipe detail page
  { path: 'add-recipe', component: RecipeAddComponent },
  { path: 'edit/:id', component: RecipeFormComponent },
  { path: '**', component: NotFoundComponent }, // 404 page];
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
