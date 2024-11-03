import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallerespuestaComponent } from './detallerespuesta.component';

describe('DetallerespuestaComponent', () => {
  let component: DetallerespuestaComponent;
  let fixture: ComponentFixture<DetallerespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallerespuestaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallerespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
