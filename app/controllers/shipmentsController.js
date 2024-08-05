import { viewAllInformation,modelByGetId,InsertNewDataModel,modelsOfUpdate,modelDelete} from "../models/shipmentsModel.js"


function findId(req) {
    return req.params.id; // Devuelve el ID del parámetro de la solicitud
}

export const getButAll=async (_,res)=>{
    const shipmentsInfo=await viewAllInformation()
     // console.log(wharehousesInfo[0])  //solo estamos viendo que me esta trayendo con el [0] desestructuramos para que solo nos traiga un array 
     try{
         if(shipmentsInfo){
             res.json({
                 message: `all info in your view`,
                 shipmentsInfo
             })
         }
     }catch(err){
         res.json({
             message:`error obtaining the infomation${err}`
         })
     }
 }

 export const getById = async (req, res) => {
    try {
        const id = findId(req);
        const data = await modelByGetId(id);
        if (!data) {
            res.status(404).send('La información no fue encontrada');
        } else {
            res.status(200).json({
                message: 'Información encontrada',
                data
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'No se pudo encontrar la información, ocurrió un error',
            error: error.message
        });
    }
};



export const InsertNewDataController=async(req,res)=>{
    const {item,quantity,warehouses_id,vehicles_id,drivers_id}=req.body
    const viewDrivers=await InsertNewDataModel(item,quantity,warehouses_id,vehicles_id,drivers_id)
    
    try {
        res.status(201).json({
            message:"created success",
            viewDrivers
        })
    } catch (error) {
        throw new Error("no insert nothing in the post function controller drivers ",error)   
    }
}

export const UpdateById = async (req, res) => {
    const dataForUpdate = {
        item: req.body.item,
        quantity: req.body.quantity,
        warehousesId: req.body.warehouses_id,
        vehiclesId: req.body.vehicles_id,
        driversId: req.body.drivers_id 
    };

    try {
        // Llama a la función para actualizar y obtener el dato actualizado
        const dataThatUpdate = await modelsOfUpdate(
            dataForUpdate.item,
            dataForUpdate.quantity,
            dataForUpdate.warehousesId,
            dataForUpdate.vehiclesId,
            dataForUpdate.driversId,
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