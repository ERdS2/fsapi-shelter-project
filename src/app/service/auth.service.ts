import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoggedInUser } from '../model/logged-in-user';
import { UserLogin } from '../model/user-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedInObject: BehaviorSubject<any> = new BehaviorSubject(null);
  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(UserData: UserLogin): Observable<LoggedInUser> {
    return this.http.post<LoggedInUser>(this.BASE_URL + 'login', UserData)
      .pipe(
        tap(
          loginData => {
            if (loginData) {
              localStorage.setItem('accessToken', loginData.accessToken);
              localStorage.setItem('refreshToken', loginData.refreshToken);
              this.userLoggedInObject.next({
                email: loginData.email,
                _id: loginData._id,
                role: loginData.role
              })
            }
          }, err => {
            console.error(err);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            this.userLoggedInObject.next(null)
          }
        )
      )
  }

   refreshUserAuth():Observable<any>{
    return this.http.post<any>(this.BASE_URL+'refresh', {token: localStorage.getItem('refreshToken')})
    .pipe(
      tap(res => {
        if(res){
          localStorage.setItem('accessToken', res.accessToken);
          this.userLoggedInObject.next(
            res.userData
          )
        }
      }, err => {
        console.error(err);
        localStorage.removeItem('accessToken');
           localStorage.removeItem('refreshToken');
           this.userLoggedInObject.next(null)
      })
    )
  }

  logOut(){
    const token= {
      token: localStorage.getItem('refreshToken')
    }
    return this.http.post(this.BASE_URL+'logout', token)
    .pipe(
      tap(
        resp=> {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.userLoggedInObject.next(null);
        },
        err => {
          console.error(err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.userLoggedInObject.next(null);
        }
      )
    )
  }

  getuserLoggedInObj() {
    return this.userLoggedInObject.asObservable()
  }

  getUserAuthData(){
    return this.userLoggedInObject.value;
  }
}
