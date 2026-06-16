import React from 'react';
import {Container} from './styles';
import { OrdersBoard } from '../OrdersBoard';

export function Orders() {
  return (
    <Container>
      <OrdersBoard />
      <OrdersBoard />
      <OrdersBoard />
    </Container>
  );
}

