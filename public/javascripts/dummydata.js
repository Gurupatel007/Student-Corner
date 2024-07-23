const mysql = require("mysql");

module.exports = [
  {
    id: 0,
    deadlineDate: "2024-04-26",
    eventName: "Royal Kingsnight",
    logo: "https://hardstyle.com/thumbs/1600x0/@0.5x0.5/gfx/events/7e987d5e-3a81-49c0-a3e3-2a052471b0d3/images/header_img.jpg",
    location: "Tilburg, Netherlands",
    month: "april",
    day: "friday",
    moreDetails: {
      eventid: "1339db1c-47b0-bed8-26457b2d4131",
      img: "https://hardstyle.com/thumbs/1600x0/@0.5x0.5/gfx/events/7e987d5e-3a81-49c0-a3e3-2a052471b0d3/images/header_img.jpg",
      startingTime: "20:00",
      endingTime: "04:00",
      description: "Experience the ultimate music festival with Royal Kingsnight!",
      age: "all ages",
      country: "Netherlands",
    },
  },
  {
    id: 1,
    deadlineDate: "2025-04-03",
    eventName: "Tech Summit",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: "Xiasi, China",
    month: "march",
    day: "friday",
    moreDetails: {
      eventid: "1339db1c-e464-47b0-bed8-26457b2d4131",
      img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      startingTime: "5:04 PM",
      endingTime: "5:17 PM",
      description: "Join the leading tech experts and innovators at the Tech Summit.",
      age: "kids",
      country: "China",
    },
  },
  {
    id: 2,
    deadlineDate: "2024-09-24",
    eventName: "Art Exhibition",
    logo: "https://images.unsplash.com/photo-1503293050619-6048ffad0dc5?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Sirnarasa, Indonesia",
    month: "january",
    day: "thursday",
    moreDetails: {
      eventid: "cba79f81-f5e5-43c6-8df6-819f58d92ca3",
      img: "https://images.unsplash.com/photo-1503293050619-6048ffad0dc5?q=80&w=1775&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "11:30 PM",
      endingTime: "7:42 PM",
      description: "Immerse yourself in the world of art at our captivating exhibition.",
      age: "seniors",
      country: "Indonesia",
    },
  },
  {
    id: 3,
    deadlineDate: "2024-07-18",
    eventName: "Culinary Festival",
    logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    location: "Klavdiyevo-Tarasove, Ukraine",
    month: "january",
    day: "tuesday",
    moreDetails: {
      eventid: "3f703776-3fdc-42ce-a58c-28f544577fc4",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
      startingTime: "10:22 PM",
      endingTime: "10:26 AM",
      description: "Indulge in a culinary adventure with flavors from around the world.",
      age: "seniors",
      country: "Ukraine",
    },
  },
  {
    id: 4,
    deadlineDate: "2025-09-22",
    eventName: "Fashion Week",
    logo:"https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: "Serhetabat, Turkmenistan",
    month: "july",
    day: "wednesday",
    moreDetails: {
      eventid: "06be8c88-dfcf-490d-84da-68c1a34b4369",
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      startingTime: "1:22 AM",
      endingTime: "3:01 PM",
      description: "Witness the latest fashion trends and styles at our glamorous Fashion Week.",
      age: "teens",
      country: "Turkmenistan",
    },
  },
  {
    id: 5,
    deadlineDate: "2025-01-11",
    eventName: "Book Fair",
    logo: "https://images.unsplash.com/photo-1523473125050-1c9405e8b208?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Krajan Caluk, Indonesia",
    month: "november",
    day: "saturday",
    moreDetails: {
      eventid: "e9132e07-21d4-4a7e-9a7c-f05183866c0f",
      img: "https://images.unsplash.com/photo-1523473125050-1c9405e8b208?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "1:03 PM",
      endingTime: "5:36 PM",
      description: "Explore a world of literature at our annual Book Fair.",
      age: "all ages",
      country: "Indonesia",
    },
  },
  {
    id: 6,
    deadlineDate: "2025-02-01",
    eventName: "Music Festival",
    logo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
    location: "Naples, United States",
    month: "december",
    day: "friday",
    moreDetails: {
      eventid: "a2944b43-1db0-4f6f-8cbd-af99f623ef6f",
      img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80",
      startingTime: "12:11 AM",
      endingTime: "12:40 PM",
      description: "Get ready to rock at our electrifying Music Festival!",
      age: "kids",
      country: "United States",
    },
  },
  {
    id: 7,
    deadlineDate: "2024-09-24",
    eventName: "Outdoor Adventure",
    logo: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Shangchewan, China",
    month: "november",
    day: "monday",
    moreDetails: {
      eventid: "375e9172-49bf-47b2-82ff-ddc99f073fe9",
      img: "https://images.unsplash.com/photo-1414016642750-7fdd78dc33d9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "12:36 AM",
      endingTime: "3:53 AM",
      description: "Embark on an unforgettable outdoor adventure with us!",
      age: "adults",
      country: "China",
    },
  },
  {
    id: 8,
    deadlineDate: "2024-12-10",
    eventName: "Film Festival",
    logo: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
    location: "Shurugwi, Zimbabwe",
    month: "december",
    day: "thursday",
    moreDetails: {
      eventid: "71a12567-2a22-4aa0-8c5c-b0d035c37088",
      img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80",
      startingTime: "8:42 PM",
      endingTime: "3:42 AM",
      description: "Celebrate the art of cinema at our prestigious Film Festival.",
      age: "adults",
      country: "Zimbabwe",
    },
  },
  {
    id: 9,
    deadlineDate: "2025-05-21",
    eventName: "Dance Competition",
    logo: "https://images.unsplash.com/photo-1474308371634-c715850e8d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Al Maḩwīt, Yemen",
    month: "november",
    day: "tuesday",
    moreDetails: {
      eventid: "d844cfad-1e65-4df5-ac8b-fd0747216067",
      img: "https://images.unsplash.com/photo-1474308371634-c715850e8d8b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "11:17 AM",
      endingTime: "10:14 PM",
      description: "Showcase your dance moves and compete for the ultimate prize!",
      age: "teens",
      country: "Yemen",
    },
  },
  {
    id: 10,
    deadlineDate: "2024-11-17",
    eventName: "Business Conference",
    logo: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Penticton, Canada",
    month: "july",
    day: "thursday",
    moreDetails: {
      eventid: "183ad85e-5b83-4219-827c-fd58a575b634",
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "9:15 AM",
      endingTime: "9:46 PM",
      description: "Network and learn from industry leaders at our Business Conference.",
      age: "adults",
      country: "Canada",
    },
  },
  {
    id: 11,
    deadlineDate: "2025-03-15",
    eventName: "Science Fair",
    logo: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80",
    location: "Banjarnegara, Indonesia",
    month: "february",
    day: "sunday",
    moreDetails: {
      eventid: "f7d8e9b2-a1c4-4b9e-b3c6-d2f6c8e7f3d8",
      img: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1161&q=80",
      startingTime: "10:00 AM",
      endingTime: "6:00 PM",
      description: "Explore the wonders of science at our interactive Science Fair.",
      age: "kids",
      country: "Indonesia",
    },
  },
  {
    id: 12,
    deadlineDate: "2024-08-10",
    eventName: "Food Truck Festival",
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    location: "Ḩayfā, Israel",
    month: "july",
    day: "saturday",
    moreDetails: {
      eventid: "a6c7d9e1-b2f4-4d8a-b7c3-f8e2d9f6e8d2",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      startingTime: "12:00 PM",
      endingTime: "10:00 PM",
      description: "Indulge in a delicious culinary adventure at our Food Truck Festival.",
      age: "all ages",
      country: "Israel",
    },
  },
  {
    id: 13,
    deadlineDate: "2025-06-20",
    eventName: "Gaming Convention",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    location: "Krasnodar, Russia",
    month: "may",
    day: "friday",
    moreDetails: {
      eventid: "c9e6d3b4-f9d3-4b6f-9e6d-b8f7d2e3c7d2",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      startingTime: "9:00 AM",
      endingTime: "8:00 PM",
      description: "Join us for an epic gaming experience at our Gaming Convention!",
      age: "teens",
      country: "Russia",
    },
  },
  {
    id: 14,
    deadlineDate: "2024-10-31",
    eventName: "Halloween Party",
    logo: "https://images.unsplash.com/photo-1607411713289-769cd0dcce87?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Bāgepallī, India",
    month: "october",
    day: "wednesday",
    moreDetails: {
      eventid: "e7d2c9e6-b8f7-4b6f-9e6d-f9d3d3c7d2e3",
      img: "https://images.unsplash.com/photo-1607411713289-769cd0dcce87?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      startingTime: "7:00 PM",
      endingTime: "2:00 AM",
      description: "Get ready for a spooktacular night at our Halloween Party!",
      age: "all ages",
      country: "India",
    },
  },
]

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "createaccount",
  port: "3307", // Change the port as needed
});

