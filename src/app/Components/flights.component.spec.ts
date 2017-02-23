
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {FlightsComponent} from "./flights.component";
import {Router} from "@angular/router";
import {RouterStub} from "../Test/RouteStubs";
import {Config} from "../Common/Config";
import {FlightDate} from "../Models/FlightDate";
import moment = require("moment");
import Moment = moment.Moment;
describe('FlightsComponent', function () {
  let de: DebugElement;
  let comp: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightsComponent],
      schemas:      [ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
      providers:[
        {provide:Router, useClass: RouterStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    comp = fixture.componentInstance;
    comp.ngOnInit();

    expect(comp.departureDatePickerOptions.dateFormat).toBe("dd/mm/yyyy");
    expect(comp.returnDatePickerOptions.dateFormat).toBe("dd/mm/yyyy");
    let myMoment:Moment =  moment().subtract(1,'day')
    expect(comp.departureDatePickerOptions.disableUntil.year).toBe(myMoment.year());
    expect(comp.departureDatePickerOptions.disableUntil.day).toBe(myMoment.date());
    expect(comp.departureDatePickerOptions.disableUntil.month).toBe(myMoment.month() + 1);
    expect(comp.returnDatePickerOptions.disableUntil.year).toBe(myMoment.year());
    expect(comp.returnDatePickerOptions.disableUntil.day).toBe(myMoment.date());
    expect(comp.returnDatePickerOptions.disableUntil.month).toBe(myMoment.month() + 1);
  });

  it('should create component', () => expect(comp).toBeDefined() );
  it('should have invalid form after submitting if nothing is set', () => {
    comp.submitForm();
    expect(comp.inputForm.valid).toBe(false);
  });
  it('should have invalid form after submitting ARRIVAL_AIRPORT_CODE is not set', () => {
    comp.inputForm.controls[Config.ARRIVAL_AIRPORT_CODE].setValue("");
    comp.inputForm.controls[Config.DEPARTURE_AIRPORT_CODE].setValue("DEF");
    comp.inputForm.controls[Config.DEPARTURE_DATE].setValue(new FlightDate(moment(Date.now())));
    comp.inputForm.controls[Config.RETURN_DATE].setValue(new FlightDate(moment(Date.now()).add(1,'day')));
    comp.submitForm();
    expect(comp.inputForm.valid).toBe(false);
  });
  it('should have invalid form after submitting DEPARTURE_AIRPORT_CODE is not set', () => {
    comp.inputForm.controls[Config.ARRIVAL_AIRPORT_CODE].setValue("ABC");
    comp.inputForm.controls[Config.DEPARTURE_AIRPORT_CODE].setValue("");
    comp.inputForm.controls[Config.DEPARTURE_DATE].setValue(new FlightDate(moment(Date.now())));
    comp.inputForm.controls[Config.RETURN_DATE].setValue(new FlightDate(moment(Date.now()).add(1,'day')));
    comp.submitForm();
    expect(comp.inputForm.valid).toBe(false);
  });
  it('should have invalid form after submitting DEPARTURE_DATE is not set', () => {
    comp.inputForm.controls[Config.ARRIVAL_AIRPORT_CODE].setValue("ABC");
    comp.inputForm.controls[Config.DEPARTURE_AIRPORT_CODE].setValue("DEF");
    comp.inputForm.controls[Config.DEPARTURE_DATE].setValue("");
    comp.inputForm.controls[Config.RETURN_DATE].setValue(new FlightDate(moment(Date.now()).add(1,'day')));
    comp.submitForm();
    expect(comp.inputForm.valid).toBe(false);
  });
  it('should have invalid form after submitting RETURN_DATE is not set', () => {
    comp.inputForm.controls[Config.ARRIVAL_AIRPORT_CODE].setValue("ABC");
    comp.inputForm.controls[Config.DEPARTURE_AIRPORT_CODE].setValue("DEF");
    comp.inputForm.controls[Config.DEPARTURE_DATE].setValue(new FlightDate(moment(Date.now())));
    comp.inputForm.controls[Config.RETURN_DATE].setValue("");
    comp.submitForm();
    expect(comp.inputForm.valid).toBe(false);
  });
  it('should have valid form after submitting if all entries are valid', inject([Router],(router:Router) =>{
    const spy = spyOn(router,'navigate');

    comp.inputForm.controls[Config.ARRIVAL_AIRPORT_CODE].setValue("ABC");
    comp.inputForm.controls[Config.DEPARTURE_AIRPORT_CODE].setValue("DEF");
    comp.inputForm.controls[Config.DEPARTURE_DATE].setValue(new FlightDate(moment(Date.now())));
    comp.inputForm.controls[Config.RETURN_DATE].setValue(new FlightDate(moment(Date.now()).add(1,'day')));

    comp.submitForm();
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toContain('/flights-search');

  }));
});
