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

        res.render("random.ejs", { recipe: result.drinks[0] });
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
});

//search endpoint
app.get("/search", async (req, res) => {
    const name = req.query.name;
    const searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`;

    try {
        const response = await axios.get(searchURL);
        const result = response.data.drinks;

        res.render("search.ejs", { recipe: result });
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
});


// featured recipes
app.get("/alabama", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=alabama");
        const result = response.data.drinks;

        res.render("featured.ejs", { recipe: result });
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
});

app.get("/autodafe", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=autodafe");
        const result = response.data.drinks;

        res.render("featured.ejs", { recipe: result });
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
});

app.get("/gin", async (req, res) => {
    try {
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178365");
        const result = response.data.drinks;

        res.render("featured.ejs", { recipe: result });
    }
    catch(error){
        console.error(`Error: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});