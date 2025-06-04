import Button from '../button/button.component';

import './cart-dropdown.styles.scss';

export const cartDropdown = () => {

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'></div>
      <Button> GOT TO CHECKOUT</Button>
    </div>
  )
}
