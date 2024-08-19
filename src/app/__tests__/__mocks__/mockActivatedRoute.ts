import { IOrder } from "@shared/models/orders-interface";
import { of } from "rxjs";

export default class MockActivatedRoute {
  params = of({ id: '123' });
  snapshot = {
    data: {
      order: null as IOrder | null
    }
  };
}
