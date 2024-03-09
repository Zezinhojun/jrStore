import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { environment } from "@envs/environment";
import { Product } from "@shared/models/products.interface";
import { map, tap } from "rxjs";
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable({ providedIn: "root" })
export class ProductsService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient)
  private readonly _endPoint = environment.apiURL
  private readonly _injector = inject(EnvironmentInjector)

  constructor() {
    this.getProducts()
  }

  public getProducts(): void {
    this._http.get<Product[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: Product[]) => products.map((product: Product) => ({ ...product, qty: 1 }))
        ),
        tap((products: Product[]) => this.products.set(products)))
      .subscribe();
  }

  public getProductsById(id: number) {
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(this._http.get<Product>
        (`${this._endPoint}/products/${id}`)))

    // const product$ = this._http.get<Product>(`${this._endPoint}/products/${id}`)
    // return toSignal(product$)
    //return this._http.get<Product>(`${this._endPoint}/products/${id}`)
  }
}
