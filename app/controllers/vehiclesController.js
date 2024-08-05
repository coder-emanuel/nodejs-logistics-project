import { viewAllInformation,modelByGetId,InsertNewDataModel,modelsOfUpdate,modelDelete} from "../models/vehiclesModel.js"


function findId(req) {
    return req.params.id; // Devuelve el ID del parámetro de la solicitud
}

export const getButAll=async (_,res)=>{
    const vehiclesInfo=await viewAllInformation()
     // console.log(wharehousesInfo[0])  //solo estamos viendo que me esta trayendo con el [0] desestructuramos para que solo nos traiga un array 
     try{
         if(vehiclesInfo){
             res.json({
                 message: `all info in your view`,
                 vehiclesInfo
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
        throw new Error(`can't find the informacion was a error vehicles`,error)
    } 
}


export const InsertNewDataController=async(req,res)=>{
    const {model,year,drivers_id}=req.body
    const viewDrivers=await InsertNewDataModel(model,year,drivers_id)
    
    try {
        res.status(201).json({
            message:"created success",
            viewDrivers
        })
    } catch (error) {
        throw new Error("No insert nothing in the post function controller vehicles",error)   
    }
}

export const UpdateById = async (req, res) => {
    const dataForUpdate = {
        model: req.body.model,
        year: req.body.year,
        driversId: req.body.drivers_id
    };

    try {
        // Llama a la función para actualizar y obtener el dato actualizado
        const dataThatUpdate = await modelsOfUpdate(dataForUpdate.model, dataForUpdate.year, dataForUpdate.driversId, findId(req));

        // Envia una respuesta exitosa
        res.status(203).json({
            message: "Updated successfully",
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