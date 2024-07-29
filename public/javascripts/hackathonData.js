const mysql = require("mysql");

module.exports = [
    {

        deadlineDate: "2024-05-15",
        eventName: "CodeFest 2024",
        logo: "https://example.com/codefest2024.png",
        location: "Virtual",
        month: "May",
        day: "Saturday",
        moreDetails: {
            eventid: "0d7abffa-8399-4a34-a9af-f9f3f36edc11",
            // img: "https://images.unsplash.com/photo-1531308141655-913fb8b5e817",
            img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            startingTime: "10:00 AM",
            endingTime: "6:00 PM",
            description: "Join us for a day of coding challenges and innovation!",
            age: "all ages",
            country: "Global",
        },
    },
    {

        deadlineDate: "2024-06-20",
        eventName: "Hackathon X",
        logo: "https://example.com/hackathonx.png",
        location: "New York, USA",
        month: "June",
        day: "Sunday",
        moreDetails: {
            eventid: "d4eabf39-2d86-434e-8ed6-721e298b6b5e",
            // img: "https://images.unsplash.com/photo-1507681191215-c3be686ce89d",
            img: "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            startingTime: "9:00 AM",
            endingTime: "7:00 PM",
            description: "An epic hackathon where creativity meets technology!",
            age: "18+",
            country: "United States",
        },
    },
    {

        deadlineDate: "2024-07-10",
        eventName: "Hack the Future",
        logo: "/images/hackathons/hack13.jpeg",
        location: "London, UK",
        month: "July",
        day: "Friday",
        moreDetails: {
            eventid: "731bfe4e-7a3e-4658-936e-b9f0a80d3434",
            img: "/images/hackathons/hack13.jpeg",
            startingTime: "11:00 AM",
            endingTime: "8:00 PM",
            description: "Shape tomorrow's technology today at Hack the Future!",
            age: "16+",
            country: "United Kingdom",
        },
    },
    {

        deadlineDate: "2024-08-05",
        eventName: "InnoHacks",
        logo: "https://example.com/innohacks.png",
        location: "Berlin, Germany",
        month: "August",
        day: "Wednesday",
        moreDetails: {
            eventid: "56bd63fd-4464-4a61-981e-8cfcf2f84f9d",
            // img: "https://images.unsplash.com/photo-1545153893-03a4c2bc7f3d",
            img: "/images/hackathons/hack1.jpg",
            startingTime: "8:30 AM",
            endingTime: "6:30 PM",
            description: "Where innovation meets coding - join us at InnoHacks!",
            age: "18+",
            country: "Germany",
        },
    },
    {

        deadlineDate: "2024-09-18",
        eventName: "TechTonic Hackathon",
        logo: "https://example.com/techtonic.png",
        location: "San Francisco, USA",
        month: "September",
        day: "Saturday",
        moreDetails: {
            eventid: "aee3d61d-fc7f-4c89-b648-2c12ecb87b17",
            // img: "https://images.unsplash.com/photo-1526289034009-0240ddb65221",
            img: "/images/hackathons/hack2.jpg",
            startingTime: "10:30 AM",
            endingTime: "9:00 PM",
            description: "Dive into the tech world with TechTonic Hackathon!",
            age: "18+",
            country: "United States",
        },
    },
    {

        deadlineDate: "2024-10-12",
        eventName: "DevDash",
        logo: "https://example.com/devdash.png",
        location: "Tokyo, Japan",
        month: "October",
        day: "Tuesday",
        moreDetails: {
            eventid: "26c87e2f-b894-47cf-bd92-1ee1e6f3ad15",
            // img: "https://images.unsplash.com/photo-1552678998-30b900fa6a53",
            img: "/images/hackathons/hack3.webp",
            startingTime: "9:00 AM",
            endingTime: "7:00 PM",
            description: "Race against the clock in the ultimate coding challenge - DevDash!",
            age: "18+",
            country: "Japan",
        },
    },
    {

        deadlineDate: "2024-11-08",
        eventName: "CodeCrunch",
        logo: "https://example.com/codecrunch.png",
        location: "Toronto, Canada",
        month: "November",
        day: "Monday",
        moreDetails: {
            eventid: "6bf4e657-02fb-4315-99ad-5a6b845a4d5a",
            // img: "https://images.unsplash.com/photo-1573496382426-77c3a32a70a2",
            img: "/images/hackathons/hack4.jpg",
            startingTime: "10:00 AM",
            endingTime: "6:00 PM",
            description: "Crunch your way through coding challenges at CodeCrunch!",
            age: "18+",
            country: "Canada",
        },
    },
    {
        deadlineDate: "2024-12-25",
        eventName: "HackFest",
        logo: "https://example.com/hackfest.png",
        location: "Sydney, Australia",
        month: "December",
        day: "Friday",
        moreDetails: {
            eventid: "98b5a74a-2467-482f-b1c4-2e9b2e800f4d",
            // img: "https://images.unsplash.com/photo-1544877738-f9f6b636e2e8",
            img: "/images/hackathons/hack5.webp",
            startingTime: "11:00 AM",
            endingTime: "9:00 PM",
            description: "Celebrate the spirit of hacking at HackFest!",
            age: "18+",
            country: "Australia",
        },
    },
    {

        deadlineDate: "2025-01-20",
        eventName: "ByteBash",
        logo: "https://example.com/bytebash.png",
        location: "Seattle, USA",
        month: "January",
        day: "Wednesday",
        moreDetails: {
            eventid: "2edff89d-4e3d-4fb1-b8c7-876ff131382c",
            // img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366",
            img: "/images/hackathons/hack6.jpeg",
            startingTime: "9:30 AM",
            endingTime: "7:30 PM",
            description: "Get ready for a byte-sized coding frenzy at ByteBash!",
            age: "18+",
            country: "United States",
        },
    },
    {

        deadlineDate: "2025-02-14",
        eventName: "HackValentine",
        logo: "https://example.com/hackvalentine.png",
        location: "Paris, France",
        month: "February",
        day: "Sunday",
        moreDetails: {
            eventid: "1a8950f2-08e2-4cb3-897f-493aa03cb605",
            // img: "https://images.unsplash.com/photo-1485550409059-9afb054cada5",
            img: "/images/hackathons/hack7.jpg",
            startingTime: "10:00 AM",
            endingTime: "8:00 PM",
            description: "Share your love for coding at HackValentine!",
            age: "18+",
            country: "France",
        },
    },
    {

        deadlineDate: "2025-03-18",
        eventName: "HackSpring",
        logo: "https://example.com/hackspring.png",
        location: "Berlin, Germany",
        month: "March",
        day: "Thursday",
        moreDetails: {
            eventid: "f4766eb9-005e-4d2a-8904-8d3f9f9ff31a",
            // img: "https://images.unsplash.com/photo-1519052537078-e6302a4968c3",
            img: "/images/hackathons/hack8.jpeg",
            startingTime: "8:00 AM",
            endingTime: "6:00 PM",
            description: "Spring into action with coding challenges at HackSpring!",
            age: "18+",
            country: "Germany",
        },
    },
    {

        deadlineDate: "2025-04-22",
        eventName: "HackEarth",
        logo: "https://example.com/hackearth.png",
        location: "Mumbai, India",
        month: "April",
        day: "Friday",
        moreDetails: {
            eventid: "f4a9a475-2d16-4b5c-b4bb-fcfd06a91b1d",
            // img: "https://images.unsplash.com/photo-1525852837257-3dfaf567d5ff",
            img: "/images/hackathons/hack9.jpg",
            startingTime: "9:30 AM",
            endingTime: "7:30 PM",
            description: "Connect with the earth through technology at HackEarth!",
            age: "18+",
            country: "India",
        },
    },
    {

        deadlineDate: "2025-05-30",
        eventName: "HackSummer",
        logo: "https://example.com/hacksummer.png",
        location: "Rio de Janeiro, Brazil",
        month: "May",
        day: "Saturday",
        moreDetails: {
            eventid: "187c276c-9013-4875-83ee-0e02010e16df",
            // img: "https://images.unsplash.com/photo-1523667915453-0d68b456bfc1",
            img: "/images/hackathons/hack10.jpg",
            startingTime: "10:00 AM",
            endingTime: "8:00 PM",
            description: "Heat up your coding skills at HackSummer!",
            age: "18+",
            country: "Brazil",
        },
    },
    {

        deadlineDate: "2025-06-25",
        eventName: "HackCity",
        logo: "/images/hackathons/hack11.jpg",
        location: "Hong Kong, China",
        month: "June",
        day: "Thursday",
        moreDetails: {
            eventid: "c0e3980f-308b-48b4-8fd3-943234b43a98",
            // img: "https://images.unsplash.com/photo-1525640932055-2a97e4e2e056",
            img: "/images/hackathons/hack11.jpg",
            startingTime: "9:00 AM",
            endingTime: "7:00 PM",
            description: "Hack your way through the urban jungle at HackCity!",
            age: "18+",
            country: "China",
        },
    },
    {

        deadlineDate: "2025-07-19",
        eventName: "HackOcean",
        logo: "/images/hackathons/hack12.webp",
        location: "Cape Town, South Africa",
        month: "July",
        day: "Monday",
        moreDetails: {
            eventid: "c4a19f8e-d43b-41d0-b0c1-476e529c8bb4",
            // img: "https://images.unsplash.com/photo-1521476610377-4ff0802b3aff",
            img: "/images/hackathons/hack12.webp",
            startingTime: "10:30 AM",
            endingTime: "8:30 PM",
            description: "Dive deep into coding challenges at HackOcean!",
            age: "18+",
            country: "South Africa",
        },
    },
];

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "createaccount",
    port: "3307",
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL");
        const hackathons = module.exports; // Your provided hackathon data

        let hackathonsSQL = 'INSERT INTO hackathons (id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country) VALUES\n';

        hackathons.forEach((hackathon, index) => {
            hackathonsSQL += `(
                '${hackathon.moreDetails.eventid}',
                '${hackathon.deadlineDate}',
                '${hackathon.eventName.replace(/'/g, "''")}',
                '${hackathon.logo}',
                '${hackathon.location.replace(/'/g, "''")}',
                '${hackathon.month}',
                '${hackathon.day}',
                '${hackathon.moreDetails.img}',
                '${hackathon.moreDetails.startingTime}',
                '${hackathon.moreDetails.endingTime}',
                '${hackathon.moreDetails.description.replace(/'/g, "''")}',
                '${hackathon.moreDetails.age}',
                '${hackathon.moreDetails.country.replace(/'/g, "''")}'
            )`;

            if (index < hackathons.length - 1) {
                hackathonsSQL += ',\n';
            } else {
                hackathonsSQL += ';\n';
            }
        });

        db.query(hackathonsSQL, (err, result) => {
            if (err) throw err;
            console.log("Hackathons data inserted");
            db.end();
        });
    }
});