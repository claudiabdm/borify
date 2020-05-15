import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRelatedComponent } from './artist-related.component';

describe('ArtistRelatedComponent', () => {
  let component: ArtistRelatedComponent;
  let fixture: ComponentFixture<ArtistRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
