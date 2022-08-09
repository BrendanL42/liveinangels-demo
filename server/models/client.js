const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const opts = { toJSON: { virtuals: true } };

const clientSchema = new mongoose.Schema(
  
  {

    clientNumber: {
      type: Number,
    },
    
    guardianfName: {
      type: String,
      trim: true,
      required: true,
    },
    preferedContactEmail: {
      type: String,
      trim: true,
    },
    preferedContactPhone: {
      type: String,
      trim: true,
    },
    guardianlName: {
      type: String,
      trim: true,
      required: true,
    },
    guardianphone: {
      type: String,
      trim: true,
    },
    guardianaddress: {
      type: String,
      trim: true,
    },
    guardianState: {
      type: String,
      trim: true,
    },
    guardianPostcode: {
      type: String,
      trim: true,
    },
    guardianSuburb: {
      type: String,
      trim: true,
    },
    guardianCity: {
      type: String,
      trim: true,
    },
    guardianemail: {
      type: String,
      trim: true,
      required: true,
    },
    guardianrelationship: {
      type: String,
      trim: true,
    },

    clientfName: {
      type: String,
      trim: true,
    },
    clientlName: {
      type: String,
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
    },
    clientaddress: {
      type: String,
      trim: true,
    },
    clientNationality: {
      type: String,
      trim: true,
    },
    clientState: {
      type: String,
      trim: true,
    },
    clientPostcode: {
      type: String,
      trim: true,
    },
    clientSuburb: {
      type: String,
      trim: true,
    },
    clientCity: {
      type: String,
      trim: true,
    },
    clientPhone: {
      type: String,
      trim: true,
    },
    clientGender: {
      type: String,
      trim: true,
    },
    clientAge: {
      type: String,
      trim: true,
    },

    nightsReq: {
      type: Number,
    },

    daysReq: {
      type: Number,
    },

    wheelChair: {
      type: Boolean,
      default: false,
    },

    walkingAid: {
      type: Boolean,
      default: false,
    },
    deaf: {
      type: Boolean,
      default: false,
    },
    blind: {
      type: Boolean,
      default: false,
    },

    hoist: {
      type: Boolean,
      default: false,
    },

    bedConfined: {
      type: Boolean,
      default: false,
    },

    checkListOther: {
      type: String,
      trim: true,
    },
    pets: {
      type: String,
      trim: true,
    },
    personalCare: {
      type: Array,
    },
    houseDuties: {
      type: Array,
    },
    shopping: {
      type: Array,
    },

    outings: {
      type: Array,
    },

    manualHandling: {
      type: Array,
    },

    other: {
      type: Array,
    },

    billingEmail: {
      type: String,
      trim: true,
    },

    billingPostAddress: {
      type: String,
      trim: true,
    },
    billingPostCity: {
      type: String,
      trim: true,
    },  
    billingPostPostcode: {
      type: String,
      trim: true,
    },
    billingPostState: {
      type: String,
      trim: true,
    },
    billingSuburb: {
      type: String,
      trim: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    activeToken: {
      type: String,
      default: "",
    },
    form: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },

    rosters: [
      {
        carer: {
          name: { type: String },
          id: { type: ObjectId, ref: "Carers" },
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
    notes: [
      {
        note: { type: String },
        priority: { type: String },
        completed: { type: Boolean, default: false},
        date: { type: Date, default: Date.now },
      },
    ],
    updated: Date,
  },
  opts
);


module.exports = mongoose.model("Client", clientSchema);
