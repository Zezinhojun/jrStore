export default class MockRouter {
  router = jasmine.createSpyObj('Router', ['navigate']);
}
