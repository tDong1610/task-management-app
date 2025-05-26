import { StatusCodes } from 'http-status-codes'
import { boardService } from '../services/boardService.js'
//import ApiError from '~/utils/ApiError'

const createNew = async(req, res, next) => {
    try{
       //console.log('req.body: ',req.body)
        // console.log('req.query: ',req.query)
        //console.log('req.params: ',req.params)

        const createdBoard = await boardService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createdBoard)


    }catch(error){next(error)}
}

const getDetails = async(req, res, next) => {
    try{
        const boardId = req.params.id
        //console.log('req.params: ',req.params)

        const board = await boardService.getDetails(boardId)

        res.status(StatusCodes.OK).json(board)


    }catch(error){next(error)}
}
const update = async(req, res, next) => {
    try{
        const boardId = req.params.id
        //console.log('req.params: ',req.params)

        const updatedBoard = await boardService.update(boardId, req.body)

        res.status(StatusCodes.OK).json(updatedBoard)


    }catch(error){next(error)}
}
const moveCardToDifferentColumn = async(req, res, next) => {
    try{
        const updatedBoard = await boardService.moveCardToDifferentColumn(req.body)

        res.status(StatusCodes.OK).json(updatedBoard)


    }catch(error){next(error)}
}


export const boardController = {
    createNew,
    getDetails,
    update, 
    moveCardToDifferentColumn
}