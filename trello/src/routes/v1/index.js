import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute.js'
import { columnRoute } from '../v1/columnRoute.js'
import { cardRoute } from '../v1/cardRoute.js'
const Router = express.Router()

Router.get('/status', (req, res)=> {
    res.status(StatusCodes.OK).json({message:'APIs v1 are ready use'})
})
Router.use('/boards',boardRoute)

Router.use('/columns',columnRoute)

Router.use('/cards',cardRoute)

export const APIs_V1 = Router 