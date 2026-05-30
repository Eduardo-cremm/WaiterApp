import type { Request, Response } from 'express';

import { Order } from '../../models/Order.js';

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate({
        path: 'products.product',
        select: 'name description price imagePath ingredients category'
      });

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
