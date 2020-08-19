import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/model/flight';
import { FlightService } from 'src/app/services/flight.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Init } from 'src/app/model/init';
import { Klasa } from 'src/app/model/klasa';
import { Airport } from 'src/app/model/airport';
import { DatePipe } from '@angular/common';
import { Detailflight } from 'src/app/model/detailflight';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-showflights',
  templateUrl: './showflights.component.html',
  styleUrls: ['./showflights.component.css']
})
export class ShowflightsComponent implements OnInit {
  public lets : Flight[];
  public povratniLets : Flight[];

  public header : string[];
  public headerModal : string[];

  polazniAer : Airport;
  dolazniAer : Airport;

  public usluge : string = "";
  public sedista : string;

  public detailFlight : Detailflight = new Detailflight();

  constructor(private flightService : FlightService, private toast : ToastrService) { 
    this.header = [
      "Broj leta", "Aviokompanija", "Datum letenja", "Prikaži detalje"
    ];

    this.headerModal = [
      "Klasa", "Usluge na letu", "Dostupna sedišta", "Cena"
    ];
  }

  ngOnInit(): void {

   this.lets = Init.getLets();
   if(Init.getPovratniLets() != null){
     this.povratniLets = Init.getPovratniLets();
   }
   
  }

  showDetails(idLet : number){
    this.flightService.flightDetails(idLet).subscribe(data => {
      this.detailFlight = data;

      this.detailFlight.usluge.forEach(element => {
        this.usluge += element.nazivUsluge + ", "
      });

      this.detailFlight.sedista.forEach(element => {
        this.sedista += element.redniBroj + ", "
      });

    }, err => {
      this.toast.error("Došlo je do greške prilikom prikazivanja podataka!", "Greška");
    });
  }

}
