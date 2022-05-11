const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');


router.route('/')
    .get(statesController.allStates)
    .post(statesController.createNewState)
    //.put(statesController.updateState)
router.route('states/:state/funfact')
    .patch(statesController.updateState)
router.route('/:code/')
    .delete(statesController.deleteState)
    .get(statesController.getState)
router.route('/:code/capital')
    .get(statesController.getStateCapital)
router.route('/:code/admission')
    .get(statesController.getStateAdmission)
router.route('/:code/population')
    .get(statesController.getStatePopulation)
router.route('/:code/nickname')
    .get(statesController.getStateNickname)
router.route('/:code/?contig=true')
    .get(statesController.getContiguousStates)
router.route('/:code/?contig=false')
    .get(statesController.getNonContiguousStates)
module.exports = router;
