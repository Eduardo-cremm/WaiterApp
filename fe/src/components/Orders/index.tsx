import { Container } from './styles';
import { OrdersBoard } from '../OrdersBoard';
import type { Order } from '../../types/Order';
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import socketIo from 'socket.io-client';


export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('order@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    })

  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      })
  }, []);

  const wiating = orders.filter((order) => order.status === 'WAITING')
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION')
  const done = orders.filter((order) => order.status === 'DONE')

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleorderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={wiating}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleorderStatusChange}
      />

      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleorderStatusChange}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleorderStatusChange}
      />
    </Container>
  );
}

