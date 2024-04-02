import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse, IOrder } from '../../DataTypes/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderSubject: BehaviorSubject<IOrder[]> = new BehaviorSubject<any>([]);
  public orders$: Observable<IOrder[]> = this.orderSubject.asObservable();
  OriginalPath = "http://localhost:3000/api/orders";

  constructor(private Http: HttpClient) {
    this.getAllOrders().subscribe({
      next: (response) => {
        if (response.data) {
          // Assuming response.data is already of type IOrder[]
          this.orderSubject.next(response.data);
        }
      },
    });
  }
  
  
  getAllOrders(): Observable<ApiResponse<IOrder[]>>{
    return this.Http.get<ApiResponse<IOrder[]>>(this.OriginalPath + "/");
  }
  deleteOrder(id: string): Observable<any> {
    return this.Http.delete(this.OriginalPath + "/" + id, { responseType: 'text' })
  }
  editOrder(id: string , orderData : any): Observable<any> {
    return this.Http.put(this.OriginalPath + "/" + id, orderData , { responseType: 'text' })
  }
  getMonthlyEarning(): Observable<any>{
    return this.Http.get<any>(this.OriginalPath + "/total-monthly-sales");
  }
  getYearlyEarning(): Observable<any>{
    return this.Http.get<any>(this.OriginalPath + "/total-yearly-sales");
  }
  getDailyEarning(): Observable<any>{
    return this.Http.get<any>(this.OriginalPath + "/total-daily-sales");
  }
}
