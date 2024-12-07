import express from "express";

const app = express();
const port = 3000;
const API_KEY ='8dbbe8ff5a7a04baf1d698dd0fd2da2e';
let city = [];

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",async (req,res)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod !== 200){
            return res.render('index',{data:null, error:weatherData.message});
        }
        res.render('index',{data:weatherData})

    } catch (error) {
        res.render('index', {data:null,error:error})

    }

})

app.post("/",(req,res)=>{
    const data = req.body.inputUser
    city= data
    res.redirect("/")
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`)
});