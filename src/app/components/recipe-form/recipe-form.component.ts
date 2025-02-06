import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  editForm!: FormGroup;
  recipeId!: number;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      image: [''],
    });

    this.recipeService.getRecipe(this.recipeId).subscribe((recipe) => {
      this.editForm.patchValue({
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        image: recipe.image || '',
      });
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedRecipe = { id: this.recipeId, ...this.editForm.value };
      this.recipeService
        .updateRecipe(this.recipeId, updatedRecipe)
        .subscribe(() => {
          this.router.navigate(['/recipe', this.recipeId]);
        });
    }
  }
}
