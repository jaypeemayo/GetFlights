import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlightsSearchComponent} from "./Components/flights-search.component";
import {FlightsComponent} from "./Components/flights.component";
// import {HomeComponent} from "./Components/home.component";
// import {MovieDetailsComponent} from "./Components/movie-details.component";
// import {CheapestMoviesComponent} from "./Components/cheapest-movies.component";

const routes: Routes =
  [
    {
      path: 'flights',
      component:FlightsComponent
    },
    {
      path: 'flights-search/:departureAirportCode/:arrivalAirportCode/:departureDate/:returnDate',
      component: FlightsSearchComponent
    },
    {
      path: '',
      redirectTo: '/flights',
      pathMatch: 'full'
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule {
}
