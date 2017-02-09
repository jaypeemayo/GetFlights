
import {Component} from "@angular/core";
import {FlightSearchParams} from "../Models/FlightSearchParams";
import {NgForm} from "@angular/forms";
import {IMyOptions} from "mydatepicker";
import moment = require("moment");
import {FlightSearchInputErrors} from "../Models/FlightSearchInputErrors";
@Component({
  moduleId:module.id,
  templateUrl:'flights.component.html',
  styleUrls:['flights.component.css']
})
export class FlightsComponent {
  flightSearchParams: FlightSearchParams;
  isValidSubmit: boolean;
  flightSearchInputErrors:FlightSearchInputErrors
  constructor() {
    this.flightSearchParams = new FlightSearchParams();
    this.flightSearchInputErrors = null;
  }

  submitForm(form:NgForm): void {

    this.flightSearchInputErrors = new FlightSearchInputErrors(form);

    if (form.valid) {
      alert( moment( this.flightSearchParams.ReturnDate.jsdate).format());
      this.isValidSubmit = true;
    }
    else
    {
      this.isValidSubmit = false;
    }
  }

  get diagnostic() { return JSON.stringify(this.flightSearchParams); }


  private myDatePickerOptions: IMyOptions = {
    dateFormat: 'dd/mm/yyyy'
  };

}

