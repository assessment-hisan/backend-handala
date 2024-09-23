import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";


const programRegistrationSchema = new Schema({
  program: { type: Schema.Types.ObjectId, ref: 'Program', required: true },
  registrationType: { type: String, enum: ['individual', 'group'], required: true },
  individualContestants: [{
    contestant: { type: Schema.Types.ObjectId, ref: 'Contestant', required: true },
    team: { type: String, required: true }  // Add team information for individual contestants
  }],
  groups: [{
    groupNumber: { type: Number, required: true },
    team: { type: String },
    contestants: [{
      contestant: { type: Schema.Types.ObjectId, ref: 'Contestant', required: true },
      role: { type: String, enum: ['group_leader', 'group_member'], default: 'group_member' }
    }],
    created_at: { type: Date, default: Date.now }
  }],
  created_at: { type: Date, default: Date.now }
});

const ProgramRegistration =  mongoose.model('ProgramRegistration', programRegistrationSchema);
export default ProgramRegistration