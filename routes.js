const express = require("express");
const router = express.Router();

const cState = require("./controllers/stateController");
router.get("/api/state", cState.get);

const cTask = require("./controllers/taskController");
router.get("/api/task/byUserId/:user_id", cTask.get);
router.get("/api/task/byColumnID/:column_id", cTask.get_column);
router.post("/api/task", cTask.post);
router.put("/api/task", cTask.put);
router.delete("/api/task", cTask.delete);

const cColumn = require("./controllers/columnController");
//router.get("/api/column/:user_id", cColumn.get);
router.get("/api/column/", cColumn.get); //временно
router.post("/api/column", cColumn.post);
router.put("/api/column", cColumn.put);
router.delete("/api/column", cColumn.delete);

const cAuth = require("./controllers/authController")
router.post("api/auth/register", cAuth.register)
router.post("api/auth/login", cAuth.login)

module.exports = router;


