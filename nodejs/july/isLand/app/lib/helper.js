function success(msg,errorCode){
    throw new global.errors.Success(msg, errorCode)
}

module.exports = {
    success
}

