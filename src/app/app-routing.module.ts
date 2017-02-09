import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlightsSearchComponent} from "./Components/flights-search.component";
import {FlightsComponent} from "./Components/flights.component";
import {Config} from "./Common/Config";
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
      path: 'flights-search/:' + Config.DEPARTURE_AIRPORT_CODE + '/:' + Config.ARRIVAL_AIRPORT_CODE + '/:' + Config.DEPARTURE_DATE + '/:' + Config.RETURN_DATE,
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
