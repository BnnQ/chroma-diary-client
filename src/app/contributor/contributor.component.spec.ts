import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributorComponent } from './contributor.component';

describe('ContributorComponent', () => {
  let component: ContributorComponent;
  let fixture: ComponentFixture<ContributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
