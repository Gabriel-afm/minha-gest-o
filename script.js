const records = [];
let totalConverted = 0;

function addRecord(product, quantity, convertedUnit, unitType, palettes, bales, units) {
  const totalUnits = parseInt(bales || 0) + parseInt(units || 0);
  const totalConvertedValue = convertedUnit;

  const record = {
    date: new Date().toLocaleDateString(),
    code: product.split(" - ")[0].trim(),
    product: product.split(" - ")[1]?.trim() || product.trim(),
    quantity,
    convertedUnit: `${convertedUnit} ${unitType}`,
    palettes,
    bales,
    units,
    totalConvertedValue,
  };

  records.push(record);
  totalConverted += totalConvertedValue;
  updateTable();
  updateTotal();
}

function convertUnit() {
  const productInput = document.getElementById("productSearch");
  const quantityInput = document.getElementById("quantity");
  const conversionRateInput = document.getElementById("conversionRate");
  const unitTypeSelect = document.getElementById("unitConversion");

  const palettesInput = document.getElementById("palettes");
  const balesInput = document.getElementById("bales");
  const unitsInput = document.getElementById("units");

  const product = productInput.value.trim();
  const quantity = parseFloat(quantityInput.value);
  const conversionRate = parseFloat(conversionRateInput.value);
  const unitType = unitTypeSelect.value;

  const palettes = parseInt(palettesInput.value) || 0;
  const bales = parseInt(balesInput.value) || 0;
  const units = parseInt(unitsInput.value) || 0;

  if (!product || isNaN(quantity) || isNaN(conversionRate)) {
    alert("Preencha todos os campos!");
    return;
  }

  const convertedUnit = quantity * conversionRate;

  addRecord(product, quantity, convertedUnit, unitType, palettes, bales, units);

  productInput.value = "";
  quantityInput.value = "";
  conversionRateInput.value = "";
  palettesInput.value = "";
  balesInput.value = "";
  unitsInput.value = "";
}

function updateTable() {
  const tableBody = document.getElementById("recordTable");
  tableBody.innerHTML = "";

  records.forEach((record, index) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = record.date;
    row.insertCell(1).textContent = record.code;
    row.insertCell(2).textContent = record.product;
    row.insertCell(3).textContent = record.quantity;
    row.insertCell(4).textContent = record.convertedUnit;
    row.insertCell(5).textContent = record.palettes || 0;
    row.insertCell(6).textContent = record.bales || 0;
    row.insertCell(7).textContent = record.units || 0;
    row.insertCell(8).textContent = record.totalConvertedValue;

    const actionCell = row.insertCell(9);
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    actionCell.appendChild(editButton);
  });
}

function updateTotal() {
  document.getElementById("totalConverted").textContent = totalConverted.toFixed(2);
}
