const TaskReminder = require("./TaskReminder");
 
console.log("--- Running TC-01 & TC-02 (Happy Path) ---");
 
const pastReminder = new TaskReminder("Finish project", "2024-08-01 10:00", "email");
pastReminder.setReminder();
console.log("Past reminder due?", pastReminder.isDue());
if (pastReminder.isDue()) pastReminder.sendNotification();
 
const futureReminder = new TaskReminder("Submit report", "2030-01-01 09:00", "sms");
console.log("Future reminder due?", futureReminder.isDue());
 
console.log("\n--- Running TC-03, TC-04, TC-05 (Validation) ---");
try {
 new TaskReminder("", "2024-08-01 10:00", "email");
} catch (e) { console.log("TC-03 Caught:", e.message); }
 
try {
 new TaskReminder("Task", "2024-08-01 10:00", "push");
} catch (e) { console.log("TC-04 Caught:", e.message); }
 
try {
 new TaskReminder("Task", "01/08/2024", "email");
} catch (e) { console.log("TC-05 Caught:", e.message); }