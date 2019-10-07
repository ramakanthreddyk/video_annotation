import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAssetsComponent } from './upload-assets.component';

describe('UploadAssetsComponent', () => {
  let component: UploadAssetsComponent;
  let fixture: ComponentFixture<UploadAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
