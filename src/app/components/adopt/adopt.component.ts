import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdoptService } from 'src/app/service/adopt.service';
import { AuthService } from 'src/app/service/auth.service';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent implements OnInit, OnDestroy {
  
  BASE_URL = environment.apiUrl;
  pet: any = [];
  disabled = true;

  adoptSubscription: Subscription = new Subscription;

  userSubscription: Subscription = new Subscription;
  userObject: any;

  constructor(private adoptService: AdoptService, private httpService : HttpServiceService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.adoptService.pet.subscribe(
      (data) => { this.pet = data },
      (err) => { console.log(err) },
      () => { }
    );
    this.userSubscription = this.authService.getuserLoggedInObj().subscribe(
      data => this.userObject = data
    )
  }

 isChecked(){
  this.disabled = !this.disabled;

  }

  adopt = (petToAdopt: any) => {
    const observable = this.httpService.adopt(petToAdopt)
    this.adoptSubscription = observable.subscribe(
      (resp) => {},
      (err) => console.log(err),
      () => {}
      );
  }

  ngOnDestroy(){
    if(this.adoptSubscription) this.adoptSubscription.unsubscribe();
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

}
