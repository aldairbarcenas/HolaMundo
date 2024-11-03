import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasospasosUnoComponent } from './pasospasos-uno.component';

describe('PasospasosUnoComponent', () => {
  let component: PasospasosUnoComponent;
  let fixture: ComponentFixture<PasospasosUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasospasosUnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasospasosUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
