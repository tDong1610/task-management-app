import { StatusCodes } from 'http-status-codes'
import { cardService } from '../services/cardService.js'

const createNew = async(res, req, next) => {
    try{

        const createdCard = await cardService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(createdCard)


    }catch(error){next(error)}
}


export const cardController = {
    createNew,
}