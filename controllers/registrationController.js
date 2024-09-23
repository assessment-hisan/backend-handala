import ProgramRegistration from "./../models/programRegistration.js";
import Contestant from './../models/contestantModel.js';
import Program from './../models/programModel.js';


const registrations = async (req, res) => {
  try {
    const registrations = await ProgramRegistration.find()
      .populate('program') // Populate the program details
      .populate('individualContestants.contestant') // Populate individual contestants array
      .populate('groups.contestants.contestant'); // Populate contestants in groups

    res.status(200).json({ data: registrations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  

// Route to create individual program registration
const individual = async (req, res) => {
  const defiprog = []
  try {
    const { programId, contestants } = req.body;
   
    // Find the program to check max_contestants
    const program = await Program.findById(programId);
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }else {
      defiprog.push(program)
    }

    if (program.category !== 'individual') {
      return res.status(400).json({ error: 'This is not an individual program' });
    }

    // Find or create the program registration
    let registration = await ProgramRegistration.findOne({ 
      program: program, 
      registrationType: 'individual' 
    });

    if (!registration) {
      registration = new ProgramRegistration({
        program: programId,
        registrationType: 'individual',
        individualContestants: []
      });
    }

    // Validate and process each contestant group
    for (const group of contestants) {
      const { team, contestantIds } = group;

      // Check how many contestants from the same team are already registered
      const sameTeamRegistrations = registration.individualContestants.filter(
        (reg) => reg.team === team
      );

      if (sameTeamRegistrations.length + contestantIds.length > program.max_contestants) {
        return res.status(400).json({
          error: `Cannot register more than ${program.max_contestants} contestants from team ${team}`
        });
      }

      // Add the contestants to the registration
      for (const contestantId of contestantIds) {
        const contestant = await Contestant.findById(contestantId);
        if (!contestant) {
          return res.status(404).json({ error: `Contestant ${contestantId} not found` });
        }

        registration.individualContestants.push({
          contestant: contestantId,
          team
        });

        // Update the contestant's registered_programs field
        contestant.registered_programs.push({programId,   program_name : defiprog[0].program_name});
        await contestant.save();
      }
    }

    await registration.save();

    res.status(201).json({ message: 'Individual program registration successful', data: registration });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Route to create group program registration
const group = async (req, res) => {
  try {
    const { programId, groups } = req.body;
  console.log(req.body.group)
    // Find the program to check the max groups allowed
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }

    const maxGroupsPerTeam = program.max_groups;

    // Find existing registration for this program
    let registration = await ProgramRegistration.findOne({
      program: programId,
      registrationType: 'group'
    });

    if (!registration) {
      registration = new ProgramRegistration({
        program: programId,
        registrationType: 'group',
        groups: []
      });
    }

    // Maintain a count of groups registered per team
    const teamGroupsCount = {};

    // Count existing groups per team
    registration.groups.forEach((group) => {
      if (teamGroupsCount[group.team]) {
        teamGroupsCount[group.team]++;
      } else {
        teamGroupsCount[group.team] = 1;
      }
    });

    // Check for duplicate contestants and validate group limits per team
    const allContestants = new Set();
    for (const group of groups) {
      const { team, contestants, groupNumber } = group;

      // Validate group count per team
      if (teamGroupsCount[team]) {
        if (teamGroupsCount[team] >= maxGroupsPerTeam) {
          return res.status(400).json({
            error: `Cannot register more than ${maxGroupsPerTeam} groups for team ${team}`
          });
        }
        teamGroupsCount[team]++;
      } else {
        teamGroupsCount[team] = 1;
      }

      // Check for duplicate contestants across all groups
      for (const contestant of contestants) {
        if (allContestants.has(contestant.contestant.toString())) {
          return res.status(400).json({
            error: `Contestant ${contestant.contestant} is already in another group.`
          });
        }
        allContestants.add(contestant.contestant.toString());
      }
    }

    // Filter new groups (optional, depending on if you want to check for new groups)
    const newGroups = groups.filter(group => {
      return !registration.groups.some(existingGroup => existingGroup.groupNumber === group.groupNumber);
    });

    // Add the valid new groups to the registration
    registration.groups.push(...newGroups);

    // Save the updated registration
    await registration.save();

    res.status(200).json({
      message: 'Group program registration updated successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const updateIndReg = async (req, res) => {
  try {
    const { registrationId, individualContestants } = req.body;

    // Find the ProgramRegistration by ID
    const registration = await ProgramRegistration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ error: 'Program registration not found' });
    }

    // Validate if it's an individual registration
    if (registration.registrationType !== 'individual') {
      return res.status(400).json({ error: 'This is not an individual registration' });
    }

    // Update the individualContestants array
    registration.individualContestants = individualContestants;

    // Save the updated registration
    await registration.save();

    // Populate individualContestants field and program field
    const updatedRegistration = await ProgramRegistration.findById(registrationId)
      .populate('individualContestants.contestant') // Populate contestant details
      .populate('program'); // Populate program details

    res.status(200).json({
      message: 'Individual program registration updated successfully',
      data: updatedRegistration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateGrpReg = async (req, res) => {
  try {
    const { registrationId, groupNumber, updatedGroupData } = req.body;

    // Find the ProgramRegistration by ID
    const registration = await ProgramRegistration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({ error: 'Program registration not found' });
    }

    // Validate if it's a group registration
    if (registration.registrationType !== 'group') {
      return res.status(400).json({ error: 'This is not a group registration' });
    }

    // Find the group by groupNumber
    const group = registration.groups.find(group => group.groupNumber === groupNumber);
    if (!group) {
      return res.status(404).json({ error: `Group with number ${groupNumber} not found` });
    }

    // Update the group details
    Object.assign(group, updatedGroupData);

    // Save the updated registration
    await registration.save();

    // Populate fields and send response
    const updatedRegistration = await ProgramRegistration.findById(registrationId)
      .populate('groups.contestants.contestant') // Populate contestant details in groups
      .populate('program'); // Populate program details

    res.status(200).json({
      message: 'Group program registration updated successfully',
      data: updatedRegistration
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const  clearregisteredprogram  = async (req, res) => {
  try {
    // Find all contestants and update their registered_programs field
    const result = await Contestant.updateMany(
      {},
      { $set: { registered_programs: [] } }
    );

    res.status(200).json({
      message: 'All registered programs have been cleared',
      result: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to check if a contestant is already registered in a group
const isContestantInGroup = (contestantId, groups) => {
  return groups.some(group => group.contestants.some(c => c.contestant.toString() === contestantId.toString()));
};

  export {registrations, individual, group, updateIndReg,updateGrpReg, clearregisteredprogram}