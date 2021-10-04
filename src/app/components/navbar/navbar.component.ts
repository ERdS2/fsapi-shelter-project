import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userObject:any;
  userSignInSubcription: Subscription = new Subscription;
  refreshUserAuthSubcription: Subscription = new Subscription;
  userLogoutSubscription: Subscription = new Subscription;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {

    if(localStorage.getItem('refreshToken')){
      this.refreshUserAuthSubcription = this.authService.refreshUserAuth().subscribe();
    }

    this.userSignInSubcription = this.authService.getuserLoggedInObj().subscribe(
      user => this.userObject = user,
      err => console.log(err),
      () => {}
    );

  }
  
  isAdmin(){
    if(this.userObject){
      const isAdmin = this.userObject.role == 'admin' ? true : false;
      return isAdmin;
    }return
  }


  logOut() {
    this.userLogoutSubscription = this.authService.logOut().subscribe(
      () => {},
      (err) => console.log(err),
      () => {
        this.router.navigate([''])
      }
    )
  }

  ngOnDestroy(){
    if(this.refreshUserAuthSubcription) this.refreshUserAuthSubcription.unsubscribe();
    if(this.userSignInSubcription) this.userSignInSubcription.unsubscribe();
    if(this.userLogoutSubscription) this.userLogoutSubscription.unsubscribe();
  }
}