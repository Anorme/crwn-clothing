import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

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

  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem);

  const addItemHandler = () => addItemToCart(cartItem);

  const removeItemHandler = () => removeItemFromCart(cartItem);

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