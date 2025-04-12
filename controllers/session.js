const {prisma} = require('../utils/prismaExport')

async function avilableSessions(req, res) {
   try {
        const avalibleSession = await prisma.therapySessions.findMany({
            where: {
                reserved: false
            }
        })
        res.json(avalibleSession)
    }
    catch(err){
       res.status(500).json("something went wrong")
    }
}
async function reserveSession(req, res) {
    try{
        const reservedSession = await prisma.therapySessions.update({where:{id:req.body.seesionId}, data:{reserved:true, employeeId:req.user.employeeId}})
        res.json(reservedSession)
    }
    catch(err){
        res.status(500).json(err)
    }
}
async function currenUserSession(req, res) {
    const usersSessions = await prisma.therapySessions.findMany({where:{
        employeeId:req.user.employeeId
        }})
    res.json(usersSessions)
}
module.exports = {
    avilableSessions,
    reserveSession,
    currenUserSession,
}
