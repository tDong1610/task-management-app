import { columnModel } from "../models/columnModel.js"
import { boardModel } from "../models/boardModel.js"
import { cardModel } from "../models/cardModel.js"
import { StatusCodes } from "http-status-codes"
import ApiError from "../utils/ApiError.js"

const createNew = async(reqBody) =>{
    try{
        const newColumn = {
            ...reqBody
        }
        const createdColumn = await columnModel.createNew(newColumn)
        const getNewColumn = await columnModel.findOnebyId(createdColumn.insertedId)

        if (getNewColumn) {
            getNewColumn.cards = []
            
            await boardModel.pushColumnOrderIds(getNewColumn)
        }
        return getNewColumn
    }catch(error) {
        throw error
    }
}
const update = async(columnId,reqBody) =>{
    try{
        const updateData = {
            ...reqBody,
            upDatedAt: Date.now
        }
       const updatedColumn = await columnModel.update(columnId, updateData)

        return updatedColumn
    }catch(error) {
        throw error
    }
}
const deleteItem = async(columnId) =>{
    try{
        const targetColumn = await columnModel.findOnebyId(columnId)
        if (!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column is not found')
        }
        await columnModel.deleteOneById(columnId)
        await cardModel.deleteManyById(columnId)
        await boardModel.pullColumnOrderIds(targetColumn)
        return {deleteResult: 'Column and its card deleted succesfully'}
    }catch(error) {
        throw error
    }
}


export const columnService = {
    createNew,
    update,
    deleteItem
}