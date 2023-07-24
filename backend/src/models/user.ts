import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  reclaimId: {
    type: String,
  },
  status: {
    type: String,
    default: false,
  },
  isPaid: {
    // this is temp
    type: Boolean,
    default: false,
  },
  callbackId: {
    type: String,
  },
  callbackUrl: {
    type: String,
  },
  verifiedItems: [
    {
      provider: {
        type: String,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const user = mongoose.model("User", userSchema);

export { user };
