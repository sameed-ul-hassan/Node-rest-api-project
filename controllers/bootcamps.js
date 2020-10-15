const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyn");
const Bootcamp = require("../models/Bootcamps");

// @des     Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    const bootcamps = await Bootcamp.find();
    res.status(201).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps,
    });
});

// @des     Get single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
        next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(201).json({
        success: true,
        data: bootcamp,
    });
});

// @des     Create new bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
        success: true,
        data: bootcamp,
    });
});

// @des     Update bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: bootcamp,
    });
});

// @des     Delete bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({
        success: true,
        data: {},
    });
});