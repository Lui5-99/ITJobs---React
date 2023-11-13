import { Schema, model } from "mongoose";
import slug from "slug";
import shortid from "shortid";

const vacancySchema = Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  enterprise: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  salary: {
    type: String,
    default: 0,
  },
  contract: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true,
  },
  skills: [String],
  candidates: [
    {
      name: String,
      email: String,
      cv: String,
    },
  ],
  autor: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

vacancySchema.pre("save", function (next) {
  const _url = slug(this.title);
  this.url = `${_url}-${shortid.generate()}`;
  next();
});

const Vacancy = model("vacancy", vacancySchema);

export default Vacancy;
