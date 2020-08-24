import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { Karta } from 'src/app/model/karta';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  header : string[];

  historyResult : Karta[];

  constructor(private flightService : FlightService, private toast : ToastrService) { }

  ngOnInit(): void {
    this.header = ["Broj karte", "Cena", "Broj leta", "Aviokompanija", "Datum leta", "Polazni aerodrom", "Dolazni aerodrom"];

    this.flightService.getHistoryData().subscribe(data => this.historyResult = data);
  }

}
