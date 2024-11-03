import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarnombreComponent } from './ingresarnombre.component';

describe('IngresarnombreComponent', () => {
  let component: IngresarnombreComponent;
  let fixture: ComponentFixture<IngresarnombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresarnombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarnombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
