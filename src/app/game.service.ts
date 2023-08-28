import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpSvc:HttpClient) { }
  BACKEND_API_URL="http://localhost:8080/games"

  getGames(limit:number,offset:number):Observable<Game[]>{
    const param = new HttpParams()
    .set("limit",limit)
    .set("offset",offset);

    const headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*');
  

  return this.httpSvc
        .get<Game[]>(this.BACKEND_API_URL, { params: param, headers: headers });
  }

  
}
