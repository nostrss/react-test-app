import React, { useContext, useEffect, useState } from 'react';
import Products from './Products';
import axios from 'axios';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';
import { OrderContext } from '../../contexts/OrderContext';

function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:7001/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <ErrorBanner message='에러가 발생했습니다. 다시 시도해주세요.' />;
  }

  const ItemComponents = orderType === 'products' ? Products : Options;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  let orderTypeKorean = orderType === 'products' ? '상품' : '옵션';

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>
        {orderTypeKorean} 총 가격: {orderDatas.totals[orderType]}
      </p>

      <div style={{ display: 'flex', flexDirection: orderType === 'options' }}>
        {optionItems}
      </div>
    </>
  );
}

export default Type;
