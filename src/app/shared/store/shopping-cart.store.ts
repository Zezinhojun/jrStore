import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/products.interface";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
  products: Product[]
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0
}

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => calculateProductCount(products())),
    totalAmount: computed(() => calculateTotalAmount(products()))
  })),

  withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({

    addToCart(product: Product) {
      const isProductInCart = products().find((item: Product) => item.id === product.id)
      if (isProductInCart) {
        isProductInCart.qty++
        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price
        patchState(store, { products: [...products()] })
      } else {
        patchState(store, { products: [...products(), product] })
      }
      toastSvc.success('Product added successfully, JrStore')
    },

    removeFromCart(id: number) {
      const updateProducts = products().filter(product => product.id !== id)
      patchState(store, { products: updateProducts })
      toastSvc.info('Product removed sucessfully, JrStore')
    },

    removeOneItemFromCart(id: number) {
      const currentProducts = products();
      const updatedProducts = currentProducts.map(product => {
        if (product.id === id) {
          const newQuantity = product.qty - 1;
          return { ...product, qty: newQuantity };
        }
        return product;
      })
        .filter(product => product.qty > 0);
      patchState(store, { products: updatedProducts });
      if (currentProducts
        .find(product => product.id === id && product.qty <= 0)) {
        this.removeFromCart(id);
      }
      toastSvc.info('One item removed successfully from JrStore');
    },

    clearCart() {
      patchState(store, initialState)
      toastSvc.info('Cart cleared, JrStore')
    }
  }))
)

function calculateTotalAmount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0)
}
function calculateProductCount(products: Product[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0)
}
