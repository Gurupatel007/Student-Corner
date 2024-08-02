// // const db = require('../config/db'); // Assuming you have a db configuration file
// // const express = require('express');
// // const router = express.Router();

// // async function movePastEvents() {
// //     const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

// //     const moveEventsQuery = `
// //         INSERT INTO past_events (id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country)
// //         SELECT id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country
// //         FROM events
// //         WHERE deadlineDate < ?;
// //     `;

// //     const deleteEventsQuery = `
// //         DELETE FROM events
// //         WHERE deadlineDate < ?;
// //     `;

// //     const moveHackathonsQuery = `
// //         INSERT INTO past_hackathons (id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country)
// //         SELECT id, deadlineDate, eventName, logo, location, month, day, img, startingTime, endingTime, description, age, country
// //         FROM hackathons
// //         WHERE deadlineDate < ?;
// //     `;

// //     const deleteHackathonsQuery = `
// //         DELETE FROM hackathons
// //         WHERE deadlineDate < ?;
// //     `;

// //     db.beginTransaction(err => {
// //         if (err) throw err;

// //         db.query(moveEventsQuery, [currentDate], (err, results) => {
// //             if (err) {
// //                 return db.rollback(() => {
// //                     throw err;
// //                 });
// //             }

// //             db.query(deleteEventsQuery, [currentDate], (err, results) => {
// //                 if (err) {
// //                     return db.rollback(() => {
// //                         throw err;
// //                     });
// //                 }

// //                 db.query(moveHackathonsQuery, [currentDate], (err, results) => {
// //                     if (err) {
// //                         return db.rollback(() => {
// //                             throw err;
// //                         });
// //                     }

// //                     db.query(deleteHackathonsQuery, [currentDate], (err, results) => {
// //                         if (err) {
// //                             return db.rollback(() => {
// //                                 throw err;
// //                             });
// //                         }

// //                         db.commit(err => {
// //                             if (err) {
// //                                 return db.rollback(() => {
// //                                     throw err;
// //                                 });
// //                             }
// //                             console.log('Past events and hackathons moved successfully.');
// //                         });
// //                     });
// //                 });
// //             });
// //         });
// //     });
// // }

// // module.exports = {
// //     router,
// //     movePastEvents
// // };

// const db= require('../config/db');
// const express = require('express');
// const router = express.Router();

// async function updateStatus(){
//     // const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

//     const updateEventStatusQuery = `
//         UPDATE events 
// SET status = 'past' 
// WHERE deadlineDate < CURRENT_DATE() AND status = 'active';
//     `;
//     const updateHackathonStatusQuery = `
//         UPDATE hackathons
// SET status = 'past'
// WHERE deadlineDate < CURRENT_DATE() AND status = 'active';
//     `;
//     db.beginTransaction(err => {
//         if (err) throw err;

//         db.query(updateEventStatusQuery, (err, results) => {
//             if (err) {
//                 return db.rollback(() => {
//                     throw err;
//                 });
//             }

//             db.query(updateHackathonStatusQuery, (err, results) => {
//                 if (err) {
//                     return db.rollback(() => {
//                         throw err;
//                     });
//                 }

//                 db.commit(err => {
//                     if (err) {
//                         return db.rollback(() => {
//                             throw err;
//                         });
//                     }
//                     console.log('Status updated successfully.');
//                 });
//             });
//         });
//     });
// }

// module.exports = {
//     router,
//     updateStatus
// };


const db= require('../config/db');
const express = require('express');
const router = express.Router();

// In updateStatus.js
async function updateStatus() {

    const updateEventStatusQuery = `
        UPDATE events 
SET status = 'past' 
WHERE deadlineDate < CURRENT_DATE() AND status = 'active';
    `;
    const updateHackathonStatusQuery = `
        UPDATE hackathons
SET status = 'past'
WHERE deadlineDate < CURRENT_DATE() AND status = 'active';
    `;
    
    return new Promise((resolve, reject) => {
      db.beginTransaction(err => {
        if (err) return reject(err);
  
        db.query(updateEventStatusQuery, (err, results) => {
          if (err) {
            return db.rollback(() => reject(err));
          }
  
          db.query(updateHackathonStatusQuery, (err, results) => {
            if (err) {
              return db.rollback(() => reject(err));
            }
  
            db.commit(err => {
              if (err) {
                return db.rollback(() => reject(err));
              }
              console.log('Status updated successfully.');
              resolve();
            });
          });
        });
      });
    });
  }
  
  module.exports = {
    router,
    updateStatus
  };