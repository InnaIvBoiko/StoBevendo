import { Schema, model } from 'mongoose';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    volume: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const WaterCollection = model('water', waterSchema);
