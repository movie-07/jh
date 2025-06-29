import mongoose from 'mongoose';
import slugify from 'slugify'; // make sure to install it

const contentSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  img: String,
  img2: String,
  imdbRating: String,
  description: String,
  imdbLink: String,
  genre: [String],
  type: { type: String, enum: ['movie', 'webseries'], required: true },
  downloadLinks: [
    {
      name: String,
      url: String,
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

// Auto-generate slug before saving
contentSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Content || mongoose.model('Content', contentSchema);
