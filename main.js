const TaskReminder = require("./TaskReminder");

const reminder = new TaskReminder("Finish project", "2024-08-01 10:00", "email");
reminder.setReminder();

if (reminder.isDue()) {
  reminder.sendNotification();
} else {
  console.log("Not yet due.");
}

const future = new TaskReminder("Submit report", "2030-01-01 09:00", "sms");
console.log("Future reminder due? " + future.isDue());