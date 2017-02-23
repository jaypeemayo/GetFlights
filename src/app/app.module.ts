import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AppRoutingModule} from "./app-routing.module";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FlightsComponent} from "./Components/flights.component";
import {FlightsSearchComponent} from "./Components/flights-search.component";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MyDatePickerModule} from "mydatepicker";
import {HoursMinutesFormatterPipe} from "./Common/hour-minutes-formatter.pipe";

@NgModule({
  imports:      [ NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    MyDatePickerModule,
    ReactiveFormsModule], //for model driven forms
  declarations: [ AppComponent, FlightsComponent, FlightsSearchComponent, HoursMinutesFormatterPipe],
  bootstrap:    [ AppComponent ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]//to prevent error when refreshed.
})
export class AppModule {
}
