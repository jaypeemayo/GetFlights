import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ], //to ignore router outlet errors
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('should create component', () => expect(comp).toBeDefined() );
  it('should have "GetFlights" title', () => {
    let de = fixture.debugElement.query(By.css('.navbar-brand'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('GetFlights',
      'Show GetFlights Title');
  });
  it('should have "Flights" link', () => {
    let de = fixture.debugElement.query(By.css('a[routerLink="/flights"]'));
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch('Flights',
      'Show Flights link');
  });
});
