import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAboutComponent } from './artist-about.component';

describe('ArtistAboutComponent', () => {
  let component: ArtistAboutComponent;
  let fixture: ComponentFixture<ArtistAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
