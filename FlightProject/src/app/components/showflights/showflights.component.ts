import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/model/flight';
import { FlightService } from 'src/app/services/flight.service';
import { HomepageComponent } from '../homepage/homepage.component';
import { Init } from 'src/app/model/init';
import { Klasa } from 'src/app/model/klasa';

@Component({
  selector: 'app-showflights',
  templateUrl: './showflights.component.html',
  styleUrls: ['./showflights.component.css']
})
export class ShowflightsComponent implements OnInit {
  public lets : Flight[];
  public klasas : Klasa[];

  constructor(private flightService : FlightService) { }

  ngOnInit(): void {

   this.lets = Init.getLets();
   
  }

}
