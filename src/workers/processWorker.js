// Listen for message from UpdateTool
addEventListener('message', (message) => {
  if (message.data.command === 'process') {
    processData(message.data.shData, message.data.userData);
  }
});

// Processes data and sends back final data
function processData(shData, userData) {
  const updatedData = [];

  console.log(userData);

  userData.forEach((userProduct) => {
    const shProduct = shData.find(
      (sellerHelperProduct) => sellerHelperProduct.sku === userProduct.sku
    );

    if (shProduct !== undefined) {
      updatedData.push({
        sku: shProduct.sku,
        quantity: shProduct.quantity,
        cost: shProduct.cost,
      });
    } else {
      updatedData.push({
        sku: userProduct.sku,
        quantity: 0,
        cost: userProduct.cost,
      });
    }
  });
  postMessage(updatedData);
}
