import axios from 'axios'

const uploadAd = (data, callback) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    axios.post('/api/uploadAd', data, config)
    .then(function (res) {
        console.log(res)
        callback(res.data)
    })
    .catch(function (error) {
        callback("error")
    });
}

export const getListObject = (type, typeObject, price_from, price_to, square_from, square_to, address, callback) => {

    console.log("TYPE=", type)
    
    axios.post('/api/listObject', {
        "typeAd": type,
        "typeObject": typeObject,
        "price_from": price_from,
        "price_to": price_to,
        "square_from": square_from,
        "square_to": square_to,
        "address": address
    })
    .then(function (res) {
        if (res.data === "unauthorized" || res.data === "error") {
            callback("error")
        } 
        else if (res.data === null) {
            callback("empty")
        }
        else {
            callback(res.data)
        }
    })
    .catch(function (error) {
        callback("error")
    });
}

export const getDataOfObject = (id, callback) => {

    
    axios.get(`/api/dataOfObject/${id}`)
    .then(function (res) {
        if (res.data === "unauthorized" || res.data === "error") {
            callback("error")
        } 
        else if (res.data === null) {
            callback("empty")
        }
        else {
            callback(res.data)
        }
    })
    .catch(function (error) {
        callback("error")
    });
}

export default uploadAd