// dotenv
require('dotenv').config()
require('express-async-errors')
// express
const express=require('express')
const app=express()
// routes
const productsRouter=require('./routes/products')
// DB
const connectDB=require('./db/connect')
// routes handling
const notFoundMiddle=require('./middleware/not-found')
const errorMiddleware=require('./middleware/error-handler')

// middleware
app.use(express.json())

// rootes
app.get('/',(req,res)=>{
    res.send('<h1>store API</h1><a href="/api/v1/products">product route</a>')
})

// products routes
app.use('/api/v1/products',productsRouter)
app.use(notFoundMiddle)
app.use(errorMiddleware)

const port=process.env.port||4000

const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()