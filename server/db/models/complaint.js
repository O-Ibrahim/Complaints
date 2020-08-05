const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComplaintSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ["resolved", "pending", "dismissed"],
    },
  },
  { timestamps: true }
);

let User = mongoose.model("Complaint", ComplaintSchema);
module.exports = User;
