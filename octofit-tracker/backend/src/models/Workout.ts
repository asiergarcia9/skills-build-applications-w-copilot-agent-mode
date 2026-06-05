import { Schema, model, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  exercises: {
    name: string;
    sets?: number;
    reps?: number;
    durationSeconds?: number;
  }[];
  createdBy: Types.ObjectId;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    exercises: [
      {
        name:            { type: String, required: true },
        sets:            { type: Number, min: 1 },
        reps:            { type: Number, min: 1 },
        durationSeconds: { type: Number, min: 1 },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Workout = model<IWorkout>('Workout', WorkoutSchema);
