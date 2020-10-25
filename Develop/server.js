const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Workout = require("./models/Workout")

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
  Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({ day: -1 })
  .limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

app.post("/api/workouts", ({ body }, res) => {
  const workout = new Workout(body);
  Workout.create(workout)
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

app.put("/api/workouts/:id", (req, res) => {

  const id = req.params.id
  const body = req.body

  if (body.name) {
  
  Workout.findOneAndUpdate({ _id: id, }, { $push: { exercises: body, } })
  
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.status(400).json(err);
  });

} else {
  res.end
}

})


app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
