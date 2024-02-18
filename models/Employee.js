const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    "firstName": {
        type: String,
        required: true,
    },
    "lastName": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        unique: true,
    },
    "gender": {
        type: String,
        required: true,
        enum:['male', 'female', 'other']
    },
    "salary": {
        type: Number,
        required: true,
    }
    
});
const Employee = new mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;