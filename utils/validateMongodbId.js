const mongoose = require('mongoose')
const validateMongodbId = (id) => {
    const idValid = mongoose.Types.ObjectId.isValid(id);
    if(!idValid){throw new Error('This id is not valid or not found')}
};
module.exports = validateMongodbId;