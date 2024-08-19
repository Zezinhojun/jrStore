import { of } from "rxjs";

export default class MockActivatedRoute {
  params = of({ id: '123' });
}
