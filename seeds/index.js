const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Database connected!");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user ID.
            author: "5fb7d040a2eadf0852816c55",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url:
                    'https://res.cloudinary.com/dsu9wip1m/image/upload/v1605976167/YelpCamp/o87bsezuuq1bykd2iy6w.jpg',
                filename: 'YelpCamp/o87bsezuuq1bykd2iy6w'
            }],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, dolorum vero alias quam laborum enim repellendus labore nulla ut tempore nostrum quibusdam ad amet reiciendis dolorem culpa, eaque explicabo expedita.",
            price
        })
        await camp.save();
    }
}

seedDb();

seedDb().then(() => {
    mongoose.connection.close();
})