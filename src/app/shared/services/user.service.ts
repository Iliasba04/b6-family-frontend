import { Injectable } from '@angular/core';
import { IUser } from '../model/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { ILoginUser } from '../model/userLogin.interface';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users : BehaviorSubject<IUser[] | null> = new BehaviorSubject<IUser[] | null>(null);
  private _user : BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null);

  constructor(private http: HttpClient) { }

  // Register
  addUser(user:any){
    return this.http.post(`${environment.backendUri}/auth/signup`, user)
            .pipe(
              tap( (res) => res = res)
            )
  }

  // Login user
  logIn(user:ILoginUser){
    return this.http.post(`${environment.backendUri}/auth/login`, user)
        .pipe(
          tap( (res:any) => {
            if (res && res.token) {
              localStorage.setItem('access_token', res.token);
              localStorage.setItem('currentUser', res.userId);
              localStorage.setItem('account', res.role);
              return res; 
            }
          }),
          catchError( err => {
            return throwError( ()=> new Error(err));
          }))
  }

  getAllUsers(){
    return this.http.get<IUser[]>(`${environment.backendUri}/user/allUsers`)
      .pipe(
        tap( (res) => {
          res = res;
          this._users.next(res);
        }),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }
  getUserInfos(){
    return this.http.get<IUser>(`${environment.backendUri}/user/profile`)
      .pipe(
        tap( (res) => {
          res = res;
          this._user.next(res);
        }),
        catchError( err => {
          return throwError ( ()=> new Error(err));
        })
      )
  }
  // update user by admin
  updateUserByAdmin(userId:string, user:any){
    return this.http.patch(`${environment.backendUri}/user/updateUserByAdmin/${userId}`,user)
    .pipe(
      tap( (res) => res = res),
      catchError( err => {
        return throwError ( ()=> new Error(err));
      })
    )
  }

  // update user by admin
  updateUser(user:any, userId:string){
    return this.http.patch(`${environment.backendUri}/user/updateUser/${userId}`,user)
    .pipe(
      tap( (res) => res = res),
      catchError( err => {
        return throwError ( ()=> new Error(err));
      })
    )
  }

  // change user status
  changeUserStatus(userId:string){
    return this.http.patch(`${environment.backendUri}/user/changeUserStatus/${userId}`,{})
    .pipe(
      tap( res => res = res),
      catchError( err => {
        return throwError ( ()=> new Error(err));
      })
    )
  }


  // change password
  // Login user
  changePassword(body:any){
    return this.http.post(`${environment.backendUri}/user/changePassword`, body)
        .pipe(
          tap( (res:any) => {
            res = res;
          }),
          catchError( err => {
            return throwError( ()=> new Error(err));
          }))
  }
  /**
   * Getters for users
   */
  get users$() : Observable<IUser [] | null>{
    return this._users.asObservable();
  }

  /**
   * Getters for user
   */
  get user$() : Observable<IUser | null>{
    return this._user.asObservable();
  }
}
 