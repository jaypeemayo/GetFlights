

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {FlightsSearchComponent} from "./flights-search.component";
import {HoursMinutesFormatterPipe} from "../Common/hour-minutes-formatter.pipe";
import {HttpClient} from "../Services/http-client.service";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";
import {Flights} from "../Models/Flights";
import {ActivatedRouteStub, RouterStub} from "../Test/RouteStubs";
import {Router, ActivatedRoute} from "@angular/router";
import {FlightsService} from "../Services/flights-service";
import {Observable} from "rxjs/Rx";

describe('FlightsSearchComponent', function () {
  let de: DebugElement;
  let comp: FlightsSearchComponent;
  let fixture: ComponentFixture<FlightsSearchComponent>;


  let sampleRequest:string ="http://nmflightapi.azurewebsites.net/api/flight";
  let dummyFlights:Flights[] = JSON.parse(`[
  {
    "AirlineLogoAddress": "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif",
    "AirlineName": "China Southern Airlines",
    "InboundFlightsDuration": "24:10",
    "ItineraryId": "",
    "OutboundFlightsDuration": "26:20",
    "Stops": 2,
    "TotalAmount": 2903.84
  },
  {
    "AirlineLogoAddress": "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
    "AirlineName": "Emirates Airline",
    "InboundFlightsDuration": "42:55",
    "ItineraryId": "",
    "OutboundFlightsDuration": "25:40",
    "Stops": 2,
    "TotalAmount": 2954.14
  },
  {
    "AirlineLogoAddress": "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
    "AirlineName": "Emirates Airline",
    "InboundFlightsDuration": "42:55",
    "ItineraryId": "",
    "OutboundFlightsDuration": "27:40",
    "Stops": 2,
    "TotalAmount": 2954.14
  }
]
`) as Flights[];

  beforeEach(async(() => {
     let routerStub:ActivatedRouteStub = new ActivatedRouteStub({'id': sampleRequest });
    TestBed.configureTestingModule({
      declarations: [ FlightsSearchComponent, HoursMinutesFormatterPipe ],
      schemas:      [ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
      providers:[HttpClient,
        MockBackend,
        BaseRequestOptions, //for mocking http
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions] //for mocking http
        },
        {provide:Router, useClass: RouterStub},
        {provide:ActivatedRoute, useValue: routerStub},
         FlightsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsSearchComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );
  it('should have same filteredFlights and flights when search criteria is empty', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights).toEqual(comp.flights)
  });
  it('should contain china flight only if searchText is set to China', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.searchText = "China";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(1);
    let match = comp.filteredFlights.findIndex(o=>o.AirlineName === "China Southern Airlines");
    expect(match).toBe(0);
  });
  it('should contain china flight only if searchText is set to 24:10', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.searchText = "24:10";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(1);
    let match = comp.filteredFlights.findIndex(o=>o.AirlineName === "China Southern Airlines");
    expect(match).toBe(0);
  });
  it('should contain china flight only if searchText is set to 27:40', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.searchText = "27:40";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(1);
    let match = comp.filteredFlights.findIndex(o=>o.AirlineName === "Emirates Airline");
    expect(match).toBe(0);
  });
  it('should contain 2 emirates flights if searchText is set to 2954.14', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.searchText = "2954.14";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(2);

    comp.filteredFlights.forEach(filteredFlight=>{
      expect(filteredFlight.AirlineName).toBe("Emirates Airline");
    });
  });
  it('should contain 0 results if searchText is set to China but airline checkbox checkbox is unchecked', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.byAirlineName=false;
    comp.searchText = "China";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(0);
  });
  it('should contain 0 results if searchText is set to 24:10 but inbound duration checkbox is unchecked', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.byInboundFlightsDuration=false;
    comp.searchText = "24:10";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(0);
  });
  it('should contain 0 results if searchText is set to 27:40 but outbound duration checkbox is unchecked', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.byOutboundFlightsDuration = false;
    comp.searchText = "27:40";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(0);
  });
  it('should contain 0 results if searchText is set to 2954.14 but total amount checkbox is unchecked', () => {

    let movieService: FlightsService = fixture.debugElement.injector.get(FlightsService);
    spyOn(movieService, 'getFlights')
      .and.returnValues(Observable.of(dummyFlights));

    comp.ngOnInit();
    comp.byTotalAmount =false;
    comp.searchText = "2954.14";
    comp.onSearchCriteriaChange()
    expect(comp.filteredFlights.length).toBe(0);
  });
});

