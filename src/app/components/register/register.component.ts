import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  saveUserSubscription: Subscription = new Subscription;
  usedEmail = false;

  constructor(private http : HttpClient, private router: Router) { 
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zéáűőúóíüöA-ZÉÁŰÚŐÍÖÜÓ\D+]{6,}\w$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^[a-zéáűőúóíüöA-ZÉÁŰÚŐÍÖÜÓ0-9!?]{8,}$/)]),
      rePassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-zéáűőúóíüöA-ZÉÁŰÚŐÍÖÜÓ0-9!?]{8,}$/)]),
    });
  }

  ngOnInit(): void {
  }

  passwordsAreMatch() {
    return this.registerForm.value.password === this.registerForm.value.rePassword ? false : true;
  }

  saveUser = () => {
    const newUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    const observable = this.http.post<any>("http://localhost:3000/users", newUser)
    this.saveUserSubscription = observable.subscribe(
    (resp) => {},
    (err) => this.usedEmail = true,
    () => this.router.navigate(['/'])
    );
  }

  ngOnDestroy(){
    if(this.saveUserSubscription) this.saveUserSubscription.unsubscribe();
  }
}
