import { viewAllInformation,modelByGetId,InsertNewDataModel,modelsOfUpdate,modelDelete} from "../models/driversModel.js"


function findId(req) {
    return req.params.id; // Devuelve el ID del parámetro de la solicitud
}

export const getButAll=async (_,res)=>{
    const driversInfo=await viewAllInformation()
     // console.log(wharehousesInfo[0])  //solo estamos viendo que me esta trayendo con el [0] desestructuramos para que solo nos traiga un array 
     try{
         if(driversInfo){
             res.json({
                 message: `all info in your view`,
                 driversInfo
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
        throw new Error(`can't find the informacion was a error drivers`,error)
    } 
}


export const InsertNewDataController=async(req,res)=>{
    const {name,warehouses_id}=req.body
    const viewDrivers=await InsertNewDataModel(name,warehouses_id)
    
    try {
        res.status(201).json({
            message:"created success",
            viewDrivers
        })
    } catch (error) {
        throw new Error("no insert nothing in the post function controller drivers",error)   
    }
}

export const UpdateById = async (req, res) => {
    const dataForUpdate = {
        name: req.body.name,
        warehousesId: req.body.warehouses_id
    };

    try {
        // Llama a la función para actualizar y obtener el dato actualizado
        const dataThatUpdate = await modelsOfUpdate(
            dataForUpdate.name,
            dataForUpdate.warehousesId,
            findId(req)
        );

        // Envía una respuesta exitosa
        res.status(203).json({
            message: "Actualización exitosa",
            data: dataThatUpdate
        });
    } catch (err) {
        // Envía una respuesta de error adecuada
        res.status(500).json({
            message: "Error en el controlador de actualización",
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