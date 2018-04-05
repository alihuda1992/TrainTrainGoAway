

$(document).ready(function () {


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCB07gYJYRlOTxfdcPz3U_UfjTgoww4DQM",
    authDomain: "trainscheduler-6612c.firebaseapp.com",
    databaseURL: "https://trainscheduler-6612c.firebaseio.com",
    projectId: "trainscheduler-6612c",
    storageBucket: "",
    messagingSenderId: "621289262559"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //OnClickEvent

  $("#submitbutton").click(function () {
    console.log("we clicked")
    var NewTrain = {
      trainName: $("#name").val().trim(),
      destination: $("#destination").val().trim(),
      nextarrival: $("#time").val().trim(),
      Frequency: $("#frequency").val().trim(),
    }
    database.ref().push(NewTrain);
//Close on click
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var firstTime = childSnapshot.val().nextarrival;
    var Frequency = childSnapshot.val().Frequency;
    var currentTime = moment();
    var tMinutesTillTrain = 5;
  
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(Frequency, "minutes");
  
    // Difference between the times...we need this to calculate how long until the next train comes
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  
    // Time apart (remainder)
    var tRemainder = diffTime % firstTime;
  
    // Minute Until Train
    var tNextTrain = firstTime - tRemainder;
  
    // Next Train
    var tnextArrival = moment().add(tMinutesTillTrain, "minutes");
  
      //makes appropriate values appear in proper places in table
      $("#table > tbody").append("<tr><td>"+ childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination
      + "</td><td>"+ childSnapshot.val().nextarrival + "</td><td>"+ childSnapshot.val().Frequency + "</td></tr>");
   

});










  // Close document ready
});