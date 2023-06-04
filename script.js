let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");
const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");
let tempAmount = 0;

// Set Budget Part
totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  // Empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    // Set Budget
    amount.innerHTML = tempAmount;
    // Set Balance
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    // Clear Input Box
    totalAmount.value = "";
  }
});
// Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

// Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = balanceValue.innerText;
  let currentExpense = expenditureValue.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;

  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }

  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

// Function To Create List
const listCreator = (expenseName, expenseCategory, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  list.appendChild(sublistContent);

  let productElement = document.createElement("p");
  productElement.classList.add("product");
  productElement.innerText = expenseName;
  sublistContent.appendChild(productElement);

  let categoryElement = document.createElement("p");
  categoryElement.classList.add("category");
  categoryElement.innerText = expenseCategory;
  sublistContent.appendChild(categoryElement);

  let amountElement = document.createElement("p");
  amountElement.classList.add("amount");
  amountElement.innerText = expenseValue;
  sublistContent.appendChild(amountElement);

  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  sublistContent.appendChild(editButton);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(deleteButton);
};


// Function To Add Expenses
checkAmountButton.addEventListener("click", () => {
  // Empty checks
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }

  disableButtons(false);

  let expenditure = parseInt(userAmount.value);
  let sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;

  let selectedCategory = category.options[category.selectedIndex].text;

  listCreator(productTitle.value, selectedCategory, userAmount.value);

  productTitle.value = "";
  category.value = "";
  userAmount.value = "";
});
