import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  loginForm : FormGroup;
  singInSubscription: Subscription = new Subscription;

  incorrectInputs = false;

  userObject:any;

  constructor(private http : HttpClient, private router : Router, private authService: AuthService) { 
    this.loginForm = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, Validators.email]),
      inputPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  login(){
    const userObject = this.loginForm.value;
    this.singInSubscription = this.authService.login(userObject)
    .subscribe(
      (resp) => {},
      (err) => {
        this.incorrectInputs = true;
        console.log(err)
      },
      () => {
        this.router.navigate(['landingPage'])
      })
    }

    ngOnDestroy(){
      if(this.singInSubscription) this.singInSubscription.unsubscribe();
    }

}
