import {NgForm} from "@angular/forms";
export class FlightSearchInputErrors {

  private _departureAirportCodeRequired: boolean
  private _departureAirportCodePattern: boolean
  private _arrivalAirportCodeRequired: boolean
  private _arrivalAirportCodePattern: boolean
  private _departureDateRequired: boolean
  private _returnDateRequired: boolean


  constructor(forms: NgForm) {
    this._departureAirportCodeRequired = forms.controls['DepartureAirportCode'].hasError('required');
    this._departureAirportCodePattern = forms.controls['DepartureAirportCode'].hasError('pattern');
    this._arrivalAirportCodeRequired = forms.controls['ArrivalAirportCode'].hasError('required');
    this._arrivalAirportCodePattern = forms.controls['ArrivalAirportCode'].hasError('pattern');
    this._departureDateRequired = forms.controls['DepartureDate'].hasError('required');
    this._returnDateRequired = forms.controls['ReturnDate'].hasError('required');
  }

  get departureAirportCodeRequired(): boolean{return this._departureAirportCodeRequired;}
  get departureAirportCodePattern(): boolean{return this._departureAirportCodePattern;}
  get arrivalAirportCodeRequired(): boolean{return this._arrivalAirportCodeRequired;}
  get arrivalAirportCodePattern(): boolean{return this._arrivalAirportCodePattern;}
  get departureDateRequired(): boolean{return this._departureDateRequired;}
  get returnDateRequired(): boolean{return this._returnDateRequired;}

}
