const express = require("express");
const app = express();
const cors = require("cors")
const urlRoutes = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect")
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

connectToMongoDB('mongodb+srv://admin:7635074651@cluster0.8rccap1.mongodb.net/short-url')
    .then(() => console.log("MongoDB Connected"))

app.use("/url", urlRoutes);
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    res.redirect(entry.redirectURL)
})


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
