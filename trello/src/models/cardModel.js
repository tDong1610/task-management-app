import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '../utils/validators.js'
import { GET_DB } from '../config/mongodb.js'
import { ObjectId } from 'mongodb'
import { columnController } from '../controllers/columnController.js'
// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().optional(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})
const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']
const validateBeforeCreate = async(data) => {
  return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    console.log('Data before validation:', data)

    const validData = await validateBeforeCreate(data)

    const newCardAdd = {
      ...validData,
      boardId: new ObjectId(validData.boardId),
      columnId: new ObjectId(validData.columnId)
    }

    const createdCard = await GET_DB()
      .collection(CARD_COLLECTION_NAME)
      .insertOne(newCardAdd)

    if (!createdCard.acknowledged) {
      throw new Error('Failed to create new card')
    }

    return createdCard
  } catch (error) {
    console.error('Error in createNew cardModel:', error)
    throw error
  }
}

const findOnebyId = async (id) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })

    if (!result) {
      throw new Error(`Card with id ${id} not found`)
    }

    return result
  } catch (error) {
    console.error('Error in findOnebyId cardModel:', error)
    throw error
  }
}

const update = async (cardId, updateData) => {
  try{
    Object.keys(updateData).forEach(fieldName => {
      if (INVALID_UPDATE_FIELDS.includes(fieldName))
        delete updateData[fieldName]
    })
    if (updateData.cardOrderIds) {
      updateData.cardOrderIds = updateData.cardOrderIds.map(_id => {new ObjectId(_id)})
    }
    if(updateData.columnId) updateData.columnId = new ObjectId(updateData.columnId)
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(cardId), },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    return result
  }catch(error){
    throw new Error(error)
  }
}
const deleteManyById = async (columnId) => {
  try {
    const result = await GET_DB().collection(CARD_COLLECTION_NAME).deleteMany({
      columnId: new ObjectId(columnId)
    })

    return result
  } catch (error) {
    console.error('Error in deleteManyById cardModel:', error)
    throw error
  }
}

export const cardModel = {
  CARD_COLLECTION_NAME,
  CARD_COLLECTION_SCHEMA,
  createNew,
  findOnebyId,
  update,
  deleteManyById
}