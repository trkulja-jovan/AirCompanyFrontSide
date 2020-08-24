import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight.service';
import { Karta } from 'src/app/model/karta';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {

  header : string[];
  result : Karta[];

  constructor(private flightS : FlightService, private toast : ToastrService) { }

  ngOnInit(): void {
    this.header = ["Broj karte", "Broj leta", "Datum leta", "Prijava na let"];
    this.flightS.getHistoryData().subscribe(data => this.result = data);
  }

  checkIn(oznakaLeta : string){
    this.flightS.checkIn(oznakaLeta).subscribe(data => {
      if(data){
        this.toast.success("Uspešno ste se prijavili na let " + oznakaLeta);
      } else {
        this.toast.success("Greška prilikom prijave na let " + oznakaLeta);
      }
    });
  }

}
