import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAttachmentComponent } from './media-attachment.component';

describe('MediaAttachmentComponent', () => {
  let component: MediaAttachmentComponent;
  let fixture: ComponentFixture<MediaAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaAttachmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
