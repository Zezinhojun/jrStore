import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@api/products.service';
import { AddToCartButtonComponent } from '@shared/components/add-to-cart-button.component';
import { RatingStarsComponent } from '@shared/components/rating-stars.component';
import { IProduct } from '@shared/models/products-interface';
import { CartService } from '@shared/services/cart/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, RatingStarsComponent, AddToCartButtonComponent],
  template: `
  @defer(when products().length >0){
    <section class="overflow-hidden text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex justify-evenly flex-wrap mx-auto lg:w-4/5">
      <img src="{{product()?.image}}" alt="{{product()?.title}}"
        class="object-contain object-center w-full h-[400px] rounded lg:w-[400px] lg:h-[400px] border border-gray-100 ">
      <div class="w-full mt-6 lg:w-1/2 lg:pl-10 lg:py-6 lg:mt-0 ">
        <h1 class="mb-1 text-3xl font-medium text-gray-900 title-font">{{product()?.title}}</h1>
        <p class="mt-2 mb-2 leading-relaxed">{{product()?.description | slice:0:50 }}</p>
        <div class="flex mb-4 item-center">
        <app-rating-stars [ratingRate]="product()?.rating?.rate" [ratingCount]="product()?.rating?.count"></app-rating-stars>
        </div>
        <div class="flex flex-col gap-16">
          <div class="flex flex-col gap-7">
            <span class="text-3xl font-bold text-green-950">{{product()?.price | currency:'BRL':'symbol'}}</span>
            @if(product()){
              <app-add-to-cart-button [product]="product()" (addToCartEvent)="onAddToCart($event)"></app-add-to-cart-button>
            }
          </div>
          <div class="flex flex-col gap-4">
            <div>
              <div class="flex items-center justify-start gap-3">
                <img src="../../../assets/svgs/delivery-truck.svg" alt="Delivery truck"
                  class="w-6 h-6 hover:opacity-80" />
                <h3 class="text-xl text-extrabold">Free delivery</h3>
              </div>
              <a href="#" class="text-gray-400 underline hover:text-green-800 cursor-pointer"
                onclick="event.preventDefault();">
                Enter your postal code for delivery availability
              </a>
            </div>
            <div>
              <div class="flex items-center justify-start gap-3">
                <img src="../../../assets/svgs/inbox.svg" alt="inbox"
                  class="w-6 h-6 hover:opacity-80" />
                <h3 class="text-xl text-extrabold">Return delivery</h3>
              </div>
              <p> Free 30 days delivery Returns.
                <a href="#" class="text-gray-400 underline hover:text-green-800 cursor-pointer"
                  onclick="event.preventDefault();">
                  Details.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  }
`,
})
export default class DetailsComponent implements OnInit {
  private productId: number = 0;
  private readonly _productsSvc = inject(ProductsService);
  private readonly _cartSvc = inject(CartService);
  private readonly route = inject(ActivatedRoute)
  public products = this._productsSvc.products;
  public product = computed(() =>
    this.products().find(product => product.id === this.productId)
  );

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('id')!
      this.loadProducts();
    });
  }

  private loadProducts(): void {
    if (this.product()) {
      const products = this._productsSvc.getProducts();
      this.products.set(products);
    } else {
      this._productsSvc.getProducts()
    }
  }

  onAddToCart(product: IProduct): void {
    this._cartSvc.addToCart(product);
  }
}
