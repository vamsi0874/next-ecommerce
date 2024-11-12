// import { create } from "zustand";
// import { currentCart } from "@wix/ecom";
// import { WixClient } from "@/context/wixContext";

// type CartState = {
//   cart: currentCart.Cart;
//   isLoading: boolean;
//   counter: number;
//   getCart: (wixClient: WixClient) => void;
//   addItem: (
//     wixClient: WixClient,
//     productId: string,
//     variantId: string,
//     quantity: number
//   ) => void;
//   removeItem: (wixClient: WixClient, itemId: string) => void;
// };

// export const useCartStore = create<CartState>((set) => ({
//   cart: [],
//   isLoading: true,
//   counter: 0,
//   getCart: async (wixClient) => {
//     try {
//       const cart = await wixClient.currentCart.getCurrentCart();
//       set({
//         cart: cart || { lineItems: [] },
//         isLoading: false,
//         counter: cart?.lineItems.length || 0,
//       });
//     } catch (err) {
//       set((prev) => ({ ...prev, isLoading: false }));
//     }
//   },
//   addItem: async (wixClient, productId, variantId, quantity) => {

  
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.addToCurrentCart({
//       lineItems: [
//         {
//           catalogReference: {
//             appId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
//             catalogItemId: productId,
//             ...(variantId && { options: { variantId } }),
//           },
//           quantity: quantity,
//         },
//       ],
//     });
   

//     set(()=>{
//         console.log(response.cart)
//         return {
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     }});
//   },
//   removeItem: async (wixClient, itemId) => {
//     set((state) => ({ ...state, isLoading: true }));
//     const response = await wixClient.currentCart.removeLineItemsFromCurrentCart(
//       [itemId]
//     );

//     set({
//       cart: response.cart,
//       counter: response.cart?.lineItems.length,
//       isLoading: false,
//     });
//   },
// }));

import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => void;
  addItem: (
    wixClient: WixClient,
    productId: string,
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (wixClient: WixClient, itemId: string) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cart: { lineItems: [] },  // Ensure cart has a lineItems array initially
  isLoading: true,
  counter: 0,
  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || { lineItems: [] },
        isLoading: false,
        counter: cart?.lineItems.length || 0,
      });
    } catch (err) {
      console.error("Error fetching cart:", err);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
  addItem: async (wixClient, productId, variantId, quantity) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
              catalogItemId: productId,
              ...(variantId && { options: { variantId } }),
            },
            quantity: quantity,
          },
        ],
      });
      
      console.log("Cart after adding item:", response.cart);  // Check response structure
      
      set((state) => ({
        cart: response.cart || { lineItems: [] },
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      }));
    } catch (err) {
      console.error("Error adding item to cart:", err);
      set((state) => ({ ...state, isLoading: false }));
    }
  },
  removeItem: async (wixClient, itemId) => {
    try {
      set((state) => ({ ...state, isLoading: true }));
      
      const response = await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      
      set({
        cart: response.cart || { lineItems: [] },
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (err) {
      console.error("Error removing item from cart:", err);
      set((state) => ({ ...state, isLoading: false }));
    }
  },
}));
