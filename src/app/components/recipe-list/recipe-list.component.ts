import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];
  searchQuery: string = '';
  showFavoritesOnly: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data.map((recipe: any) => ({
        ...recipe,
        isFavorite: false,
      }));
    });
  }

  toggleFavorite(recipe: any): void {
    recipe.isFavorite = !recipe.isFavorite;
  }
  filteredRecipes(): any[] {
    return this.recipes.filter(
      (recipe) =>
        (!this.showFavoritesOnly || recipe.isFavorite) &&
        (recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recipe.ingredients
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()))
    );
  }

  getImageUrl(id: number): string {
    return this.recipeService.getRecipeImageUrl(id);
  }

  getImagePath(title: string): string {
    const sanitizedTitle = title.toLowerCase().replace(/\s+/g, '_');
    return `assets/images/${sanitizedTitle}.jpg`;
  }
}
