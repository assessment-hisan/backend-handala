import mongoose from "mongoose";
import { Schema } from "mongoose";

const programSchema = new Schema({
    program_number : {type : String},
    program_name: { type: String, required: true },
    section: { type: String, required: true },
    stage: { type: Boolean, required: true },
    category: { type: String, enum: ['individual', 'group'], required: true },
    max_contestants: { type: Number,  },  // Default for individual
    max_groups: { type: Number, },       // Default for group
    max_members_per_group: { type: Number, } // Default for group
  });
const Program = mongoose.model("Program", programSchema)

export default Program