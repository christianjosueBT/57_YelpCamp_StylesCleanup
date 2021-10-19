const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost: 27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true    
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++){
         const random1000 = Math.floor(Math.random() * 1000);
         const price = Math.floor(Math.random() * 20) + 10;
         const camp = new Campground({
             author: '602d616f4c927e1c58b8ad2b',
             location: `${cities[random1000].city}, ${cities[random1000].state}`,
             title: `${sample(descriptors)} ${sample(places)}`,
             description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, laudantium magnam. Deserunt explicabo, aspernatur esse cumque ratione reprehenderit molestiae aliquid. Illum nemo sed amet quae mollitia fuga minus quibusdam perferendis.',
             price,
             geometry: {
                 type: "Point", 
                 coordinates: [
                     cities[random1000].longitude, 
                     cities[random1000].latitude
                 ]
                },
             images: [
                    {
                        "url" : "https://res.cloudinary.com/christianjosuebt/image/upload/v1613757786/YelpCamp/dhgb5xoeft8mtinzgksa.jpg",
                        "filename" : "YelpCamp/dhgb5xoeft8mtinzgksa" 
                    },
                    {
                        "url" : "https://res.cloudinary.com/christianjosuebt/image/upload/v1613757839/YelpCamp/c8gcyqpm1hgulbysjyu8.jpg",
                        "filename" : "YelpCamp/c8gcyqpm1hgulbysjyu8"
                    },
                    {"url" : "https://res.cloudinary.com/christianjosuebt/image/upload/v1613757840/YelpCamp/nxge6zidyc4q1gmzf5oh.jpg",
                    "filename" : "YelpCamp/nxge6zidyc4q1gmzf5oh"
                }
            ]
         });
         await camp.save();
    }
}

seedDB();

// seedDB().then(() => {
//     mongoose.connection.close();
// })