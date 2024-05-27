const validateTokenhandler = require("../middleware/validateTokenHandler")

const express = require("express");

const router = express.Router();

const { upload , viewById , deleteProperty , update , viewAll} = require("../controllers/propertyController")



router.post("/upload" , validateTokenhandler , upload)
router.get("/viewById" , validateTokenhandler , viewById)
router.delete("/deleteProperty" , validateTokenhandler , deleteProperty)
router.put("/update" , validateTokenhandler , update)
router.get("/viewAll" , viewAll)

module.exports = router;