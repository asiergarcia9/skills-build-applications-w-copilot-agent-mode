import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: 'running' | 'walking' | 'cycling' | 'strength' | 'other';
  duration: number;   // minutes
  distance?: number;  // km
  calories?: number;
  date: Date;
  notes?: string;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type:     { type: String, enum: ['running', 'walking', 'cycling', 'strength', 'other'], required: true },
    duration: { type: Number, required: true, min: 1 },
    distance: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date:     { type: Date, required: true, default: Date.now },
    notes:    { type: String, trim: true },
  },
  { timestamps: true }
);

export const Activity = model<IActivity>('Activity', ActivitySchema);
