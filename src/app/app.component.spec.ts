import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import MockToastrService from './__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import MockActivatedRoute from './__tests__/__mocks__/MockActivatedRoute';

describe('AppComponent', () => {

  let mockToastrService: MockToastrService;
  let mockActivatedRoute: MockActivatedRoute;
  beforeEach(async () => {
    mockToastrService = new MockToastrService();
    mockActivatedRoute = new MockActivatedRoute();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: ToastrService, useValue: mockToastrService },
      { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
