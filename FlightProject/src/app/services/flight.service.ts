import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Airport } from '../model/airport';
import { Observable } from 'rxjs';
import { SearchFlight } from '../model/search-flight';
import { Flight } from '../model/flight';
import { Detailflight } from '../model/detailflight';
import { PreTicket } from '../model/pre-ticket';
import { UserService } from './user.service';
import { Karta } from '../model/karta';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private airportOd : number;
  private airportDo : number;

  lets : Flight[];

  constructor(private http : HttpClient, private userS : UserService) { }

  getAllAirports() : Observable<Airport[]> {
    
    return this.http.post<Airport[]>("/api/flights/getAirports", "");
  }

  checkCorrectAirports(event, x : number) : boolean {
    if(x == 1){
      this.airportOd = event.target.value;
    } else if(x == 2){
      this.airportDo = event.target.value;
    }

    return this.airportOd == this.airportDo;
      
  }

  searchFlight(body : SearchFlight) : Observable<Flight[]> {
    return this.http.post<Flight[]>("/api/flights/searchFlights", body);
  }

  searchReturnFlights(body : SearchFlight) : Observable<Flight[]> {
    return this.http.post<Flight[]>("/api/flights/searchReturnFlights", body);
  }

  flightDetails(idLet : number) : Observable<Detailflight>{
    return this.http.get<Detailflight>("/api/flights/details/" + idLet);
  }

  reserveFlight(ticket : PreTicket) : Observable<boolean>{
    return this.http.post<boolean>("/api/flights/reserve", ticket);
  }

  getHistoryData() : Observable<Karta[]> {

    return this.http.get<Karta[]>("/api/flights/history/" + this.userS.username);
  }

  checkIn(oznakaLeta : string) : Observable<Boolean> {
    return this.http.get<boolean>("/api/flights/checkIn/" + oznakaLeta);
  }
}
