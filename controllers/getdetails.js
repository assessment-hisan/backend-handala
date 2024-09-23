import Contestant from './../models/contestantModel.js';
import Program from './../models/programModel.js'; // Adjust the path as necessary
import ProgramRegistration from '../models/programRegistration.js';


// Route to get all contestants
const contestants = async (req, res) => {
  try {
    const contestants = await Contestant.find().populate('registered_programs'); // Optionally populate related fields
    res.status(200).json({ data: contestants });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const  programs =  async (req, res) => {
    try {
      const programs = await Program.find(); // Optionally populate related fields if needed
      res.status(200).json({ data: programs });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const registrations =  async (req, res) => {
  try {
    // Find all program registrations and populate related program and contestant data
    const registrations = await ProgramRegistration.find({})
      .populate('program')  // Populating program details
      .populate('individualContestants.contestant')  // Populating individual contestant details
      .populate('groups.contestants.contestant');  // Populating group contestant details

    if (!registrations) {
      return res.status(404).json({ error: 'No program registrations found' });
    }

    res.status(200).json({ message: 'Program registrations retrieved successfully', data: registrations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} ;
 // Adjust the path as necessary


    // Find the contestant by ID and populate the registered_programs with program details
    const getContestantDetails = async (req, res) => {
      try {
        const { id } = req.params;
    
        // Find the contestant by ID
        const contestant = await Contestant.findById(id);
        if (!contestant) {
          return res.status(404).json({ error: 'Contestant not found' });
        }
    
        // Fetch the program details for each registered program manually
        const registeredProgramsDetails = await Promise.all(
          contestant.registered_programs.map(async (regProgram) => {
            // Assuming regProgram.program holds the actual program reference ID
            const programDetails = await Program.findById(regProgram._id)
              .select('programName programDescription max_contestants max_groups') // Selecting the fields explicitly
              .exec();
            
            if (!programDetails) {
              return null;  // If a program is not found, return null (can be filtered out later)
            }
          })
        );
    
        // Filter out any null values in case some program details were not found
      
        res.status(200).json({ data: contestant});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    
    
    



export {contestants, programs, registrations,  getContestantDetails};
