const setting = require("../models/SettingModel");

exports.addSetting = async (req, res) => {
  try {
    const { userId, budget, categories } = req.body;

    if (!userId || !budget || !categories) {
      res.status(500).json({
        success: false,
        messsage: "All fields are required",
      });
    }

    const Settings = await setting.create({
      userId: userId,
      budget: budget,
      categories: categories,
    });
    res.status(500).json({
      success: true,
      Settings,
      messsage: "Settings added successfully",
    });
  } catch (error) {
    console.log("error>>", error);
    res.status(500).json({
      success: false,
      messsage: error.messsage,
    });
  }
};

exports.getSetting = async (req, res) => {
  try {
    const { userId } = req.body;

    const Settings = await setting.findOne({
      userId,
    });

    console.log(Settings);
    res.status(500).json({
      success: true,
      data: Settings,
      messsage: "data fetched successfully",
    });
  } catch (error) {
    console.log("error>>", error);
    res.status(500).json({
      success: false,
      messsage: error.messsage,
    });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const { userId, budget, categories } = req.body;

    const latestSetting = await setting
      .findOne({ userId })
      .sort({ createdAt: -1 }); 

    if (!latestSetting) {
      return res.status(404).json({
        success: false,
        message: "No settings found for this user",
      });
    }

    const updatedSetting = await setting.findOneAndUpdate(
      { _id: latestSetting._id }, 
      { budget, categories }, 
      { new: true } 
    );

    res.status(200).json({
      success: true,
      updatedSetting,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.log("error>>", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
