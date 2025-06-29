import { useDispatch, useSelector } from 'react-redux';

import { 
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart, 
} from '../../store/cart/cart.action.js';
import { selectCartItems } from '../../store/cart/cart.selector.js';

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Arrow,
  Value,
  Quantity,
  RemoveButton
} from './checkout-item.styles.jsx';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));

  const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan> {name} </BaseSpan>
      <Quantity> 
        <Arrow onClick={removeItemHandler}>&lt;</Arrow>
        <Value > {quantity} </Value> 
        <Arrow onClick={addItemHandler}>&gt;</Arrow>
      </Quantity>
      <BaseSpan> {price} </BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;