import React, { useEffect, useState } from 'react';
import Products from './Products';
import axios from 'axios';
import ErrorBanner from '../../components/ErrorBanner';
import Options from './Options';

function Type({ orderType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const ItemComponents = orderType === 'products' ? Products : Options;

  if (error) {
    return <ErrorBanner message='에러가 발생했습니다. 다시 시도해주세요.' />;
  }

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionItems}</div>;
}

export default Type;
