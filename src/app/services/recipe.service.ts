import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getRecipeImageUrl(id: number): string {
    // Generate image name based on the recipe id
    return `assets/images/recipe${id}.jpg`;
  }

  // Fetch all recipes
  getRecipes() {
    return this.http.get<any[]>('http://localhost:3000/recipes');
  }

  // Fetch a single recipe by ID
  getRecipe(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching recipe:', error);
        return throwError(() => new Error('Recipe not found.'));
      })
    );
  }

  updateRecipe(id: number, updatedRecipe: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedRecipe);
  }

  // Delete a recipe
  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  addRecipe(recipe: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/recipes', recipe);
  }
}
