const express = require('express');
const router = express.Router();
const { create, update,findAll,findOne,Delete, deleteAll } = require('../controllers/role');

router.post('/role/create',create );
router.get('/role/findall', findAll);
router.get('/role/:id', findOne);
router.put('/role/:id', update);
router.delete('/role/:id', Delete)
router.delete('/role/delete', deleteAll)


module.exports= router