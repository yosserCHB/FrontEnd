import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpotAddComponent } from './parking-spot-add.component';

describe('ParkingSpotAddComponent', () => {
  let component: ParkingSpotAddComponent;
  let fixture: ComponentFixture<ParkingSpotAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingSpotAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingSpotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
