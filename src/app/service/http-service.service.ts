import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  BASE_URL = environment.apiUrl

  constructor(private http: HttpClient) { }

  adopt(petToAdopt:any):Observable<any>{
    return this.http.post<any>(this.BASE_URL + 'adoption', petToAdopt)
  }

  savePet(newPet:any):Observable<any>{
    return this.http.post<any>(`http://localhost:3000/pets`, newPet)
  }

  

}
