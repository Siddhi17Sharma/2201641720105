// src/components/Logger.js
const log = (message, data = null) => {
    const logMessage = `[LOG]: ${message}`;
    if (data) {
      console.log(logMessage, data);
    } else {
      console.log(logMessage);
    }
  };
  
  export default log;