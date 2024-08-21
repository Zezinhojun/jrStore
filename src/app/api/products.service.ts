import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { environment } from "@envs/environment";
import { IProduct } from "@shared/models/products-interface";
import { toSignal } from '@angular/core/rxjs-interop';


@Injectable({ providedIn: "root" })
export class ProductsService {
  public products = signal<IProduct[]>([]);
  private readonly _http = inject(HttpClient)
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.loadProducts();
  }

  getProducts(): IProduct[] {
    return this.products();
  }

  getProductById(id: number): IProduct | undefined {
    return this.products().find(product => product.id === id);
  }

  public getProductByIdFromApi(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<IProduct>(
        this._http.get<IProduct>(`${this._endPoint}/products/${id}`)
      )
    );
  }

  private loadProducts() {
    this._http.get<IProduct[]>(this._endPoint).subscribe(products => {
      this.products.set(products);
    });
  }

  sortProducts(order: 'asc' | 'desc') {
    const sortedProducts = [...this.products()].sort((a, b) => {
      if (a.price < b.price) return order === 'asc' ? -1 : 1;
      if (a.price > b.price) return order === 'asc' ? 1 : -1;
      return 0;
    });
    this.products.set(sortedProducts);
  }
}
