import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import { stripeWebhooks } from './controllers/webhoooks.js';

const app = express();
await connectDB()

//STRIPE WEBHOOKS
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//MIDDLEWARES
app.use(cors())
app.use(express.json())

//ROUTES
app.get('/', (req, res)=> {
    res.send('server running')
})
app.use('/api/user', userRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)
app.use('/api/credit', creditRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`)
})