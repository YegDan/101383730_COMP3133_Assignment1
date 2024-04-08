const {ApolloError, UserInputError, AuthenticationError} = require('apollo-server');
const bycrypt = require('bcryptjs');
const User = require('./models/User');
const Employee = require('./models/Employee');
const resolvers = {
    Mutation:{
        signUp: async (parent, args) => {
            const user = await new User(args).save();
                
            return user;
        },
        addEmployee: async (parent, args) => {
            console.log('Received `addEmployee` mutation with args:', args);
            
            try {
                const employee = await new Employee(args).save();
                console.log('Employee added successfully:', employee);
                return employee;
            } catch (error) {
                console.error('Error adding employee:', error);
                // If the error is due to user input (like duplicate email), you can throw a UserInputError.
                // Otherwise, for unexpected errors, you can throw a generic ApolloError or a specific error based on your error handling strategy.
                throw new ApolloError('Failed to add employee.', 'ADD_EMPLOYEE_ERROR');
            }
        },

        deleteEmployee: async(parent, args) => {
            const employee = await Employee.findOneAndDelete({_id: args.id});
            if(!employee){
                throw new UserInputError('Employee not found',
                {
                    invalidArgs: {id}
                }
                );
            }
            
            return employee;
        },
        updateEmployee: async (parent, args) => {
            const employee = await Employee.findOne({_id: args.id});
            if(!employee){
                throw new UserInputError('Employee not found',
                {
                    invalidArgs: {id}
                }
                );
            }
            employee.firstName = args.firstName || employee.firstName;
            employee.lastName = args.lastName || employee.lastName;
            employee.email = args.email || employee.email;
            employee.gender = args.gender || employee.gender;
            employee.salary = args.salary || employee.salary;
            await employee.save();
            return employee;
        }
    },
    Query:{
        login: async (parent, args) => {
            const user = await User.findOne({username: args.username});
            if(!user){
                throw new UserInputError('User not found',{
                    invalidArgs: {username}
                });
            }
            
            const isMatch = await bycrypt.compare(args.password, user.password);
            if(!isMatch){
                throw new AuthenticationError('Invalid password');
            }
            return user;
        },
        allEmployees: async(parent, args)=>{
            const employees = await Employee.find({});
            return employees;
        },
        employee: async(parent, args)=>{
            const employee =  await Employee.findOne({_id: args.id});
            if(!employee){
                throw new UserInputError('Employee not found',{
                invalidArgs: {id}
            })}
            return employee;
        }
    }
};
module.exports = resolvers;