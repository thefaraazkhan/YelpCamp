const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 10; i++){ // do i<10 to 50 to return it to normal
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '645a251195fd393cc97e526d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime corrupti provident incidunt nemo autem at quam magni, ab hic, aperiam modi aliquam quo expedita id alias, quisquam ipsum? Assumenda, ab.',
            price,
            geometry: { 
                type: 'Point', 
                coordinates: [ -73.9866, 40.7306 ] 
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dxl9keibc/image/upload/v1683631662/YelpCamp/xzooy9iac51c2vndfqxq.png',
                  filename: 'YelpCamp/xzooy9iac51c2vndfqxq',
                },
                {
                  url: 'https://res.cloudinary.com/dxl9keibc/image/upload/v1683631663/YelpCamp/scxkqr2oxqwa1oniod4p.png',
                  filename: 'YelpCamp/scxkqr2oxqwa1oniod4p',
                },
                {
                    url: 'https://res.cloudinary.com/dxl9keibc/image/upload/v1683631663/YelpCamp/yfbqhn9haejc87g1fukf.jpg',
                    filename: 'YelpCamp/yfbqhn9haejc87g1fukf',
                }, 
                {
                    url: 'https://res.cloudinary.com/dxl9keibc/image/upload/v1683631654/YelpCamp/kv1rllqn3bfjouw0bcwd.jpg',
                    filename: 'YelpCamp/kv1rllqn3bfjouw0bcwd',
                },
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})