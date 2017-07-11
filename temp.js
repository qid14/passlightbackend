var schedule = require('node-schedule');
var counter = 0,
    // schedule = require('node-schedule'),
    taskSchedule = new schedule.RecurrenceRule();

taskSchedule.hours = 2;
 
function reportOnSchdeule() {
    //increment the counter
    counter++;

    //report that the scheduled task ran
    console.log('The scheduled task ran. This is iteration #: ' + counter);
    BookReader.findAll({
        where: {
            enddate: null
        }
    }).then(function(bookreader) {
        console.log('bookReaders-----------No.3:', JSON.stringify(bookreader));
        if (bookreader.length > 0) {

            // BookReader.findAll({
            //         where: {
            //             bookid: bookid
            //         }
            //     }).then(function(result) {

            bookreader.duration = moment(bookreader.startdate, "YYYY-MM-DD").fromNow();


        }
      
    })
}

 schedule.scheduleJob(taskSchedule, reportOnSchdeule);

        console.log('The schdule has been initialzed');