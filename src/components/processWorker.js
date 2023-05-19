// Listen for message from UpdateTool
addEventListener('message', (message) => {
  if (message.data.command === 'process') {
    processData(
      message.data.shData,
      message.data.userData,
      message.data.userOptions
    );
  }
});

// Processes data and sends back final data
function processData(shData, userData, userOptions) {
  const updatedData = [];

  userData.forEach((userProduct) => {
    const shProduct = shData.find(
      (sellerHelperProduct) => sellerHelperProduct.sku === userProduct.sku
    );

    if (shProduct !== undefined) {
      let newProduct = {
        sku: shProduct.sku,
        quantity: shProduct.quantity,
        cost: shProduct.cost,
      };
      if (userOptions.priceToggle === 'Yes') {
        newProduct.price =
          newProduct.cost * parseFloat('1.' + userOptions.pricePercentage);
      }
      if (userOptions.enabledToggle === 'Yes') {
        newProduct.enabled =
          newProduct.quantity < userOptions.enabledCutoff ? 0 : 1;
      }
      updatedData.push(newProduct);
    } else {
      let newProduct = {
        sku: userProduct.sku,
        quantity: 0,
        cost: userProduct.cost,
      };
      if (userOptions.priceToggle === 'Yes') {
        newProduct.price =
          newProduct.cost * parseFloat('1.' + userOptions.pricePercentage);
      }
      if (userOptions.enabledToggle === 'Yes') {
        newProduct.enabled =
          newProduct.quantity < userOptions.enabledCutoff ? 0 : 1;
      }
      updatedData.push(newProduct);
    }
  });
  postMessage(updatedData);
}
