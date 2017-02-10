import {Component, OnInit} from "@angular/core";
import {FlightSearchParams} from "../Models/FlightSearchParams";
import {NgForm, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {IMyOptions, IMyDateModel} from "mydatepicker";
import moment = require("moment");
import {Router} from "@angular/router";
import Moment = moment.Moment;
import {FlightDate} from "../Models/FlightDate";
import {Config} from "../Common/Config";

@Component({
  moduleId: module.id,
  templateUrl: 'flights.component.html',
  styleUrls: ['flights.component.css'],
  providers: [FormBuilder]
})
export class FlightsComponent implements OnInit {

  private readonly dateFormat: string = 'dd/mm/yyyy';
  private readonly airportCodePattern: string = '^[a-zA-Z0-9]+$';
  private readonly flightSearchComponentRoute: string = '/flights-search'
  private inputForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    let today: FlightDate = new FlightDate(moment());
    let yesterday: FlightDate = new FlightDate(moment().subtract(1, 'day'));
    let tomorrow: FlightDate = new FlightDate(moment().add(1, 'day'));

    this.inputForm = this.formBuilder.group({
      DepartureAirportCode: ['', [Validators.required, Validators.pattern(this.airportCodePattern)]],
      ArrivalAirportCode: ['', [Validators.required, Validators.pattern(this.airportCodePattern)]],
      DepartureDate: [{date: today}, Validators.required],
      ReturnDate: [{date: tomorrow}, Validators.required]
    });

    this.departureDatePickerOptions = this.disableUntil(yesterday, this.departureDatePickerOptions);
    this.returnDatePickerOptions = this.disableUntil(yesterday, this.returnDatePickerOptions);
  }

  submitForm(inputForm: NgForm): void {
    this.markAllDiry(inputForm); //mark all inputs dirty to show error

    if (inputForm && inputForm.valid) {
      let flightSearchParams:FlightSearchParams = inputForm.value;
      this.router.navigate([this.flightSearchComponentRoute,
        flightSearchParams.DepartureAirportCode,
        flightSearchParams.ArrivalAirportCode,
        moment(flightSearchParams.DepartureDate.jsdate).format(),
        moment(flightSearchParams.ReturnDate.jsdate).format()]);
    }
  }

  onDepartureDateChanged(event: IMyDateModel) {
    this.returnDatePickerOptions = this.disableUntil(new FlightDate(moment(event.jsdate).subtract(1, 'day')), this.returnDatePickerOptions);

    if (moment(event.jsdate).isAfter(moment(this.inputForm.controls[Config.RETURN_DATE].value.jsdate))) {
      this.inputForm.controls[Config.RETURN_DATE].setValue({date: new FlightDate(moment(event.jsdate))});
    }
  }

  private departureDatePickerOptions: IMyOptions = {
    dateFormat: this.dateFormat,
    indicateInvalidDate: false
  };

  private returnDatePickerOptions: IMyOptions = {
    dateFormat: this.dateFormat,
    indicateInvalidDate: false
  };

  private disableUntil(date: FlightDate, datePickerOptions: IMyOptions): IMyOptions {
    let copy = JSON.parse(JSON.stringify(datePickerOptions));
    copy.disableUntil = date;
    return copy;
  }

  private markAllDiry(inputForm: NgForm) {
    if (inputForm) {
      for (var key in inputForm.controls) {
        if (inputForm.controls.hasOwnProperty(key)) {
          inputForm.controls[key].markAsDirty();
        }
      }
    }
  }

  get diagnostic() {
    return JSON.stringify(this.inputForm.value);
  }
}


