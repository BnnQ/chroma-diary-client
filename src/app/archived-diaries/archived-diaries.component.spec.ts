import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDiariesComponent } from './archived-diaries.component';

describe('ArchivedDiariesComponent', () => {
  let component: ArchivedDiariesComponent;
  let fixture: ComponentFixture<ArchivedDiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivedDiariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivedDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
