import { Injectable } from '@angular/core';
import { ApiResponse, ICoach } from '../../DataTypes/coach';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  // private coachSubject: BehaviorSubject<ICoach[]> = new BehaviorSubject<any>([]);
  // public users$: Observable<ICoach[]> = this.coachSubject.asObservable();
  OriginalPath = "http://localhost:3000";

  constructor(
    private Http: HttpClient,
  ) {
    // this.getAllCoaches().subscribe({
    //   next: (response) => {
    //     if (response.data) {
    //       this.coachSubject.next(response.data);
    //     }
    //   },
    // });
  }

  createCoach(userData: any): Observable<any> {
    return this.Http.post (this.OriginalPath + "/coach/createCoach", userData);
  }
  getAllCoaches(): Observable<any> {
    return this.Http.get (this.OriginalPath + "/coach/getAllCoaches" );
  }
  deleteCoach(id: string): Observable<any> {
    return this.Http.delete(this.OriginalPath + "/coach/deleteCoach/" + id , { responseType: 'text' })
  }
  editCoach(id: string, coach: any): Observable<any> {
    return this.Http.patch(this.OriginalPath + "/coach/edit/" + id, coach, { responseType: 'text' })
  }

}
