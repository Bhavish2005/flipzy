import React, { createContext, useState } from "react";
import all_products from "../components/assests/all_products"
export const ShopContext = createContext(null);
  const getDefaultCart=()=>
    {
        let cart={};
        for(let index=0;index<all_products.length+1;index++)
        {
            cart[index]=0;
        }
        return cart;
    }
    const ShopContextProvider=(props)=>{
const[cartItems,setCartItems]=useState(getDefaultCart());
    
    const addToCart=(itemId)=>{
setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }
    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
            }
            const getTotalCartAmount=()=>{
                let totalAmount=0;
                for(const items in cartItems)
                {
                    if(cartItems[items]>0)
                    {
                        let itemInfo= all_products.find((product)=>product.id===Number(items))
                        totalAmount += itemInfo.new_price * cartItems[items];
                    }
                   
                } return totalAmount;
            }
            const getTotalCartItems=()=>{
                let totalItems=0;
                for(const items in cartItems)
                {
                    if(cartItems[items]>0)
                    {
                        totalItems += cartItems[items];
                    }
                   
                } return totalItems;
            }
            const contextValue = {getTotalCartItems , getTotalCartAmount , all_products,cartItems,addToCart, removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}> 
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;