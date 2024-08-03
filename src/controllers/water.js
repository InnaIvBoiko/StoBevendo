import createHttpError from 'http-errors';
import { getWaterForUser, getWaterById, createWater, deleteWater, updateWater } from '../services/water.js';

export const getWaterController = async (req, res, next) => {

  const water = await getWaterForUser({
    userId: req.user._id,
  });

  if (!water) {
    throw createHttpError(404, 'Data about water not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found data about water!',
    data: water,
  });
};

export const getWaterByIdController = async (req, res, next) => {
  const { waterId } = req.params;
  const water = await getWaterById(waterId);

  if (!water) {
    throw createHttpError(404, 'Data about water not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found data about water with id ${waterId}!`,
    data: water,
  });
};

export const createWaterController = async (req, res) => {
    const water = await createWater(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created data about water!',
        data: water,
    });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
    const water = await deleteWater(waterId);

  if (!water) {
    throw createHttpError(404, 'Data about water not found');

  }

  res.status(204).send();
};

export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const result = await updateWater(waterId, req.body);

  if (!result) {
    throw createHttpError(404, 'Data about water not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully updated data about water!`,
    data: result.water,
  });
};
