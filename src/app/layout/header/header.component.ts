import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '@shared/services/cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, CurrencyPipe, SlicePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _cartService = inject(CartService);
  private readonly cartProducts = this._cartService.getProduct();
  public readonly products = this._cartService.products();
  public readonly totalAmount = this._cartService.totalAmount();
  public readonly productsCount = this._cartService.productsCount();
  public showCart = signal<boolean>(false)
}
