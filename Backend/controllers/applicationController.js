const { populate } = require("dotenv");
const { catchAsync } = require("../middlewares/catchAsync.js");
const { AppError } = require("../middlewares/errorHandler.js");
const { Application } = require("../models/applicationModel.js");
const { Job } = require("../models/jobModel.js");
const { User } = require("../models/userModel.js");

// Apply for a job
const applyForJob = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const { resume } = req.body;
  const applicantId = req.user._id;

  const job = await Job.findById(jobId);
  if (!job) {
    return next(new AppError("Job not found", 404));
  }

  const application = new Application({
    job: jobId,
    applicant: applicantId,
    resume,
  });

  await application.save();

  res.status(201).json({
    status: "success",
    message: "Application submitted successfully",
    application,
  });
});

// Get all applications for a job
const getJobApplications = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;

  const applications = await Application.find({ job: jobId }).populate(
    "applicant"
  );

  res.status(200).json({
    status: "success",
    results: applications.length,
    applications,
  });
});

// Get all applications by a user
const getUserApplications = catchAsync(async (req, res, next) => {
  const applicantId = req.user._id;

  const applications = await Application.find({
    applicant: applicantId,
  }).populate({
    path: "job",
    populate: {
      path: "company",
    },
  });

  res.status(200).json({
    status: "success",
    results: applications.length,
    applications,
  });
});

// Update application status
const updateApplicationStatus = catchAsync(async (req, res, next) => {
  const { applicationId } = req.params;
  const { status, feedback } = req.body;

  const application = await Application.findById(applicationId);
  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  application.status = status;
  application.feedback = feedback;
  await application.save();

  res.status(200).json({
    status: "success",
    message: "Application status updated successfully",
    application,
  });
});

// Get application by ID
const getApplicationById = catchAsync(async (req, res, next) => {
  const { applicationId } = req.params;

  const application = await Application.findById(applicationId).populate(
    "job applicant"
  );
  if (!application) {
    return next(new AppError("Application not found", 404));
  }

  res.status(200).json({
    status: "success",
    application,
  });
});

module.exports = {
  applyForJob,
  getJobApplications,
  getUserApplications,
  updateApplicationStatus,
  getApplicationById,
};