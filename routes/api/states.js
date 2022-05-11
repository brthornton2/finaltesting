const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');


router.route('/')
    .get(statesController.allStates)
    .post(statesController.createNewState)
    //.put(statesController.updateState)
router.route('/:state/funfact')
    .get(statesController.getFunFact)
    .post(statesController.postFunFact)
    .patch(statesController.patchFunFact)
    .delete(statesController.deleteFunFact)
router.route('/:state/')
    .delete(statesController.deleteState)
    .get(statesController.getState)
router.route('/:state/capital')
    .get(statesController.getStateCapital)
router.route('/:state/admission')
    .get(statesController.getStateAdmission)
router.route('/:state/population')
    .get(statesController.getStatePopulation)
router.route('/:state/nickname')
    .get(statesController.getStateNickname)
router.route('/:state/?contig=true')
    .get(statesController.getContiguousStates)
router.route('/:state/?contig=false')
    .get(statesController.getNonContiguousStates)
module.exports = router;
