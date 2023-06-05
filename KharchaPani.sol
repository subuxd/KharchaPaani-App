// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract FinanceTracker {
    struct Expense {
        string expenseName;
        uint amount;
    }

    struct Category {
        string name;
        uint budget;
        uint totalSpent;
        uint remainingBalance;
        mapping(uint => Expense) expenses;
        uint expenseCount;
    }
    mapping(uint => Category) public categories;
    uint categoryCount = 1;

    function addBudget(string memory _name, uint _budget) public {
        Category storage newCategory = categories[categoryCount];
        newCategory.name = _name;
        newCategory.budget = _budget;
        newCategory.remainingBalance = _budget;
        newCategory.expenseCount = 1;
        categoryCount++;
    }

    function updateBudget(
        uint index,
        string memory _name,
        uint _budget
    ) public {
        Category storage newCategory = categories[index];
        newCategory.name = _name;
        newCategory.budget = _budget;
        newCategory.remainingBalance =
            newCategory.budget -
            newCategory.totalSpent;
    }

    function addExpense(
        uint _catIndex,
        string memory _name,
        uint _amount
    ) public {
        require(_catIndex <= categoryCount, "Invalid Category");

        Category storage element = categories[_catIndex];
        element.expenses[element.expenseCount] = Expense(_name, _amount);
        element.expenseCount++;

        element.totalSpent = findTotalSpent(_catIndex);
        element.remainingBalance = findRemainingBalance(_catIndex);
    }

    function updateExpense(
        uint _catIndex,
        uint _expIndex,
        string memory _name,
        uint _amount
    ) public {
        require(_catIndex <= categoryCount, "Invalid Category");
        Category storage element = categories[_catIndex];
        require(_expIndex <= element.expenseCount, "Invalid Category");

        element.expenses[_expIndex].expenseName = _name;
        element.expenses[_expIndex].amount = _amount;

        element.totalSpent = findTotalSpent(_catIndex);
        element.remainingBalance = findRemainingBalance(_catIndex);
    }

    function findTotalSpent(uint _index) internal returns (uint) {
        Category storage element = categories[_index];
        element.totalSpent = 0;
        for (uint i = 1; i <= element.expenseCount; i++) {
            element.totalSpent += element.expenses[i].amount;
        }
        return element.totalSpent;
    }

    function findRemainingBalance(uint _index) internal returns (uint) {
        Category storage element = categories[_index];
        element.remainingBalance = element.budget - element.totalSpent;
        return element.remainingBalance;
    }

    function getAllExpenses(
        uint _catIndex
    ) public view returns (Expense[] memory) {
        require(_catIndex <= categoryCount, "Invalid Category");
        Category storage element = categories[_catIndex];

        Expense[] memory allExpenses = new Expense[](element.expenseCount);
        for (uint i = 1; i < element.expenseCount; i++) {
            Expense storage expense = element.expenses[i];
            allExpenses[i] = expense;
        }

        return allExpenses;
    }
}
