import express from 'express';
import cors from 'cors'
import registrationRoutes from './routes/registrationRoutes.js'
import getDetailsRoute from './routes/getDetailsRoute.js'
import authRouter from './routes/authRouter.js'

import Program from './models/programModel.js';

import mongoose from 'mongoose';
import 'dotenv/config'
const app = express();

app.use(express.json())

app.use(
  cors({
      origin: "*"
  })
)
// Connect to MongoDB

mongoose.connect(process.env.MONGOURL)






app.use('/api/register', registrationRoutes)
app.use('/api/details',getDetailsRoute)
app.use('/api/auth', authRouter)


app.post('/upload', async (req,res)=> {
 const contestantsArray = [
  {
    "program_name": "Mr. TRASNSLATOR",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A14"
  },
  {
    "program_name": "AL ʿARABI",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A15"
  },
  {
    "program_name": "ALLAME URDU",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A16"
  },
  {
    "program_name": "Mr. ENGLISH",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A17"
  },
  {
    "program_name": "LOGICAL REASONING",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A18"
  },
  {
    "program_name": "CANVAS PAINTING",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A19"
  },
  {
    "program_name": "PACKAGE DESIGINING",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 1.0,
    "program_number": "A20"
  },
  {
    "program_name": "CODE CRAFT",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 1.0,
    "program_number": "A21"
  },
  {
    "program_name": "QURʾĀN TALENT",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A22"
  },
  {
    "program_name": "VARSITY TALENT",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A23"
  },
  {
    "program_name": "AL FAQĪH",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A24"
  },
  {
    "program_name": "PROUD MUSLIM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A25"
  },
  {
    "program_name": "ESSAY MLM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A26"
  },
  {
    "program_name": "ESSAY ARB",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A27"
  },
  {
    "program_name": "ESSAY URD",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A28"
  },
  {
    "program_name": "ACADEMIC ESSAY ENG",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A29"
  },
  {
    "program_name": "POEM MLM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A30"
  },
  {
    "program_name": "POEM ENG",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A31"
  },
  {
    "program_name": "POEM ARB",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A32"
  },
  {
    "program_name": "POEM URD",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A33"
  },
  {
    "program_name": "SHORT STORY MLM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A34"
  },
  {
    "program_name": "SHORT STORY ENG",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A35"
  },
  {
    "program_name": "SHORT STORY ARB",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A36"
  },
  {
    "program_name": "SHORT STORY URD",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A37"
  },
  {
    "program_name": "SCREEN PLAY WRITING MLM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A38"
  },
  {
    "program_name": "ABSTRACT WRITING ENG",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A39"
  },
  {
    "program_name": "COPY WRITING MLM",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A40"
  },
  {
    "program_name": "CARICATURE",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 2.0,
    "program_number": "A41"
  },
  {
    "program_name": "ADVENTURE PHOTOGRAPHY",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 1.0,
    "program_number": "A42"
  },
  {
    "program_name": "UI DESIGNING",
    "section": "ʿᾹLIYAH",
    "stage": false,
    "category": "individual",
    "max_contestants": 1.0,
    "program_number": "A43"
  }
  ]
  
  
    
  try {
    const savedContestants = await Program.insertMany(contestantsArray)
    res.status(201).json({ message: 'Contestants uploaded successfully', data: savedContestants });
  } catch (error) {
   

  res.status(500).json({ message: 'An error occurred while uploading contestants', error: error.message });
}
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
