const records = [];

function addRecord(product, quantity, convertedUnit, unitType) {
  const record = {
    date: new Date().toLocaleDateString(),
    code: product.split(" - ")[0].trim(),
    product: product.split(" - ")[1]?.trim() || product.trim(),
    quantity,
    convertedUnit: `${convertedUnit} ${unitType}`,
  };

  records.push(record);
  updateTable();
}

function convertUnit() {
  const productInput = document.getElementById("productSearch");
  const quantityInput = document.getElementById("quantity");
  const conversionRateInput = document.getElementById("conversionRate");
  const unitTypeSelect = document.getElementById("unitConversion");

  const product = productInput.value.trim();
  const quantity = parseFloat(quantityInput.value);
  const conversionRate = parseFloat(conversionRateInput.value);
  const unitType = unitTypeSelect.value;

  if (!product || isNaN(quantity) || isNaN(conversionRate)) {
    alert("Preencha todos os campos!");
    return;
  }

  let convertedUnit = quantity * conversionRate;
  convertedUnit = Number.isInteger(convertedUnit) ? convertedUnit : convertedUnit.toFixed(2);

  addRecord(product, quantity, convertedUnit, unitType);

  productInput.value = "";
  quantityInput.value = "";
  conversionRateInput.value = "";
  unitTypeSelect.selectedIndex = 0;
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

    const editCell = row.insertCell(5);
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.onclick = () => editRecord(index);
    editCell.appendChild(editButton);
  });
}

function editRecord(index) {
  const record = records[index];
  document.getElementById("productSearch").value = `${record.code} - ${record.product}`;
  document.getElementById("quantity").value = record.quantity;
  document.getElementById("conversionRate").value = "";
  document.getElementById("unitConversion").value = record.convertedUnit.split(" ")[1];
  records.splice(index, 1);
  updateTable();
}

function exportToTxt() {
  const content = records.map(record =>
    `**Data:** ${record.date}\n**Código:** ${record.code}\n**Produto:** ${record.product}\n**Quantidade:** ${record.quantity}\n**Unidade Convertida:** ${record.convertedUnit}\n\n`
  ).join("\n");

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "gestao_estoque.txt";
  link.click();
}

function exportToCsv() {
  const content = records.map(record =>
    `${record.date},${record.code},${record.product},${record.quantity},${record.convertedUnit}`
  ).join("\n");

  const blob = new Blob([content], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "gestao_estoque.csv";
  link.click();
}
