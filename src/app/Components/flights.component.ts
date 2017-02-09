
import {Component, OnInit} from "@angular/core";
import {FlightSearchParams} from "../Models/FlightSearchParams";
import {NgForm} from "@angular/forms";
import {IMyOptions, IMyDateModel} from "mydatepicker";
import moment = require("moment");
import {FlightSearchInputErrors} from "../Models/FlightSearchInputErrors";
import {Router} from "@angular/router";
@Component({
  moduleId:module.id,
  templateUrl:'flights.component.html',
  styleUrls:['flights.component.css']
})
export class FlightsComponent implements OnInit{
  private readonly dateFormat:string = 'dd/mm/yyyy';
  flightSearchParams: FlightSearchParams;
  flightSearchInputErrors:FlightSearchInputErrors;

  ngOnInit()
  {
    this.disableUntil(moment().subtract(1,'day').toDate(), this.departureDatePickerOptions);
  }
  constructor(private router: Router) {
    this.flightSearchParams = new FlightSearchParams();
    this.flightSearchInputErrors = null;

  }
  // path: 'flights-search/:departureAirportCode/:arrivalAirportCode/:departureDate/:returnDate',
  submitForm(form:NgForm): void {
    this.flightSearchInputErrors = new FlightSearchInputErrors(form);
    if (form.valid) {
      this.router.navigate(['/flights-search', this.flightSearchParams.DepartureAirportCode,
        this.flightSearchParams.ArrivalAirportCode,
        moment(this.flightSearchParams.DepartureDate.jsdate).format(),
        moment(this.flightSearchParams.ReturnDate.jsdate).format()]);


    }
  }

  get diagnostic() { return JSON.stringify(this.flightSearchParams); }
  onDepartureDateChanged(event: IMyDateModel){
    this.disableUntil(moment( event.jsdate).subtract(1,'day').toDate(), this.returnDatePickerOptions);

  }

  onReturnDateChanged(event: IMyDateModel){

  }

  private departureDatePickerOptions: IMyOptions = {
    dateFormat: this.dateFormat,
  };

  private returnDatePickerOptions: IMyOptions = {
    dateFormat: this.dateFormat,
  };

  private disableUntil(date: Date, datePickerOptions: IMyOptions) {
    let copy = JSON.parse(JSON.stringify(datePickerOptions));
    copy.disableUntil = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
    datePickerOptions = copy;
  }



}

