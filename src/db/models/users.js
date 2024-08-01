import { Schema, model } from 'mongoose';

const usersSchema = new Schema(
  {
    email: {
      type: String,
      email: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
      enum: ['woman', 'man'],
      default: 'woman',
    },
    weight: {
      type: Number,
      required: false,
    },
    activity: {
      type: Number,
      required: false,
    },
    waterRate: {
      type: Number,
        required: false,
        default: 1.5,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
