const express = require(`express`)
const mongoose = require(`mongoose`)



const app = express()
app.use(express.json())
const port = 3000

const Filme = mongoose.model('DragonBall' , {title:String
    ,description:String,
    image:String,
    trailer:String,
}

)


app.get("/", async (req , res) =>{
    const films = await Filme.find()
    return res.send(films)
})

app.delete("/:id", async(req , res)=>{
    const filme = await Filme.findByIdAndDelete(req.params.id)
    return res.send(filme)
})

app.put("/:id", async(req,res)=>{
    const filme = await Filme.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        trailer: req.body.trailer
    })
    return res.send(filme)
})

app.post("/", async (req,res)=>{
    const filme = new Filme({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        trailer: req.body.trailer

    })
    await filme.save()
    res.send(filme)
})

app.listen(port, ()=>{
    mongoose.connect('mongodb://localhost:27017')
    console.log('APP runing')
} )