// Create the 'accounts' table for account registration
db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL");
    const events = module.exports; // Your provided data

    let eventsSQL = 'REPLACE INTO events (id, deadlineDate, eventName, logo, location, month, day) VALUES\n';

    let detailsSQL = 'REPLACE INTO event_details (eventid, event_id, img, startingTime, endingTime, description, age, country) VALUES\n';


    events.forEach((event, index) => {
      eventsSQL += `(${event.id}, '${event.deadlineDate}', '${event.eventName.replace(/'/g, "''")}', '${event.logo}', '${event.location.replace(/'/g, "''")}', '${event.month}', '${event.day}')`;

      detailsSQL += `('${event.moreDetails.eventid}', ${event.id}, '${event.moreDetails.img}', '${event.moreDetails.startingTime}', '${event.moreDetails.endingTime}', '${event.moreDetails.description.replace(/'/g, "''")}', '${event.moreDetails.age}', '${event.moreDetails.country.replace(/'/g, "''")}')`;

      if (index < events.length - 1) {
        eventsSQL += ',\n';
        detailsSQL += ',\n';
      } else {
        eventsSQL += ';\n';
        detailsSQL += ';\n';
      }
    });

    db.query(eventsSQL, (err, result) => {
      if (err) throw err;
      console.log("Events data inserted");

      db.query(detailsSQL, (err, result) => {
        if (err) throw err;
        console.log("Event details data inserted");
        db.end(); // Close the connection after all queries are done
      });
    });
  }
});




// console.log(eventsSQL);
// console.log(detailsSQL);


