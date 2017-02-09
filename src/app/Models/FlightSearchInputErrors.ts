import {NgForm} from "@angular/forms";
import {Config} from "../Common/Config";
export class FlightSearchInputErrors {

  private _departureAirportCodeRequired: boolean = false;
  private _departureAirportCodePattern: boolean = false;
  private _arrivalAirportCodeRequired: boolean = false;
  private _arrivalAirportCodePattern: boolean = false;
  private _departureDateRequired: boolean = false;
  private _returnDateRequired: boolean = false;


  constructor(forms: NgForm) {
    if (forms) {
      this._departureAirportCodeRequired = forms.controls[Config.DEPARTURE_AIRPORT_CODE].hasError('required');
      this._departureAirportCodePattern = forms.controls[Config.DEPARTURE_AIRPORT_CODE].hasError('pattern');
      this._arrivalAirportCodeRequired = forms.controls[Config.ARRIVAL_AIRPORT_CODE].hasError('required');
      this._arrivalAirportCodePattern = forms.controls[Config.ARRIVAL_AIRPORT_CODE].hasError('pattern');
      this._departureDateRequired = forms.controls[Config.DEPARTURE_DATE].hasError('required');
      this._returnDateRequired = forms.controls[Config.RETURN_DATE].hasError('required');
    }
  }

  get departureAirportCodeRequired(): boolean {
    return this._departureAirportCodeRequired;
  }

  get departureAirportCodePattern(): boolean {
    return this._departureAirportCodePattern;
  }

  get arrivalAirportCodeRequired(): boolean {
    return this._arrivalAirportCodeRequired;
  }

  get arrivalAirportCodePattern(): boolean {
    return this._arrivalAirportCodePattern;
  }

  get departureDateRequired(): boolean {
    return this._departureDateRequired;
  }

  get returnDateRequired(): boolean {
    return this._returnDateRequired;
  }

  get departureAirportCodeHasError(): boolean {
    return this._departureAirportCodeRequired || this._departureAirportCodePattern;
  }
  get arrivalAirportCodeHasError(): boolean {
    return this._arrivalAirportCodeRequired || this._arrivalAirportCodePattern;
  }
  get departureDateHasError(): boolean {
    return this._departureDateRequired;
  }
  get returnDateHasError(): boolean {
    return this._returnDateRequired;
  }
}
