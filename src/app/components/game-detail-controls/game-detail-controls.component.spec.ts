import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailControlsComponent } from './game-detail-controls.component';

describe('GameDetailControlsComponent', () => {
  let component: GameDetailControlsComponent;
  let fixture: ComponentFixture<GameDetailControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameDetailControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDetailControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
