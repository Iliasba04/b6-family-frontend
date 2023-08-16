import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private http : HttpClient) { }

  getDashboardDatas(){
    return this.http.get<any>(`${environment.backendUri}/dashboard/dashboardDatas`)
      .pipe(
        tap( res => res = res),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }
}
