const req = require('express/lib/request');
const res = require('express/lib/response');
const State = require('../model/State');

const data = {};
const data1 = require('../model/states.json');


const allStates = async (req,res) => {
    // const states = await State.find();
    // if(!states) return res.status(204).json({'message': 'no states found'});
    // res.json(states);
 
    res.json(data1);
}

const createNewState = async (req,res) => {
    if(!req?.body?.code){
        return res.status(400).json({'message': 'code required'});
    }
    

    try{
        const result = await State.create({
            "code": req.body.code,
            "funfact": req.body.funfact
        });


        res.status(201).json(result);
    }catch(err){
        console.error(err);
    }
    
    
    
}

const updateState = async (req, res) => {
    if(!req?.body?.stateCode) {
        return res.status(400).json({'message': 'code parameter is required'});

    }
    
    const state = await State.findOne({_stateCode: req.body.code}).exec();

    if(!state){
        return res.status(204).json({
            'message': `code ${req.body.stateCode} not found`
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
    if(!req?.body?.code) {
        return res.status(400).json({'message': 'code required'});

    }

    const state = await State.findOne({_code: req.body.code}).exec();

    if(!state){
        return res.status(204).json({
            'message': `code ${req.body.code} not found`
        });
    }

    const result = await employee.deleteOne({_code: req.body.code});
    res.json(result);
    //res.json({ "state": req.body.state});
}

const getState = async (req, res) => {
    if(!req?.body?.code) {
        return res.status(400).json({'message': 'code required'});
    }
    
    const state = await State.findOne({_code: req.params.code}).exec();
    if(!state){
        return res.status(204).json({
            'message': `code ${req.params.code} not found`
        });
    }
    
    //stateName = data1.find(code => code === code);


    res.json(stateName);
    
    //res.json({ "state": req.params.state});
}
const getStateCapital = async (req,res) => {
    const state = await State.findOne({_code: req.params.code}).exec();
    if(!state){
        return res.status(204).json({
            'message': `code ${req.params.code} not found`
        });
    }
    
      

    res.json({
    });
    //res.json(data.states.capital_city);
    
    
}

const getStateNickname = async (req,res) =>{
    const state = await State.findOne({_code: req.params.code}).exec();
    if(!state){
        return res.status(204).json({
            'message': `code ${req.params.code} not found`
        });
    }
    res.json(data.states);
    res.json(data.states.population);
}

const getStatePopulation = async (req,res) => {
    const state = await State.findOne({_code: req.params.code}).exec();
    if(!state){
        return res.status(204).json({
            'message': `code ${req.params.code} not found`
        });
    }
    res.json(data.states);
    res.json(data.states.nickname);
}

const getContiguousStates = async (req,res) => {
    res.json(data.states);
}
const getNonContiguousStates = async (req,res) =>{
    console.log("no");
}


module.exports = {
    allStates,
    createNewState,
    updateState,
    deleteState,
    getState,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getContiguousStates,
    getNonContiguousStates
}