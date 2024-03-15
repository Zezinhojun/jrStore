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
