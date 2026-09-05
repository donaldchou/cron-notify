import mongoose, { Schema } from "mongoose";

export interface PingLogDocument extends mongoose.Document {
  triggeredAt: Date;
}

const PingLogSchema = new Schema<PingLogDocument>({
  triggeredAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const PingLog =
  mongoose.models.PingLog ??
  mongoose.model<PingLogDocument>("PingLog", PingLogSchema);
