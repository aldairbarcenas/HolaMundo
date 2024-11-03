import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasospasosDosComponent } from './pasospasos-dos.component';

describe('PasospasosDosComponent', () => {
  let component: PasospasosDosComponent;
  let fixture: ComponentFixture<PasospasosDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasospasosDosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasospasosDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
