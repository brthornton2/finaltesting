const req = require('express/lib/request');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const State = require('../model/State');

const data = {};
data.states = require('../model/states.json');


const allStates = async (req,res) => {
    // const states = await State.find();
    // if(!states) return res.status(204).json({'message': 'no states found'});
    // res.json(states);
 
    res.json(data.states);
}

const createNewState = async (req,res) => {
    if(!req?.body?.state){
        return res.status(400).json({'message': 'code required'});
    }
    

    try{
        const result = await State.create({
            "code": req.body.state,
            "funfact": req.body.funfact
        });


        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
    
    
    
}

const updateState = async (req, res) => {
    if(!req?.body?.state) {
        return res.status(400).json({'message': 'code parameter is required'});

    }
    
    const state = await State.findOne({state: req.body.state}).exec();

    if(!state){
        return res.status(204).json({
            'message': `code ${req.body.state} not found`
        });
    }
    if(req.body?.state){
        state.stateCode = req.body.stateCode;
    }
    if(req.body?.funFacts){
        state.funFacts.push(req.body.funFacts);
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
    if(!req?.body?.state) {
        return res.status(400).json({'message': 'code required'});

    }

    const state = await State.findOne({_code: req.body.state}).exec();

    if(!state){
        return res.status(204).json({
            'message': `code ${req.body.state} not found`
        });
    }

    const result = await employee.deleteOne({_code: req.body.state});
    res.json(result);
    //res.json({ "state": req.body.state});
}

const getState = async (req, res) => {
    
    const state = data.states.find(state => state.code === req.params.state);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    res.json(state);
    
    /*if(!req?.body?.code) {
        return res.status(400).json({'message': 'code required'});
    }
    
    const state = await State.findOne({_code: req.params.code}).exec();
    if(!state){
        return res.status(204).json({
            'message': `code ${req.params.code} not found`
        });
    }
    
    function getStateByCode(code) {
        return data.filter(
            function(data)
                { return data.code == code }
        );
      }
    //stateName = data.states.find(code => code === code);
    var found = getStateByCode(req.body.code);

    res.json(found);
    */
    //res.json({ "state": req.params.state});
}
const getStateCapital = async (req,res) => {
    const refinedParam = req.params.state.toUpperCase();
    
    
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    
    res.json({
        "state": state.state, "capital": state.capital_city
    });
    
    
}

const getStateNickname = async (req,res) =>{
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    res.json({
        "state": state.state, "nickname": state.nickname
    });
}

const getStatePopulation = async (req,res) => {
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    res.json({
        "state": state.state, "population": JSON.stringify(state.population).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    });
    
}
const getStateAdmission = async (req,res) => {
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    
    res.json({
        "state": state.state, "admitted": state.admission_date
    });
}
const getContiguousStates = async (req,res) => {
    
    
    res.json(data.states);
}
const getNonContiguousStates = async (req,res) =>{
    const AK = data.states.find(stat => stat.code === AK);
    const HI = data.states.find(stat => stat.code === HI);
}
const getFunFact = async (req,res) =>{
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!state){
        return res.status(400).json({
            "message": `Invalid state abbreviation parameter`
        })
    }
    res.json(state);
}
const postFunFact = async => {
    if(!req?.body?.funfacts){
        return res.status(400).json({
            "message": "State fun facts value required"
        })
    }
    res.status(400).json({
        "message": "State fun facts value must be an array"
    })
}
const patchFunFact = async => {
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    if(!req?.body?.index){
        return res.status(400).json({
            "message": "State fun facts index required"
        })
    }

    res.status(400).json({
        "message": `No fun facts found for ${state}`
    })

}
const deleteFunFact = async => {
    const refinedParam = req.params.state.toUpperCase();
    const state = data.states.find(stat => stat.code === refinedParam);
    res.status(400).json({
        "message": `No fun facts found for ${state}`
    })
}

module.exports = {
    allStates,
    createNewState,
    updateState,
    deleteState,
    getState,
    getFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getContiguousStates,
    getNonContiguousStates,
    getStateAdmission,
    postFunFact,
    patchFunFact,
    deleteFunFact
}