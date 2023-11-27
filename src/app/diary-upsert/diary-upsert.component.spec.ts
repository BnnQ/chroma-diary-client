import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryUpsertComponent } from './diary-upsert.component';

describe('CreateDiaryComponent', () => {
  let component: DiaryUpsertComponent;
  let fixture: ComponentFixture<DiaryUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaryUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaryUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
