const axios = require('axios');
const { request } = require('../app');

const { Clients, Messages, messagesClient } = require('../db')

const getDbInfo = async () => {
    return await Clients.findAll({
        include: {
            model: Messages,
            attributes: ['message', 'time'],
            through: {
                attributes: [],
            }
        },
    });
}


const getClients = async (req, res) => {

    let clientsAll = await getDbInfo();
    if (clientsAll.length === 0) {
            
            Clients.findOrCreate({
                where: {
                    name: 'Kevin',
                    phone: '+573138729265',
                    countrie: 'Colombia'
                }
            })
    }

        try {
            res.status(200).send(clientsAll)
        } catch (error) {
            res.status(404).send(error)
        }   
} 

const getClientsById = async (req, res) => {
    const { idClient } = req.params;
    
     let clientsAll = await getDbInfo();
     if (idClient) {
        let clientInfo = await clientsAll.find(a => a.dataValues.id == idClient)
        console.log(clientInfo)
         res.status(200).send(clientInfo)
     } else {
         res.status(400).send('no hay cliente con ese id')
     }
}

const postClient = async (req, res) => {
    let { name, phone, countrie } = req.body;
 
    let client = await Clients.create({
        name,
        phone,
        countrie,
    });


    res.send('cliente creado')
}

const getSms = async () => {
    return await Messages.findAll({
        include: {
            model: Clients,
            attributes: ['id', 'name', 'phone', 'countrie'],
            through: {
                attributes: [],
            }
        },
    });

}

const getMessages = async (req, res) => {

    let smsAll = await getDbInfo();

    try {
        res.status(200).send(smsAll)
    } catch (error) {
        res.status(404).send(error)
    }
}

const postMessage = async (req, res) => {
    let { message, time, id, number } = req.body;
 
    const accountSid = process.env.ACCOUNT_SID
    const authToken = process.env.AUTH_TOKEN
    
    const clientSms = require('twilio')(accountSid, authToken)
    
    try {
        await clientSms.messages.create({
            to: '+'+number,
            from: process.env.MYPHONE,
            body: message
            
        })
        let sms = await Messages.create({
            message,
            time
        });
    
        let idClient = await Clients.findAll({
            where: { id: id }
        })
    
        sms.addClients(idClient)
    res.status(200).send('mensaje enviado con exito')
    } catch (error) {
        res.status(400).send(error)
    }


   
}

module.exports ={
    getClients, postClient, getMessages, postMessage, getClientsById
}