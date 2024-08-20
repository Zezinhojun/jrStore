import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import MockToastrService from 'app/__tests__/__mocks__/mockToastrService';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import MockActivatedRoute from 'app/__tests__/__mocks__/mockActivatedRoute';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockToastrService: MockToastrService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockToastrService = new MockToastrService();
    mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: ToastrService, useValue: mockToastrService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
