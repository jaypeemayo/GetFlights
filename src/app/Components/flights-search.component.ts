
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
  private flights: Flights[];
  private filteredFlights: Flights[];
  private searchText:string;
  private isLoading:boolean =false;
  private byAirlineName:boolean = true;
  private byInboundFlightsDuration:boolean= true;
  private byOutboundFlightsDuration:boolean= true;
  private byTotalAmount:boolean= true;

  constructor(private route: ActivatedRoute,
              private flightsService: FlightsService) {
  }

  onSearchCriteriaChange() {
    if (this.flights) {
      if (!this.searchText || this.searchText.trim() == "") {
        this.filteredFlights = this.flights;
      }
      else {
        let cleanedSearchText: string = this.searchText.trim().toUpperCase();
        this.filteredFlights = this.flights.filter(flights =>
          (this.byAirlineName && flights.AirlineName.toUpperCase().indexOf(cleanedSearchText) >= 0) ||
          (this.byInboundFlightsDuration && flights.InboundFlightsDuration.toUpperCase().indexOf(cleanedSearchText) >= 0) ||
          (this.byOutboundFlightsDuration && flights.OutboundFlightsDuration.toUpperCase().indexOf(cleanedSearchText) >= 0) ||
          (this.byTotalAmount && flights.TotalAmount.toString().indexOf(cleanedSearchText) >= 0)
        )
      }
    }
  }

  ngOnInit() {


    this.route.params.subscribe(params => {

      let departureAirportCode = params[Config.DEPARTURE_AIRPORT_CODE];// get id from route
      let arrivalAirportCode = params[Config.ARRIVAL_AIRPORT_CODE];// get id from route
      let departureDate = params[Config.DEPARTURE_DATE];// get id from route
      let returnDate = params[Config.RETURN_DATE];// get id from route

      this.isLoading=true;
      this.flightsService.getFlights(departureAirportCode,
        arrivalAirportCode,
        departureDate,
        returnDate).subscribe(flights => {
        this.flights = flights;
        this.onSearchCriteriaChange();
        this.isLoading=false;
      }, error=>{
        this.isLoading=false;
      });
    })
  }
}
