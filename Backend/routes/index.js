const { Router } = require('express');
const { route } = require('../app');
const router = Router();


const {getClients, postClient, getMessages, postMessage, getClientsById} = require('../controlers')
    

    router.get('/client', getClients);
    router.post('/client', postClient)
    router.get('/client/:idClient', getClientsById)

    router.get('/message', getMessages)
    router.post('/message', postMessage)

    module.exports = router;