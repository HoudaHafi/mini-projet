const validator = require('validator');
const EmptyData = require('./EmptyData')

module.exports = function UserValidator(data){
    let errors = {};

    data.name = !EmptyData(data.name) ? data.name : '';
    data.lastname = !EmptyData(data.lastname) ? data.lastname : '';
    data.age = !EmptyData(data.age) ? data.age : '';
    data.email = !EmptyData(data.email) ? data.email : '';
    data.password = !EmptyData(data.password) ? data.password : '';

    if(validator.isEmpty(data.name)){
        errors.name = 'FirstName required'
    }

    if(validator.isEmpty(data.lastname)){
        errors.lastname = 'LastName required'
    }

    if(validator.isEmpty(data.age)){
        errors.age = 'Age required'
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'Field is not an email type'
    }

    if(validator.isEmpty(data.email)){
        errors.email = 'Email required'
    }

    if(validator.isEmpty(data.password)){
        errors.password = 'Password required'
    }


    return {
        errors,
        isValid: EmptyData(errors)
    }

}