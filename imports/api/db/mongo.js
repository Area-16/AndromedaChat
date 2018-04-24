import mongoose from 'mongoose'

export default mongoose.connect(process.env.SERVER_MONGO || 'mongodb://localhost/chat')
