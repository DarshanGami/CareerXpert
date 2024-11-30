const { AppError } = require("../middlewares/errorHandler.js");
const { catchAsync } = require("../middlewares/catchAsync.js");
const { Company } = require("../models/companyModel.js");
const { Review } = require("../models/reviewModel.js");

const registerCompany = catchAsync(async (req, res, next) => {
  try {
    const { name, about } = req.body;
    // console.log(req.body);
    // Check if required fields are provided
    if (!name || !about) {
      return next(new AppError("Empty required field", 400));
    }

    const company = new Company({
      ...req.body,
      registeredBy: req.user?._id || null,
    });

    // Save the new company to the database
    await company.save();

    res.status(200).json({
      status: "success",
      message: "Company registered successfully",
      company,
    });
  } catch (err) {
    res.status(400).json({
      status: "failure",
      message: err.message,
    });
  }
});

// Retrieve all registered companies
const getAllCompanies = catchAsync(async (req, res, next) => {
  const comapanies = await Company.find();

  res.status(200).json({
    status: "success",
    message: "These are all the registered companies",
    comapanies,
  });
});

// Get a specific company by ID
const getCompanyById = catchAsync(async (req, res, next) => {
  // Populate reviews if available
  const company = await Company.findById(req.params.id).populate("reviews");

  // Check if company exists
  if (!company) {
    return next(new AppError("Company not found", 400));
  }

  res.status(200).json({
    status: "success",
    message: "here is the company",
    company,
  });
});

// Get companies registered by the current user
const getMyCompanies = catchAsync(async (req, res, next) => {
  // Find companies by user ID
  const companies = await Company.find({ registeredBy: req.user?._id || null });

  res.status(200).json({
    status: "success",
    message: "Your companies...",
    companies,
  });
});

// Update an existing company
const updateCompany = catchAsync(async (req, res, next) => {
  const isExits = await Company.findById(req.params.id);
  // Check if company exists

  if (!isExits) {
    return next(new AppError("Company not found", 404));
  }

  const updatedCompany = await Company.findOneAndUpdate(
    // Check if company belongs to user
    { _id: req.params.id, registeredBy: req.user?._id || null },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedCompany) {
    // Ensure user owns the company
    return next(new AppError("You can only update your companies", 403));
  }

  res.status(200).json({
    status: "success",
    updatedCompany,
  });
});

// Delete a company
const deleteCompany = catchAsync(async (req, res, next) => {
  const isExits = await Company.findById(req.params.id);

  // Check if company exists
  if (!isExits) {
    return next(new AppError("Company not found", 404));
  }

  const deleteCompany = await Company.findOneAndDelete({
    _id: req.params.id,
    registeredBy: req.user?._id || null,
  });

  // Ensure user owns the company
  if (!deleteCompany) {
    return next(new AppError("You can only delete your companies", 403));
  }

  res.status(200).json({
    status: "success",
    message: "company deleted successfully",
  });
});

module.exports = {
  registerCompany,
  getAllCompanies,
  getCompanyById,
  getMyCompanies,
  updateCompany,
  deleteCompany
};