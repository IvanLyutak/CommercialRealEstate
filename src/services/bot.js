import axios from 'axios'

const sendBotMessage = (text, callback) => {
    
    axios.post('/api/bot/message/send', {
        "message": text
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

export default sendBotMessage