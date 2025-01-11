const express = require("express");
const router = express.Router();
const { addSetting, updateSetting, getSetting } = require("../controllers/Setting");

router.post("/addSetting", addSetting);
router.get("/getSetting", getSetting);
router.put("/updateSetting", updateSetting)

module.exports = router;
