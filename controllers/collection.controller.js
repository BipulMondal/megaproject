import Collection from "../models/collection.schema.js"
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'

/**************************************************************** 
 * @CREATE_COLLECTION
 * @route http://localhost:4000/api/collection
 * @description check for token and populate req.user 
 * @parameters 
 * @return User object
******************************************************************/

export const createCollection = asyncHandler(async (req, res) => {
    //take collection name from fronted
    const {name} = req.body

    if(!name){
        throw new CustomError("Collection name is required", 400)
    }

    //add this name to database
    const collection = await Collection.create({
        name
    })
    //send this response value to frontend
    res.status(200).json({
        success:true,
        message: "Collection created with successfully",
        collection
    })

})


export const updateCollection = asyncHandler(async (req, res) => {
    //existing value to be updates
    const {id: collectionId} = req.params
    //new valuetoget update
    const {name} =req.body

    if(!name){
        throw new CustomError("Collection name is required", 400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name,
        },
        {
            new: true,
            runValidators: true
        }
    )

    if(!updatedCollection){
        throw new CustomError("Collection not found", 400)
    }

    //send response to front end
    res.status(200).json({
        success: true,
        message: "Collection Updated Successfully",
        updateCollection
    })

})

export const deleteCollection = asyncHandler(async (req, res) => {
    const {id: collectionId} = req.params

    const collectionToDelete = await Collection.findByIdAndDelete(collectionId)

    if(!collectionToDelete){
        throw new CustomError("Collection not found", 400)
    }

    collectionToDelete.remove()
    //send response tofront end
    res.status(200).json({
        success: true,
        message: "Collection Deleted Successfully"
    })
})


export const getAllCollection = asyncHandler(async (req, res) => {
    const collections = await Collection.find()

    if(!collections){
        throw new CustomError("No Collection Found")
    }

    res.status(200).json({
        success: true,
        collections
    })
})