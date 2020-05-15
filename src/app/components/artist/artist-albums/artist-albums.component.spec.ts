import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistAlbumsComponent } from './artist-albums.component';

describe('ArtistAlbumsComponent', () => {
  let component: ArtistAlbumsComponent;
  let fixture: ComponentFixture<ArtistAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
