
import {Component, OnInit} from "@angular/core";
import {FlightsService} from "../Services/flights-service";
import {Flights} from "../Models/Flights";
import {HttpClient} from "../Services/http-client.service";
@Component({
  moduleId:module.id,
  templateUrl:'flights-search.component.html',
  styleUrls:['flights-search.component.css'],
  providers:[FlightsService, HttpClient]
})
export class FlightsSearchComponent implements OnInit {
  flights: Flights[];

  constructor(private flightsService: FlightsService) {
  }

  ngOnInit() {
    this.flightsService.getFlights('MEI', 'LHR', '2012-12-24T00:00:00+11:00', '2013-01- 03T00:00:00+11:00').subscribe(flights => {
      this.flights = flights;
    });
  }


}
