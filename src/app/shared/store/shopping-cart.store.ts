import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ICartStore } from '@shared/models/cartStore-interface';
import { IProduct } from '@shared/models/products-interface';
import { ToastMessage } from '@shared/utils/toast-message';
import { ToastrService } from 'ngx-toastr';

import * as cartUtils from './../utils/shopping-cart-utils';

const initialState: ICartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0
}

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products }) => ({
    productsCount: computed(() => cartUtils.calculateProductCount(products())),
    totalAmount: computed(() => cartUtils.calculateTotalAmount(products()))
  })),

  withMethods(({ products, ...store }, toastSvc = inject(ToastrService)) => ({
    updateCart(id: string, data: ICartStore) {
      patchState(store, { [id]: data })
    },

    addProductToCart(product: IProduct) {
      const existingProduct = products().find((item: IProduct) => item.id === product.id)
      if (!existingProduct) {
        patchState(store, { products: [...products(), product] })
      } else {
        existingProduct.qty++
        existingProduct.subTotal = existingProduct.qty * existingProduct.price
        patchState(store, { products: [...products()] })
      }
      toastSvc.success(ToastMessage.ADD_ITEM)
    },

    removeProductFromCart(id: number) {
      const updateProducts = products().filter(product => product.id !== id)
      patchState(store, { products: updateProducts })
      toastSvc.info(ToastMessage.REMOVE_ITEM)
    },

    decrementProductQuantity(id: number) {
      const updatedProducts = products().reduce((acc, product) => {
        if (product.id === id) {
          if (product.qty > 1) {
            acc.push({ ...product, qty: product.qty - 1 });
          }
          return acc;
        }
        acc.push(product);
        return acc;
      }, [] as IProduct[]);

      patchState(store, { products: updatedProducts });
      products().length !== 0 ? toastSvc.info(ToastMessage.REMOVE_ONE)
        : toastSvc.info(ToastMessage.REMOVE_ITEM)
    },

    resetCart(finished: boolean) {
      patchState(store, initialState)
      if (finished) toastSvc.info(ToastMessage.CART_CLEAN)
    }
  }))
)

