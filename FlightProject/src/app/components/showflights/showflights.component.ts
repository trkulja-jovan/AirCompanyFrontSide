import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/model/flight';
import { FlightService } from 'src/app/services/flight.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Init } from 'src/app/model/init';
import { Klasa } from 'src/app/model/klasa';
import { Airport } from 'src/app/model/airport';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-showflights',
  templateUrl: './showflights.component.html',
  styleUrls: ['./showflights.component.css']
})
export class ShowflightsComponent implements OnInit {
  public lets : Flight[];
  public povratniLets : Flight[];

  public header : string[];

  polazniAer : Airport;
  dolazniAer : Airport;

  constructor(private flightService : FlightService) { 
    this.header = [
      "Broj leta", "Aviokompanija", "Datum letenja", "Prikaži detalje"
    ];
  }

  ngOnInit(): void {

   this.lets = Init.getLets();
   if(Init.getPovratniLets() != null){
     this.povratniLets = Init.getPovratniLets();
   }
   
  }

  showDetails(idLet : number){
    console.log(idLet);
  }

}
