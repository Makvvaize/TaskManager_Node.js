const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-errors')


const getAllTasks = asyncWrapper ( async(req,res)=>{

    const tasks = await Task.find({})
    res.status(200).json({tasks})

})

const createNewTask = asyncWrapper (async (req,res)=>{

    const task = await Task.create(req.body)
    res.status(201).json({task})

})

const getTask = asyncWrapper (async (req,res, next)=>{

        const {id:taskID} = req.params
        const singleTask = await Task.findOne({_id:taskID})
        if(!singleTask){
             return next(createCustomError('No task with the ID', 404))
            // return res.status(404).json({msg:'No task with the ID '})
        }
        res.status(200).json({singleTask})
    
})

const updateTask = asyncWrapper (async (req,res,next)=>{
        const {id:taskID} = req.params
        const updatedTask = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true , runValidators:true})
        if(!updatedTask){
            return next(createCustomError('No task with the ID', 404))
        }
        res.status(200).json({updatedTask})
})

const deleteTask = asyncWrapper (async (req,res,next)=>{
        const {id:taskID} = req.params
        const deletedTask = await Task.findOneAndDelete({_id:taskID})
        if(!deletedTask){
            return next(createCustomError('No task with the ID', 404))
        }
        res.status(200).json({deletedTask})
    
})



module.exports = {
    getAllTasks,
    createNewTask,
    getTask,
    updateTask,
    deleteTask
}