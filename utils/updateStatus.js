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