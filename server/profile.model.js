const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    raceEthnicity: {
      type: [String],
      enum: [
        "American Indian, Alaska Native, or Native American",
        "African American or Black",
        "Asian",
        "Hispanic or Latinx",
        "Native Hawaiian or Other Pacific Islander",
        "Other",
        "White"
      ]
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "Other", "Non-binary"]
    },
    education: {
      type: [String],
      enum: [
        "Associate's Degree",
        "Bachelor's Degree",
        "Certification (e.g, Boot Camp)",
        "High School Diploma or Equivalent",
        "Master's Degree",
        "No Formal Training (Self Taught)",
        "Some College"
      ]
    },
	jobTitle: String,
	location: String,
	bio: String
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("Profile", profileSchema);
