/**
 * Receives the data from ToolMain. Downloads the seller helper spreadsheet, matches the skus with the user data with the processWorker, and returns the updated data
 */
import * as Papa from 'papaparse';

async function processData(data) {
  return new Promise(async (resolve, reject) => {
    const processWorker = new Worker('src/workers/processWorker.js');

    // download public file
    const response = await fetch(
      'https://storage.googleapis.com/updated_data/updated_data.csv',
      { mode: 'cors' }
    );
    const shFile = await response.blob();

    // Process with Papa Parse, start process worker
    Papa.parse(shFile, {
      delimeter: ',',
      header: true,
      complete: (shData) => {
        processWorker.postMessage({
          command: 'process',
          shData: JSON.parse(JSON.stringify(shData.data)),
          userData: JSON.parse(JSON.stringify(data.userData)),
          userOptions: JSON.parse(JSON.stringify(data.userOptions)),
        });
      },
    });

    // Adds a listener to receive processed data back and return it to ToolMain
    processWorker.addEventListener('message', (message) => {
      resolve(message.data);
    });
  });
}

export { processData };
