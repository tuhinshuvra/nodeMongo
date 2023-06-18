const express = require('express')
const router = express.Router()
const jobController = require('../../controllers/job.controller')

router.route('/bulk-update').patch(jobController.bulkUpdateJob)
router.route('/bulk-delete').delete(jobController.bulkDeleteJob)


router.route('/')
    .get(jobController.getJobs)
    .post(jobController.createJob)


router.route('/:id')
    .patch(jobController.updateAJobById)
    .delete(jobController.deleteAJobById)

module.exports = router;                    