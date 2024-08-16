import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { ICartStore } from "@shared/models/cartStore-interface";
import { IProduct } from "@shared/models/products-interface";
import { ToastMessage } from "@shared/utils/toast-message";
import { ToastrService } from "ngx-toastr";

const initialState: ICartStore = {
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

    addToCart(product: IProduct) {
      const isProductInCart = products().find((item: IProduct) => item.id === product.id)
      if (isProductInCart) {
        isProductInCart.qty++
        isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price
        patchState(store, { products: [...products()] })
      } else {
        patchState(store, { products: [...products(), product] })
      }
      toastSvc.success(ToastMessage.ADD_ITEM)
    },

    async removeFromCart(id: number) {
      const updateProducts = products().filter(product => product.id !== id)
      patchState(store, { products: updateProducts })
      toastSvc.info(ToastMessage.REMOVE_ITEM)
    },

    async removeOneItemFromCart(id: number) {
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
         await this.removeFromCart(id);
      }
      products().length !== 0 ? toastSvc.info(ToastMessage.REMOVE_ONE)
        : toastSvc.info(ToastMessage.REMOVE_ITEM)
    },

    clearCart(finished: boolean) {
      patchState(store, initialState)
    if(finished)toastSvc.info(ToastMessage.CART_CLEAN)
    }
  }))
)

function calculateTotalAmount(products: IProduct[]): number {
  return products.reduce((acc, product) => acc + product.price * product.qty, 0)
}
function calculateProductCount(products: IProduct[]): number {
  return products.reduce((acc, product) => acc + product.qty, 0)
}
