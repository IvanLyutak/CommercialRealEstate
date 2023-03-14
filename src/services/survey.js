import axios from 'axios'

const getSurvey = (callback) => {
    
    axios.get('/api/survey/list')
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

export const insertResult = (company, answer, callback) => {
    console.log(company, answer)
    
    axios.post('/api/survey/insertResult', {
        "question": company,
        "answer": answer
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

export const selectionСriteriaRealty = (callback) => {
    
    axios.get('/api/survey/selectionСriteriaRealty')
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

export const agencySelectionCriteria = (callback) => {
    
    axios.get('/api/survey/agencySelectionCriteria')
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

export const interestingInformation = (callback) => {
    
    axios.get('/api/survey/interestingInformation')
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


export default getSurvey