import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestacuestionarioComponent } from './respuestacuestionario.component';

describe('RespuestacuestionarioComponent', () => {
  let component: RespuestacuestionarioComponent;
  let fixture: ComponentFixture<RespuestacuestionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RespuestacuestionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespuestacuestionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
