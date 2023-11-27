import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryWrapperComponent } from './diary-wrapper.component';

describe('DiaryWrapperComponent', () => {
  let component: DiaryWrapperComponent;
  let fixture: ComponentFixture<DiaryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiaryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
