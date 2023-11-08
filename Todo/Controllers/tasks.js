const asyncWrapper = require('../Middlewares/async')
const {createCustomError} = require('../Error/custom-error')
const {createCustomSuccess} = require('../Success/custom-success')
const Task = require("../Models/task")

const getAllTasks = asyncWrapper(async (req,res)=>{
        const task = await Task.find({});
        res.status(200).json({task})
});

const getTask = asyncWrapper(async (req,res,next) => {

        const {id: taskID} = req.params;
        const task = await Task.findOne({_id: taskID});
        if(!task){
        //     return res.status(404).json({ msg: `No task with id :${taskID}`});
        // const error = new Error("Not Found");
        // error.status = 404;
        // return next(error)
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        // res.status(200).json({ task})  
        return next(createCustomSuccess(task,201))
});

const createTask = asyncWrapper(async(req,res) =>{
        const task = await Task.create(req.body);
        res.status(201).json({task});
});

const updateTask = asyncWrapper(async (req,res,next) =>{
    
        const {id : taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            new: true,
            runValidators: true,
        });
        if(!task){
        //     return res.status(404).json({msg: `No task with id: ${taskID}`})
        //     const error = new Error("Not Found");
        //     error.status = 404;
        //     return next(error)
                return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({task, nbHits: task.length})
});

const deleteTask = asyncWrapper(async (req,res,next) => {
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({_id:taskID});
        if(!task){
        //     return res.status(404).json({msg: `No task with id :${taskID}`});
        //    const error = new Error("Not Found");
        //    error.status = 404;
        //    return next(error)
                return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        res.status(200).json({task})
});

module.exports = {getAllTasks, getTask, createTask, updateTask, deleteTask}
