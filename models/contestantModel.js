import mongoose from "mongoose";
import { Schema } from "mongoose";


const contestantSchema = new Schema({
    name: { 
      type: String, 
      required: true 
    },
    admission_number: { 
      type: Number, 
      required: true, 
      unique: true  // Ensures no duplicate admission numbers
    },
    section: { 
      type: String, 
      required: true 
    },
    class: { 
      type: Number, 
      required: true 
    },
    team: { 
      type: String, 
      required: true  
    },
    registered_programs: [
      {
        program_id: {
          type: Schema.Types.ObjectId,
          ref: 'Program',  // Refers to the Program schema
        },
        program_name : {
          type : String
        },
        createdAt : {
          type : Date,
          default : Date.now()
        },

      }
    ]
  }, );
  
  const Contestant = mongoose.model('Contestant', contestantSchema);

export default Contestant