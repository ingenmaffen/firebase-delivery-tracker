import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DetailsComponent } from './details.component';
import { environment } from '../../../environments/environment';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should markers from waypoint data', () => {
    component.waypoints = [
      {
        latlng: {
          oa: 0,
          ha: 0,
        },
        marker: 'courier',
      },
      {
        latlng: {
          oa: 0,
          ha: 0,
        },
        marker: 'address',
      },
      {
        latlng: {
          oa: 0,
          ha: 0,
        },
        marker: 'store',
      },
      {
        latlng: {
          oa: 0,
          ha: 0,
        },
        marker: 'warehouse',
      },
    ];
    component.onTypeChange(null);
    expect(component.mapLayers.length).toBeTruthy();
  });

  it('should draw car courier', () => {
    component.waypoints = [
      {
        latlng: {
          oa: 0,
          ha: 0,
        },
        marker: 'courier',
      },
    ];
    component.deliveryType = 'car';
    component.onTypeChange(null);
    expect(component.mapLayers[0].options.icon.options.iconUrl).toBe(
      'assets/local_shipping-24px.svg'
    );
  });
});

class ActivatedRouteStub {
  snapshot = {
    queryParams: {
      id: 1,
    },
  };

  set testParams(params: any) {
    this.snapshot.queryParams = params;
  }
}
