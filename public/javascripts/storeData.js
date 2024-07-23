const events = module.exports; // Your provided data

let eventsSQL = 'INSERT INTO events (id, deadlineDate, eventName, logo, location, month, day) VALUES\n';
let detailsSQL = 'INSERT INTO event_details (eventid, event_id, img, startingTime, endingTime, description, age, country) VALUES\n';

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

console.log(eventsSQL);
console.log(detailsSQL);
