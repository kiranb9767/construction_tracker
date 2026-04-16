import mongoose from "mongoose";

const siteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    siteName: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: String, required: true },
    budget: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: false },
    Materials:[materialSchema],
    Labours:[labourSchema],
    remainingBudget: { type: Number, required: false},
});


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


const Site = mongoose.model("Site", siteSchema);    

export default Site;