const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/actions.log");

const logAction = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Error writing log:", err);
    }
  });
};

module.exports = logAction;