const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        default: ""
    },
    detailsCompletedStatus:{
        type: Boolean,
        default: false,
    },
    cpdSummary:{
        areaOfPractice:{
            type: Number,
            default: "0",
        },
        riskManagement:{
            type: Number,
            default: "0",
        },
        businessAndManagement:{
            type: Number,
            default: "0",
        },
        careerInterests:{
            type: Number,
            default: "0",
        }
    },
    userDetails:{
        prefferedName:{
            type: String,
            default: "",
        },
        lineOfBusiness:{
            type: String,
            default: "",
        },
        discipline:{
            type: String,
            default: "",
        },
        seniority:{
            type: String,
            default: "",
        },
        cycleStartDate:{
            type: Date,
            default: Date.now,
        },
        pushFrequency:{
            type: String,
            default: "",
        },
    },
    keywords:{
        type: [{type: String}],
    },
    cpdPushed: {
        type: Array,
        default: [],
    },
    cpdBooked:{
        type: Array,
        default: [],
    },
    cpdCompleted:{
        type: Array,
        default: [],
    },
    keywords:{
        type: Array,
        default: []
    },
    permission: {
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
})

// static signup method
userSchema.statics.signup = async function(email, password) {

    //validation, password constraints 8 characters, min 1 lowercase, min 1 uppercase, min 1 number, min 1 symbol
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw  Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong')
    } 

    const exists = await this.findOne({email})

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

// static login method

userSchema.statics.login = async function(email, password){
    if (!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if (!user){
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)