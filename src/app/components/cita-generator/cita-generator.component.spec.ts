import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaGeneratorComponent } from './cita-generator.component';

describe('CitaGeneratorComponent', () => {
  let component: CitaGeneratorComponent;
  let fixture: ComponentFixture<CitaGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
