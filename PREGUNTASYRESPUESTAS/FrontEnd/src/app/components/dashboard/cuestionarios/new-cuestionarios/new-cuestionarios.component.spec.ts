import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCuestionariosComponent } from './new-cuestionarios.component';

describe('NewCuestionariosComponent', () => {
  let component: NewCuestionariosComponent;
  let fixture: ComponentFixture<NewCuestionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewCuestionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
