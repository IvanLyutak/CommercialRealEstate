import axios from 'axios'

const insertReview = (text, callback) => {
    
    axios.post('/api/reviews/insert', {
        "name": "Иван",
        "text": text
    })
    .then(function (res) {
        if (res.data === "unauthorized" || res.data === "error") {
            callback("error")
        } 
        else {
            callback(res.data)
        }
    })
    .catch(function (error) {
        callback("error")
    });
}

export const listReview = (callback) => {
    
    axios.get('/api/reviews/list')
    .then(function (res) {
        if (res.data === "unauthorized" || res.data === "error") {
            callback("error")
        } 
        else {
            callback(res.data)
        }
    })
    .catch(function (error) {
        callback("error")
    });
}

export default insertReview