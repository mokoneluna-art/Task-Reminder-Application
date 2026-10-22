const express = require('express');
const TaskReminder = require('./TaskReminder');

const app = express();
app.use(express.json());
app.use(express.static('public')); // This will serve our HTML file

app.post('/api/reminder', (req, res) => {
    try {
        const { taskName, reminderTime, notificationType } = req.body;
        
        const reminder = new TaskReminder(taskName, reminderTime, notificationType);
        reminder.setReminder();
        reminder.sendNotification();

        res.json({ success: true, message: `Success! Reminder set for ${taskName}. Check VS Code terminal!` });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});