import { Schema, model, models } from "mongoose";

interface ISummary {
  OriginalName: string;
  content: string;
  summary: string;
  createdAt: Date;
}

const summarySchema = new Schema<ISummary>({
  OriginalName: String,
  content: String,
  summary: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Summary || model<ISummary>("Summary", summarySchema);
