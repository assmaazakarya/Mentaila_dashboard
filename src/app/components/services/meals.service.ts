import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, IMeal } from '../../DataTypes/meals';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private mealSubject: BehaviorSubject<IMeal[]> = new BehaviorSubject<IMeal[]>([]);
  public meals$: Observable<IMeal[]> = this.mealSubject.asObservable();
  private apiurl = "http://localhost:3000";

  constructor(private http: HttpClient) {
    this.getAllMeals().subscribe({
      next: (response) => {
        if (response.items) {
          this.mealSubject.next(response.items);
        }
      },
    });
  }

  getAllMeals(): Observable<ApiResponse<IMeal[]>> {
    return this.http.get<ApiResponse<IMeal[]>>(this.apiurl + "/meals/get-all");
  }

  getMeal(id: string): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(this.apiurl + "/meals/getItemById/" + id)
  }

  createMeal(meal: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiurl + "/meals/add-item/", meal);
  }
  updateMeal(id: string, meal: any) {
    return this.http.patch<ApiResponse<any>>(this.apiurl + "/meals/edit-item/" + id, meal)
  }

  deleteMeal(id: string): Observable<ApiResponse<IMeal>> {
    return this.http.delete<ApiResponse<IMeal>>(this.apiurl + "/meals/delete-item/" + id)
  }


}
