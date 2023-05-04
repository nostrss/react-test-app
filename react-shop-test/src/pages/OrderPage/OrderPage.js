import Type from './Type';
import { useContext } from 'react';
import { OrderContext } from '../../contexts/OrderContext';

export default function OrderPage() {
  const [orderDatas] = useContext(OrderContext);
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType='products' />
      </div>
      <div style={{ display: 'flex', marginTop: 20 }}>
        <div style={{ width: '50%' }}>
          <Type orderType='options' />
        </div>
        <div style={{ width: '50%' }}>
          <h2>Total Price: {orderDatas.totals.total} </h2> <br />
          <button>주문</button>
        </div>
      </div>
    </div>
  );
}
