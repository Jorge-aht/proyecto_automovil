import { useState, useEffect } from "react"
import { db } from "../data/db"

const useCart = () => {

    const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  const data = db

  const [cart, setCart] = useState(initialCart)

  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){

    const itemExist = cart.findIndex( automovil => automovil.id === item.id)

    if (itemExist >= 0) {
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      setCart([...cart, item])
    }
  }

  function removeFromCart(idEliminar){
    setCart(preCart => preCart.filter(automovil => automovil.id !== idEliminar))
  }

  function decreseQuantity(id){
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        return{
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function increseQuantity(id){
    const updateCart = cart.map(item => {
      if (item.id === id && item.quantity >= 1) {
        return{
          ...item,
          quantity: item.quantity +1
        }
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart() {
    setCart([])

  }

  const cartTotal = cart.reduce((total, {quantity, price}) => {return total + (quantity * price)}, 0)

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increseQuantity,
    decreseQuantity,
    clearCart,
    cartTotal
  }
}

export { useCart }