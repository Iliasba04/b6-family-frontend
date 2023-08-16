import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateDue } from '../model/createDue.interface';

@Injectable({
  providedIn: 'root'
})
export class DuesService {

  constructor(private http: HttpClient) { }

   // Register
  createDue(due:ICreateDue){
    return this.http.post<ICreateDue>(`${environment.backendUri}/dues/create`, due)
      .pipe(
        tap( (res) => res = res)
      )
  }
  getAllDues(){
    return this.http.get<any>(`${environment.backendUri}/dues/allDues`)
      .pipe(
        tap( res => res = res),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }

  getAllDuesByContributor(contributorId:string){
    return this.http.get<any>(`${environment.backendUri}/dues/contributor/${contributorId}`)
      .pipe(
        tap( res => res = res),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }

  countDues(contributorId:string){
    return this.http.get<any>(`${environment.backendUri}/dashboard/dashboardDatas/${contributorId}`)
      .pipe(
        tap( res => res = res),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }
  updateDue(body:any, dueId:string){
    return this.http.patch(`${environment.backendUri}/dues/updateDue/${dueId}`, body)
      .pipe(
        tap( res => res = res),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }
}
