import { Component } from '@angular/core';
import { MealsService } from '../services/meals.service';
import { IMeal } from '../../DataTypes/meals';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// 
@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {
  meals: IMeal[] = [];
  meal!: any;
  constructor(private mealsService: MealsService,
    private toast: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllMeals();
  }

  getAllMeals() {
    this.mealsService.getAllMeals().subscribe({
      next: (response) => {
        if (response.items) {
          this.meals = response.items;
          console.log(this.meals)
        }
      },
    });
  }


  deleteMeal(id: string) {
    this.mealsService.deleteMeal(id).subscribe({
      next: (response) => {
        // this.meals = response.items;
        this.toast.warning("deleted successfully");
        this.getAllMeals()
      }
    })
  }

  loadMeal(data: any) {
    this.meal = data
    // this.router.navigate(['/mealform'])
  }
  // Clear the meal data when navigating to the meal form to add a new meal
  addMeal() {
    this.meal = null;
    this.router.navigate(['/mealform']);
  }

  getBadgeClass(status: any): Object {
    switch (status) {
      case 'vegan':
        return { 'bg-secondary': true };
      case 'vegetarian':
        return { 'changPrimary': true };
      case 'non-vegetarian':
        return { 'pinkBg': true }; // Use the original color for pending
      default:
        return {}; // Return empty object for unknown states
    }
  }
}

