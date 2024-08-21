import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@envs/environment';
import { IProduct } from '@shared/models/products-interface';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<IProduct[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;

  constructor() {
    this.loadProducts();
  }

  getProducts(): IProduct[] {
    return this.products();
  }

  getProductById(id: number): IProduct | undefined {
    return this.products().find((product) => product.id === id);
  }

  private loadProducts() {
    this._http.get<IProduct[]>(this._endPoint).subscribe((products) => {
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
