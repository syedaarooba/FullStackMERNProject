import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// DELETE doctor
// ✅ DELETE doctor with Cloudinary cleanup
// ✅ DELETE doctor with Cloudinary + appointment cleanup
const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Find doctor first
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // 🧹 Delete doctor profile image
    if (doctor.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(doctor.imagePublicId);
        console.log("✅ Doctor profile image deleted");
      } catch (err) {
        console.log("⚠️ Cloudinary doctor image delete error:", err.message);
      }
    }

    // 🧹 Delete all appointment images of that doctor
    const doctorAppointments = await appointmentModel.find({ docId: doctorId });

    for (const appointment of doctorAppointments) {
      if (appointment.reportImagePublicId) {
        try {
          await cloudinary.uploader.destroy(appointment.reportImagePublicId);
          console.log(
            "🗑️ Deleted appointment image:",
            appointment.reportImagePublicId
          );
        } catch (err) {
          console.log("⚠️ Error deleting appointment image:", err.message);
        }
      }
    }

    //  Delete all appointments of that doctor
    await appointmentModel.deleteMany({ docId: doctorId });

    //  Delete doctor record
    await doctorModel.findByIdAndDelete(doctorId);

    res.json({
      success: true,
      message: "Doctor and all related data deleted successfully!",
    });
  } catch (error) {
    console.log("Error in deleteDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};

//get single doctor info
const getDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor)
      return res.json({ success: false, message: "Doctor not found" });

    res.json({ success: true, doctor });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE doctor info
const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updateData = req.body;

    // Parse address JSON if needed
    if (updateData.address) {
      updateData.address = JSON.parse(updateData.address);
    }

    // Get existing doctor first
    const existingDoctor = await doctorModel.findById(doctorId);
    if (!existingDoctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // If new image uploaded
    if (req.file) {
      // 🧹 Delete old image from Cloudinary
      if (existingDoctor.imagePublicId) {
        try {
          await cloudinary.uploader.destroy(existingDoctor.imagePublicId);
        } catch (err) {
          console.log("Cloudinary delete error:", err.message);
        }
      }

      // Upload new image
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
      updateData.imagePublicId = imageUpload.public_id; // Save new public ID
    }

    // If password is being changed
    if (updateData.password && updateData.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(updateData.password, salt);
      updateData.password = hashedPassword;
    } else {
      delete updateData.password; // Don’t overwrite existing password
    }

    // Update doctor record
    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      doctorId,
      updateData,
      {
        new: true,
      }
    );

    res.json({
      success: true,
      message: "Doctor updated successfully with image update!",
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log("Error in updateDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API for adding Doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Check if email already exists in database
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({
        success: false,
        message: "Email already in use. Please use another email.",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password (at least 8 characters)",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    const imagePublicId = imageUpload.public_id;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      imagePublicId,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (error) {
    //  Handle MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      return res.json({
        success: false,
        message: "This email is already registered. Please use another email.",
      });
    }

    console.log("Error in addDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse(),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
  deleteDoctor,
  updateDoctor,
  getDoctor,
};
