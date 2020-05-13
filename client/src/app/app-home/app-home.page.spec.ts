import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppHomePage } from './app-home.page';

describe('AppHomePage', () => {
  let component: AppHomePage;
  let fixture: ComponentFixture<AppHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
