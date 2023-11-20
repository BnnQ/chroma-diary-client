import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDiariesComponent } from './shared-diaries.component';

describe('SharedDiariesComponent', () => {
  let component: SharedDiariesComponent;
  let fixture: ComponentFixture<SharedDiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedDiariesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharedDiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
