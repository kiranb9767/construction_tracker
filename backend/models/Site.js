import mongoose from "mongoose";


const materialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    dateOfPurchase: { type: Date, required: true },
    dateofPayment: { type: Date, required: true },
    mediumofPayment: { type: String, required: true },

});

const labourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    salary: { type: Number, required: true },
    date: { type: Date, required: true },
    mediumofPayment: { type: String, required: true },
});

const siteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    budget: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    Materials:[materialSchema],
    Labours:[labourSchema],
});

siteSchema.virtual("spent").get(function () {
  const materialCost = this.Materials.reduce(
    (sum, m) => sum + m.quantity * m.price,
    0
  );

  const labourCost = this.Labours.reduce(
    (sum, l) => sum + l.salary,
    0
  );

  return materialCost + labourCost;
});

siteSchema.virtual("remainingBudget").get(function () {
  return this.budget - this.spent;
});

siteSchema.set("toJSON", { virtuals: true });
siteSchema.set("toObject", { virtuals: true });

const Site = mongoose.model("Site", siteSchema,"construction_details");    

export default Site;