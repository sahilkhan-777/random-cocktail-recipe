import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/random", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
        const result = response.data;

        // console.log(result.drinks[0]);
        // console.log(result.drinks[0].strDrink);

        res.render("random.ejs", { recipe : result.drinks[0] });
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});