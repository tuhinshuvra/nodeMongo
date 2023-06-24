const express = require('express')
const router = express.Router();
const jobController = require('../../controllers/job.controller');
const uploader = require('../../middleware/uploader');


// router.post("/file-upload", uploader.single("image"), jobController.fileUpload);
router.post("/file-upload", uploader.array("image"), jobController.fileUpload);

router.route('/bulk-update').patch(jobController.bulkUpdateJob)
router.route('/bulk-delete').delete(jobController.bulkDeleteJob)


router.route('/')
    .get(jobController.getJobs)
    .post(jobController.createJob)


router.route('/:id')
    .patch(jobController.updateAJobById)
    .delete(jobController.deleteAJobById)

module.exports = router;                    