import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcuestionariosComponent } from './listcuestionarios.component';

describe('ListcuestionariosComponent', () => {
  let component: ListcuestionariosComponent;
  let fixture: ComponentFixture<ListcuestionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListcuestionariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcuestionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
