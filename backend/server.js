//importing
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessage.js';
import Pusher from 'pusher';
import cors from 'cors';

//app config
const app = express();
const port = process.env.PORT || 9000;

//pusher
const pusher = new Pusher({
    appId: "1582683",
    key: "e9553a9329075c7df390",
    secret: "ba1ffff2872d41aac156",
    cluster: "ap2",
    useTLS: true
  });
  
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });


//middleware
app.use(express.json());
app.use(cors());


//DB config
const mongo_url = 'mongodb+srv://LetsChat:LetsChat@cluster0.vesrpty.mongodb.net/hellodb?retryWrites=true&w=majority';
mongoose.connect(mongo_url, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// real time experience
const db = mongoose.connection;

db.once("open", () => {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("A change occured",change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted', {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
            })
        }else{  
            console.log('error while triggering pusher');  
        }
    });
});



//api routes
app.get('/', (req,res)=>{
    res.status(200).send('hello server')
});

app.get('/messages/sync', (req,res) => {
    Messages.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    }) 
})


app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage).then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
})


//listen
app.listen(port, ()=>{
    console.log(`listening on localhost: ${port}`);
});