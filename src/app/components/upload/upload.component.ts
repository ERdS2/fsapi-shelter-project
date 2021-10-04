import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpServiceService } from 'src/app/service/http-service.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

petRegisterForm: FormGroup;
savePetSubscription: Subscription = new Subscription

  constructor(private httpService: HttpServiceService, private router: Router) {
    this.petRegisterForm = new FormGroup ({
      name : new FormControl('', [Validators.required, Validators.pattern(/^[a-zéáűőúóíüöA-ZÉÁŰÚŐÍÖÜÓ\D+]{6,}\w$/)]),
      age : new FormControl('', Validators.required),
      breed : new FormControl('', Validators.required),
      sex : new FormControl('',Validators.required),
      color : new FormControl('',Validators.required),
      story : new FormControl('',Validators.required),
      image : new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
  }

  savePet = () => {
    const newPet = this.petRegisterForm.value;
    if(newPet.breed === "Macska"){
      newPet.breed = "cat"
    }else{
      newPet.breed = "dog"
    }
    const observable = this.httpService.savePet(newPet)
    this.savePetSubscription = observable.subscribe(
      (resp) => console.log(resp),
      (err) => console.log(err),
      () => this.petRegisterForm.reset()
    );
}

ngOnDestroy(){
  if(this.savePetSubscription) this.savePetSubscription.unsubscribe()
}
}
