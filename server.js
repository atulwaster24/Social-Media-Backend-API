import app from "./src/config/App-config/index.js";
import connectToMongoDB from "./src/config/database/database.mongoose.js";

const port = 8000;

app.listen(port, ()=>{
    console.log("\nServer started at Port:", port)
    connectToMongoDB();
})
