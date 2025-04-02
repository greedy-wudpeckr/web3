import  express  from "express";
import { authMiddleware } from "./middleware";
import prismaClient from "db/clients";

const app = express();

app.post("/api/v1/website",authMiddleware,async(req ,res)=>{
    const userId = req.userId;
    const {url} = req.body;

    const data = await prismaClient.website.create({
        data:{
            url,
            userId
        }
    })
    res.json({
        msg : "hi there"
    })
})

app.get("/api/v1/website/status",authMiddleware,async(req,res)=>{
    const {websiteId} = req.query;
    const userId = req.userId;
    const data = await prismaClient.website.findFirst({
        where:{
            id : websiteId,
            userId
        },include:{
            ticks:true
        }
    })
    res.json({
        data
    })
})

app.get("/api/v1/websites",authMiddleware,async(req,res)=>{
    const userId = req.userId!;
    const data = await prismaClient.website.findMany({
        where:{
            userId
            disabled : false
        }
    })
    res.json({
        data
    })
})

app.delete("/api/v1/website/:website",authMiddleware,(req,res)=>{
    const {websiteId} = req.query!;
    const userId = req.userId;
    const data = await prismaClient.website.update({
        where : {
            id : websiteId,
            userId
        },
        data:{
            disabled : true
        }
    })
    res.json({
        msg : "data deleted successfully"
    })
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})