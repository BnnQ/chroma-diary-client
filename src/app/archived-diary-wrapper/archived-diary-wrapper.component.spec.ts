import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDiaryWrapperComponent } from './archived-diary-wrapper.component';

describe('ArchivedDiaryWrapperComponent', () => {
  let component: ArchivedDiaryWrapperComponent;
  let fixture: ComponentFixture<ArchivedDiaryWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedDiaryWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedDiaryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
