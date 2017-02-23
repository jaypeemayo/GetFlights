
import {Injectable} from "@angular/core";
import {HttpClient} from "./http-client.service";
import {Config} from "../Common/Config";
import {URLSearchParams} from "@angular/http";
import {Flights} from "../Models/Flights";
@Injectable()
export class FlightsService
{

  constructor(private httpClient: HttpClient)
  {
  }

  getFlights(departureAirportCode: string,
             arrivalAirportCode:string,
             departureDate:string,
             returnDate:string) {

    let urlSearchParams:URLSearchParams = new URLSearchParams();
    urlSearchParams.set(Config.DEPARTURE_AIRPORT_CODE, departureAirportCode);
    urlSearchParams.set(Config.ARRIVAL_AIRPORT_CODE, arrivalAirportCode);
    urlSearchParams.set(Config.DEPARTURE_DATE, departureDate);
    urlSearchParams.set(Config.RETURN_DATE, returnDate);

    return this.httpClient.get(Config.BASE_URL + Config.FLIGHT_CONTROLLER_NAME,urlSearchParams).map(
      response => {
        return response.json() as Flights[];
      });
  }
}
