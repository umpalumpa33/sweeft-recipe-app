import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent implements OnInit {
  recipeForm!: FormGroup;
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.recipeForm.valid || !this.selectedFile) {
      console.log('Form is invalid or no image selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post(
        'https://api.imgbb.com/1/upload?key=4635b4603249b3c9a9590ce7d3cbfd26',
        formData
      )
      .subscribe(
        (response: any) => {
          const imageUrl = response.data.url;
          this.createRecipe(imageUrl);
        },
        (error) => {
          console.error('Image upload failed', error);
        }
      );
  }

  createRecipe(imageUrl: string): void {
    this.recipeService.getRecipes().subscribe((recipes) => {
      const lastId = recipes.reduce(
        (maxId, recipe) => Math.max(maxId, +recipe.id || 0),
        0
      );
      const newId = (lastId + 1).toString();

      const newRecipe = {
        id: newId,
        title: this.recipeForm.value.title,
        description: this.recipeForm.value.description,
        ingredients: this.recipeForm.value.ingredients,
        instructions: this.recipeForm.value.instructions,
        image: imageUrl,
      };

      this.recipeService.addRecipe(newRecipe).subscribe(() => {
        console.log('Recipe successfully added.');
        this.router.navigate(['/']);
      });
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
