import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerQueueComponent } from './player-queue.component';

describe('PlayerQueueComponent', () => {
  let component: PlayerQueueComponent;
  let fixture: ComponentFixture<PlayerQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
