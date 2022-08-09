const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const carersSchema = new mongoose.Schema({

  carerNumber: {
    type: Number,
  },
  
  email: {
    type: String,
    trim: true,
    required: true,
  },
  fName: {
    type: String,
    trim: true,
    required: true,
  },
  lName: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  postcode: {
    type: String,
    trim: true,
  },
  suburb: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },

  age: {
    type: String,
    trim: true,
  },
  nationality: {
    type: String,
    trim: true,
  },
  language: {
    type: String,
    trim: true,
  },
  emergencyNumber: {
    type: String,
    trim: true,
  },
  emergencyEmail: {
    type: String,
    trim: true,
  },
  emergencyRelationship: {
    type: String,
    trim: true,
  },
  emergencyName: {
    type: String,
    trim: true,
  },
  relevantExp: {
    type: String,
    trim: true,
  },
  workersComp: {
    type: String,
    trim: true,
  },

  aboutMe: {
    type: String,
    trim: true,
  },
  hobbieOne: {
    type: String,
    trim: true,
  },

  hobbieTwo: {
    type: String,
    trim: true,
  },
  hobbieThree: {
    type: String,
    trim: true,
  },
  hobbieFour: {
    type: String,
    trim: true,
  },
  medical: {
    type: String,
    trim: true,
  },
  monday: {
    type: String,
    trim: true,
  },
  tuesday: {
    type: String,
    trim: true,
  },
  wednesday: {
    type: String,
    trim: true,
  },
  thursday: {
    type: String,
    trim: true,
  },
  friday: {
    type: String,
    trim: true,
  },
  saturday: {
    type: String,
    trim: true,
  },
  sunday: {
    type: String,
    trim: true,
  },

  refereeNameOne: {
    type: String,
    trim: true,
  },

  refereeNameTwo: {
    type: String,
    trim: true,
  },

  refereeNameThree: {
    type: String,
    trim: true,
  },

  refereePhoneOne: {
    type: String,
    trim: true,
  },

  refereePhoneTwo: {
    type: String,
    trim: true,
  },

  refereePhoneThree: {
    type: String,
    trim: true,
  },

  refereeEmailOne: {
    type: String,
    trim: true,
  },

  refereeEmailTwo: {
    type: String,
    trim: true,
  },

  refereeEmailThree: {
    type: String,
    trim: true,
  },
  visaDetails: {
    type: String,
    trim: true,
  },
  ausCitizen: {
    type: Boolean,
  },
  car: {
    type: Boolean,
  },
  refereeRelOne: {
    type: String,
    trim: true,
  },

  refereeRelTwo: {
    type: String,
    trim: true,
  },

  refereeRelThree: {
    type: String,
    trim: true,
  },

  photo: {
    type: String,
    trim: true,
  },
  
  wwc: {
    data: Buffer,
    contentType: String,
  },
  certOne: {
    data: Buffer,
    contentType: String,
  },
  certTwo: {
    data: Buffer,
    contentType: String,
  },
  certThree: {
    data: Buffer,
    contentType: String,
  },
  certFour: {
    data: Buffer,
    contentType: String,
  },
  policeCheck: {
    data: Buffer,
    contentType: String,
  },

  firstAid: {
    data: Buffer,
    contentType: String,
  },

  cpr: {
    data: Buffer,
    contentType: String,
  },
  cv: {
    data: Buffer,
    contentType: String,
  },

  applications: [
    {
      jobPostId: { type: String },
      jobPostTitle: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],

  notes: [
    {
      note: { type: String },
      priority: { type: String },
      completed: { type: Boolean, default: false},
      date: { type: Date, default: Date.now },
    },
  ],


  rosters: [
    {
      client: {
        name: { type: String },
        id: { type: ObjectId, ref: "Client", },
      },
      phone: { type: String },
      address: { type: String },
      
      schedule: {},
      to: { type: String },
      from: { type: String },
      match: { type: String },
      km: { type: String },
    },
  ],

  verified: {
    type: Boolean,
    default: false,
  },
  form: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,

  activeToken: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Carers", carersSchema);
