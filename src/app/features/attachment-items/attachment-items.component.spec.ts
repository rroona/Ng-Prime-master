import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentItemsComponent } from './attachment-items.component';

describe('AttachmentItemsComponent', () => {
  let component: AttachmentItemsComponent;
  let fixture: ComponentFixture<AttachmentItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
