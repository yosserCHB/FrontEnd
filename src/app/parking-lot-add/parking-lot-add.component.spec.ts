import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotAddComponent } from './parking-lot-add.component';

describe('ParkingLotAddComponent', () => {
  let component: ParkingLotAddComponent;
  let fixture: ComponentFixture<ParkingLotAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingLotAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
