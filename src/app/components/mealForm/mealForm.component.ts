import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MealsService } from '../services/meals.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mealForm',
  templateUrl: './mealForm.component.html',
  styleUrls: ['./mealForm.component.css'],
})
export class MealFormComponent implements OnInit, OnChanges {
  @Input() data: any | null = null;
  @Output() mealUpdated: EventEmitter<void> = new EventEmitter<void>();
  oldImage: string = "";
  mealForm: FormGroup;
  finalData: FormData | undefined;

  constructor(private fb: FormBuilder,
    private mealService: MealsService,
    private toast: ToastrService,
    private router: Router
  ) {

    this.mealForm = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      imageFile: [''] // Add imageFile control to handle image updates
    });
  }

  ngOnInit() {
    this.patchFormWithData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this['data']) {
      this.patchFormWithData();
      this.oldImage = this.data.imageFile;
    }
  }

  onSubmit() {
    if (this.mealForm.valid) {
      this.prepareFormData();
      this.updateMeal();
    } else {
      this.toast.error('Please fill in all required fields.');
    }
  }

  handleFileSelection(event: any) {
    const file = event.target.files[0];
    this.mealForm.get('imageFile')!.setValue(file); // Update the imageFile control with the selected file
  }

  private prepareFormData() {
    this.finalData = new FormData();
    this.finalData.append('title', this.mealForm.get('title')!.value);
    this.finalData.append('category', this.mealForm.get('category')!.value);
    this.finalData.append('price', this.mealForm.get('price')!.value);
    this.finalData.append('description', this.mealForm.get('description')!.value);
    this.finalData.append('imageFile', this.mealForm.get('imageFile')!.value); // Append the imageFile to finalData
  }

  private updateMeal() {
    if (this.data) {
      this.mealService.updateMeal(this.data._id as string, this.finalData!).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/meals');
          this.toast.success('Meal updated successfully.');
          this.mealUpdated.emit();
          this.resetForm();
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });
    }
  }

  private resetForm() {
    this.mealForm.reset({
      title: '',
      category: '',
      price: '0',
      description: '',
      imageFile: '' // Reset the imageFile control
    });
  }

  private patchFormWithData() {
    if (this.data) {
      this.mealForm.patchValue({
        title: this.data.title,
        category: this.data.category,
        price: this.data.price,
        description: this.data.description,
        imageFile: '' // Initialize imageFile control with empty value
      });
      this.oldImage = this.data.imageFile;
    }
  }
}
