// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// interface IFavorite {
//   title: string;
//   description?: string;
//   media_type: string;
//   url: string;
//   thumbnail_url?: string;
//   date_created?: Date;
//   user: string | undefined; // User ObjectId
//   instance: number
// }

// const favoriteSchema = new Schema<IFavorite>({
//   title: {
//     type: String, required: true,
//   },
//   description: {
//     type: String,
//   },
//   media_type: {
//     type: String, required: true,
//   },
//   url: {
//     type: String, required: true,
//   },
//   thumbnail_url: {
//     type: String,
//   },
//   date_created: {
//     type: Date, default: Date.now,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   instance: Number,
// });

// const User = mongoose.model('user', favoriteSchema);

// export default User;

import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IFavorite {
  href: string;
  data: {
    center: string;
    title: string;
    nasa_id: string;
    date_created: Date;
    keywords: string[];
    media_type: string;
    description_508?: string;
    secondary_creator?: string;
    description: string;
  }[];
  links: {
    href: string;
    rel: string;
    render: string;
  }[];
  increment: number;
}

const favoriteSchema = new Schema<IFavorite>({
  href: {
    type: String,
    required: true,
  },
  data: [
    {
      center: String,
      title: String,
      nasa_id: {
        type: String,
        unique: true,
        required: true,
      },
      date_created: {
        type: Date,
        required: true,
      },
      keywords: [String],
      media_type: String,
      description_508: String,
      secondary_creator: String,
      description: {
        type: String,
        required: true,
      },
    },
  ],
  links: [
    {
      href: String,
      rel: String,
      render: String,
    },
  ],
  increment: {
    type: Number,
    default: 0,
  },
});

const Favorites = mongoose.model<IFavorite>('Image', favoriteSchema);

export default Favorites;

// export { IImage, ImageModel };
