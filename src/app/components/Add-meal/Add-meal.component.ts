import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealsService } from '../services/meals.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./Add-meal.component.css'],
})
export class AddMealComponent implements OnInit {
  addForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private mealService: MealsService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [null] // Add imageFile field for file upload
    });
  }

  ngOnInit() { }

  onSubmit(): void {
    if (this.addForm.valid) {
      const formData = this.prepareFormData();
      this.mealService.createMeal(formData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/meals']);
          this.toast.success('Meal added successfully');
        },
        (error) => {
          console.error('Error:', error);
          this.toast.error('Failed to add meal. Please try again later.');
        }
      );
    } else {
      this.toast.error('Please fill in all required fields.');
    }
  }

  handleFileSelection(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.addForm.patchValue({ imageFile: file });
    }
  }

  private prepareFormData(): FormData {
    const formData = new FormData();
    formData.append('title', this.addForm.get('title')!.value);
    formData.append('category', this.addForm.get('category')!.value);
    formData.append('price', this.addForm.get('price')!.value);
    formData.append('description', this.addForm.get('description')!.value);
    formData.append('imageFile', this.addForm.get('imageFile')!.value);
    return formData;
  }
}
