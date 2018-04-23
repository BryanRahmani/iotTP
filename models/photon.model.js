const mongoose = require('mongoose');

// définir la structure de mon modèle photo
var photonSchema  = mongoose.Schema({
    "device_name": {type : String},
    "last_ip_address": String,
    "product_id": Number,
    "platform_id": Number,
    "site_pref": String,
    "status" : String,
    "current_build_target" : String
});

//Création du model : nom, schéma
var Photon = mongoose.model('photons', photonSchema);

module.exports = Photon;