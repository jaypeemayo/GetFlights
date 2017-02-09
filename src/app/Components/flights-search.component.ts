
import {Component, OnInit} from "@angular/core";
import {FlightsService} from "../Services/flights-service";
import {Flights} from "../Models/Flights";
import {HttpClient} from "../Services/http-client.service";
import {ActivatedRoute} from "@angular/router";
import {Config} from "../Common/Config";
@Component({
  moduleId:module.id,
  templateUrl:'flights-search.component.html',
  styleUrls:['flights-search.component.css'],
  providers:[FlightsService, HttpClient]
})
export class FlightsSearchComponent implements OnInit {
  flights: Flights[];

  constructor(private route: ActivatedRoute,
              private flightsService: FlightsService) {
  }

  ngOnInit() {


    this.route.params.subscribe(params => {

      'flights-search/:departureAirportCode/:arrivalAirportCode/:departureDate/:returnDate'

      let departureAirportCode = params[Config.DEPARTURE_AIRPORT_CODE];// get id from route
      let arrivalAirportCode = params[Config.ARRIVAL_AIRPORT_CODE];// get id from route
      let departureDate = params[Config.DEPARTURE_DATE];// get id from route
      let returnDate = params[Config.RETURN_DATE];// get id from route

      this.flightsService.getFlights(departureAirportCode,
        arrivalAirportCode,
        departureDate,
        returnDate).subscribe(flights => {
        this.flights = flights;
      });
    })
  }
}
