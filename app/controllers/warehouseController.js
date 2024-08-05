import {viewAllInformation,InsertNewDataModel,modelsOfUpdate,modelDelete,modelByGetId} from '../models/warehouseModel.js'


function findId(req) {
    return req.params.id; // Devuelve el ID del parámetro de la solicitud
}

export const getButAll=async (_,res)=>{
    const wharehousesInfo=await viewAllInformation()
     // console.log(wharehousesInfo[0])  //solo estamos viendo que me esta trayendo con el [0] desestructuramos para que solo nos traiga un array 
     try{
         if(wharehousesInfo){
             res.json({
                 message: `all info in your view`,
                 wharehousesInfo
             })
         }
     }catch(err){
         res.json({
             message:`error obtaining the infomation${err}`
         })
     }
 }

 export const getById=async(req,res)=>{
    try {
        const id=findId(req)
    const data= await modelByGetId(id)
        if(!data){
            res.status(404).send(
                'the information do not finded'
            )
        }else{res.status(200).json({
            message:'information in your screen',
            data
        })}
        
    } catch (error) {
        throw new Error(`can't find the informacion was a error `,error)
    } 
}

 export const InsertNewDataController=async(req,res)=>{
    const {name,location,vehicles_id}=req.body
    const viewWarehouse=await InsertNewDataModel(name,location,vehicles_id)
    
    try {
        res.status(201).json({
            message:"created success",
            viewWarehouse
        })
    } catch (error) {
        throw new Error("no insert nothing in the post function controller ",error)   
    }
}

export const UpdateById = async (req, res) => {
    const dataForUpdate = {
        name: req.body.name,
        location: req.body.location,
        vehiclesId: req.body.vehicles_id
    };

    try {
        // Llama a la función para actualizar y obtener el dato actualizado
        const dataThatUpdate = await modelsOfUpdate(dataForUpdate.name, dataForUpdate.location, dataForUpdate.vehiclesId, findId(req));

        // Envia una respuesta exitosa
        res.status(200).json({
            message: "Update successful",
            data: dataThatUpdate
        });
    } catch (err) {
        // Envia una respuesta de error adecuada
        res.status(500).json({
            message: "Error from controller of Update",
            error: err.message
        });
    }
};


export const deleteById=async(req,res)=>{
    const deleteObject=await modelDelete(findId(req))
    try {
        res.status(201).json({
         message:'object was deleted',
         deleteObject
         
    })
} catch (error) {
        throw new Error(`error in try to delete object`,error)
    }
   
}