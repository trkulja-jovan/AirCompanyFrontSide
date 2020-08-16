import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FlightService } from 'src/app/services/flight.service';
import { Airport } from 'src/app/model/airport';
import { SearchFlight } from 'src/app/model/search-flight';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Flight } from 'src/app/model/flight';
import { element } from 'protractor';
import { Init } from 'src/app/model/init';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  airports : Airport[];
  classes : string[];
  children : number[];
  adult : number[];

  searchRes : SearchFlight;

  isFormValid : boolean;

  todayDate :  Date = new Date();
  dateReceived : Date;
  dateSent : any;

  tipPutovanja : number;

  constructor(private service : UserService, 
              private flightS : FlightService, 
              private toast : ToastrService,
              private router : Router,
              private datePipe: DatePipe) { 
    this.toast.toastrConfig.timeOut = 1000;
  }

  ngOnInit(): void {
    this.searchRes = SearchFlight.createDefaultValues();
    this.classes = ["Ekonomska klasa", "Biznis klasa", "Prva klasa"];
    this.children = [0,1,2,3,4];
    this.adult = [1,2,3,4];
    this.flightS.getAllAirports().subscribe(data => this.airports = data);
  }

  searchFlight() {

    var d1 = this.datePipe.transform(this.searchRes.datumPolaska, "yyyy-MM-dd");
    var d2 = this.datePipe.transform(this.searchRes.datumPovratka, "yyyy-MM-dd");

    this.searchRes.datumPolaska = new Date(d1);
    this.searchRes.datumPovratka = new Date(d2);

    console.log("Polazni aerodrom : " + this.searchRes.idAerodromOd 
              + "Dolazni aerodrom: " + this.searchRes.idAerodromDo); 

    if(this.tipPutovanja == 2){
      this.flightS.searchReturnFlights(this.searchRes).subscribe(data => {
        Init.setPovratniLets(data);
      });
    }
    
    this.flightS.searchFlight(this.searchRes).subscribe(data => {
      Init.setLets(data);

      this.router.navigateByUrl("/flights");
    });
    
  }

  onItemChange(value, broj : number){
    this.tipPutovanja = broj;
  }

  selectChangeHandler(event, x : number){
   if(this.flightS.checkCorrectAirports(event, x)){
      this.toast.error(
      "Polazni i dolazni aerodrom ne mogu biti isti!", "Greška");
   }
    
  }

  onDateChange(){
    this.dateSent=new Date(this.searchRes.datumPolaska).getFullYear()+'-'+('0' + new Date(this.dateSent).getMonth()).slice(-2)+'-'+('0' + new Date(this.dateSent).getDate()).slice(-2);
     
    this.dateReceived=this.dateSent
  }




}
