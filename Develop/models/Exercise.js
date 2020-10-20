const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: {
    type: String,
   // required: "Please Enter Exercise Type"
  },

  name: {
    type: String,
  //  required: "What did you do for your exercise?"
  },


  duration: {
    type: Number,
  //  required: "How many minutes did you exercise for?"
  },

  weight: {
   type: Number,
  // required: "How much weight did you lift?"
  },
  
  reps: {
    type: Number,
  // required: "How many reps did you do?"
  },

  sets: {
    Type: Number,
   // required: "How many sets did you do?"
  },

  distance: {
    type: Number,
  //  required: "How many miles did you go?"
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;