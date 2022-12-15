import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetViewBtnComponent } from './planet-view-btn.component';

describe('PlanetViewBtnComponent', () => {
  let component: PlanetViewBtnComponent;
  let fixture: ComponentFixture<PlanetViewBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetViewBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetViewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
