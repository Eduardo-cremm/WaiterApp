import type { Request, Response } from 'express';

import { Category } from '../../models/Category.js';

export async function createCategory(req: Request, res: Response) {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is required' });
    }

    const { icon, name } = req.body;

    if (!icon || !name) {
      return res.status(400).json({message: 'Icon and name are required'});
    }

  const category = await Category.create({icon, name});

  res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
