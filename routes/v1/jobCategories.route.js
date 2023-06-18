const express = require("express");
const jobCategoriesControllers = require("../../controllers/jobCategories.controller");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/veiwCount");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("tools found with id");
// });

// router.post("/", (req, res) => {
//   res.send("tool added");
// });

router
  .route("/")
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(jobCategoriesControllers.getAllCategories)

  /**
   * @api {post} /tools save a tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(jobCategoriesControllers.saveACategories);


router.route("/test")
  .post(jobCategoriesControllers.test)
  .get(jobCategoriesControllers.testGet);

router
  .route("/:id")
  .get(viewCount, limiter, jobCategoriesControllers.getACategoryDetail)
  .put(jobCategoriesControllers.updateACategory)
  .delete(jobCategoriesControllers.deleteACategory);

module.exports = router;
