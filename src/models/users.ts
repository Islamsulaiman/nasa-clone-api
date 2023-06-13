import mongoose from 'mongoose';

const { Schema } = mongoose;

interface UserType {
  fullName: string,
  password: string,
  email: string,
  userName: string,
  image: string,
  favorites: []
}

const userSchema = new Schema<UserType>(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 100,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 30,
      trim: true,
    },
    image: {
      type: String,
      required: true,

    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        // eslint-disable-next-line no-param-reassign
        delete ret.password;
      },
    },
  },
);

const User = mongoose.model('user', userSchema);

export default User;
