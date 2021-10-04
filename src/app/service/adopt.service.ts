import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptService {
 
  pet:BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

}
