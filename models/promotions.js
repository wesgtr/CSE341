module.exports = (mongoose) => {
  const Promotions = mongoose.model(
    'promotions',
    mongoose.Schema(
      {
        promotion_id: Number,
        promo_percentage: Number,
        promo_name: String,
        promo_description: String,
        promo_url: String,
        promo_start: Date,
        promo_end: Date,
        promo_owner: Number,
      },
      { timestamps: true }
    )
  );
  return Promotions;
};
