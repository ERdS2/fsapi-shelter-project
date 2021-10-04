import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdoptService } from 'src/app/service/adopt.service';
import { AuthService } from 'src/app/service/auth.service';
import { HttpServiceService } from 'src/app/service/http-service.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit, OnDestroy {

  BASE_URL = environment.apiUrl;
  userObject:any;
  userSignInSubcription: Subscription = new Subscription

  pets: any;

  adoptSubscription: Subscription = new Subscription;

  constructor(private http: HttpClient, private httpService: HttpServiceService , private adoptService: AdoptService, private router: Router, private authService: AuthService) {
    const reqUrl = this.BASE_URL + "pets/dog";
    this.http.get(reqUrl).subscribe(
      (resp:any) => {
        this.pets = resp
      },
      (err) => {console.log(err)},
      () => {},
    )
  }

  ngOnInit(): void {
    this.userSignInSubcription = this.authService.getuserLoggedInObj().subscribe(
      user => this.userObject = user
    );
  }

  adoptThePet = (pet: any) => {
    this.adoptService.pet.next(pet);
    if(this.userObject){
      this.router.navigate(["adopt"])
    }else{
      this.router.navigate([""])
    } 
  }

  adopted = (petObj: any) => {
    const observable = this.http.put<any>(this.BASE_URL + 'pets' + '/' + 'adopt' + '/' + petObj.id, petObj);
    this.adoptSubscription = observable.subscribe(
      (resp) => {},
      (err) => console.log(err),
      () => this.router.navigate(['landingPage'])
    )
  }

  ngOnDestroy(){
    if(this.adoptSubscription) this.adoptSubscription.unsubscribe();
  }

}