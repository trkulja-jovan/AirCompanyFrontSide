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
import { PreTicket } from 'src/app/model/pre-ticket';
import { UserService } from 'src/app/services/user.service';

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

  public uslugas : string = " | ";
  public sedista : string = "";

  public detailFlight : Detailflight = new Detailflight();
  public tick : PreTicket = new PreTicket();

  constructor(private flightService : FlightService, private toast : ToastrService, private userServ : UserService) { 
    this.header = [
      "Broj leta", "Aviokompanija", "Datum letenja", "Prikaži detalje"
    ];

    this.headerModal = [
      "Klasa", "Usluge na letu", "Dostupna sedišta", "Cena", "Kupovina"
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
      this.uslugas = "";
      this.detailFlight.usluge.forEach(element => {
        this.uslugas += element.nazivUsluge + " | ";
      });

    }, err => {
      this.toast.error("Došlo je do greške prilikom prikazivanja podataka!", "Greška");
    });
  }

  submitTicket() {
    var da = confirm("Da li ste sigurni da želite da rezervišete kartu za izabrani let?");
    if(da){
      this.tick.idLet = this.detailFlight.idLet;
      this.tick.token = this.userServ.token;

      this.flightService.reserveFlight(this.tick).subscribe(data => {
        var brKarte = data;

        this.toast.success("Uspešno ste rezervisali kartu. Broj karte je " + brKarte, "Uspešno");
      }, err => {
        this.toast.error("Došlo je do greške prilikom rezervacije karte!", "Greška");
      });
    }
  }

}
