import { WaterCollection } from '../db/models/water.js';

export const getWaterForUser = async (userId) => {
  const contactsQuery = WaterCollection.find();
  contactsQuery.where('userId').equals(userId);

  const [waterCount, water] = await Promise.all([
    WaterCollection.find()
      .merge(contactsQuery)
      .countDocuments(),
    contactsQuery
      // .skip(skip)
      // .limit(limit)
      // .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  // const paginationData = calculatePaginationData(waterCount, perPage, page);

  return {
    data: water,
    // ...paginationData,
  };
}

export const getWaterById = async (waterId) => {
  const water = await WaterCollection.findById(waterId);
  return water;
};

export const createWater = async(payload) => {
    const water = await WaterCollection.create(payload);
    return water;
};

export const deleteWater = async (waterId) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: waterId,
  });

  return water;
};

export const updateWater = async (waterId, payload, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: waterId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
