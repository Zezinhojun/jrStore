export default class MockToastrService {
  success = jasmine.createSpy('success');
  info = jasmine.createSpy('info');
  error = jasmine.createSpy('error');
  warning = jasmine.createSpy('warning');
}
