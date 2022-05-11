const State = require('../model/State');

const data = {};
data.states = require('../model/states.json');


const allStates = async (req,res) => {
    const states = await State.find();
    if(!states) return res.status(204).json({'message': 'no states found'});
    res.json(states);
 
    res.json(data.states)
}

const createNewState = async (req,res) => {
    if(!req?.body?.stateCode){
        return res.status(400).json({'message': 'stateCode required'});
    }
    

    try{
        const result = await State.create({
            "stateCode": req.body.stateCode,
            "funfact": req.body.funfact
        });


        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
    
    
    /*res.json({
        "state": req.states.state,
        "population": req.states.population
    });
    */
}

const updateState = async (req, res) => {
    if(!req?.body?.stateCode) {
        return res.status(400).json({'message': 'stateCode parameter is required'});

    }
    
    const state = await State.findOne({_stateCode: req.body.stateCode}).exec();

    if(!state){
        return res.status(204).json({
            'message': `stateCode ${req.body.stateCode} not found`
        });
    }
    if(req.body?.stateCode){
        state.stateCode = req.body.stateCode;
    }
    if(req.body?.funFacts){
        state.funFacts = req.body.funFacts;
    }

    const result = await state.save();
    res.json(result);
    
    
    
    
    /*res.json({
        "state": req.states.state,
        "population": req.states.population
    });
    */
}

const deleteState = async (req, res) => {
    if(!req?.body?.stateCode) {
        return res.status(400).json({'message': 'stateCode required'});

    }

    const state = await State.findOne({_stateCode: req.body.stateCode}).exec();

    if(!state){
        return res.status(204).json({
            'message': `stateCode ${req.body.stateCode} not found`
        });
    }

    const result = await employee.deleteOne({_stateCode: req.body.stateCode});
    res.json(result);
    //res.json({ "state": req.body.state});
}

const getState = async (req, res) => {
    /*if(!req?.params?.stateCode) {
        return res.status(400).json({'message': 'stateCode required'});

    }
    */
    const state = await State.findOne({_stateCode: req.params.stateCode}).exec();
    if(!state){
        return res.status(204).json({
            'message': `stateCode ${req.params.stateCode} not found`
        });
    }

    res.json(state);
    
    //res.json({ "state": req.params.state});
}


module.exports = {
    allStates,
    createNewState,
    updateState,
    deleteState,
    getState
}