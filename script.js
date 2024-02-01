document.addEventListener('DOMContentLoaded', () => {
    loadExpenses();
});

function addExpense() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Form validation
    if (!validateInput(description, amount)) {
        return;
    }

    const expense = {
        id: new Date().getTime(),
        description,
        amount
    };

    let expenses = getExpenses();
    expenses.push(expense);
    saveExpenses(expenses);

    loadExpenses();
    clearForm();
}

function deleteExpense(id) {
    // Confirmation alert before deleting an expense
    const isConfirmed = confirm('Are you sure you want to delete the expense?');

    if (isConfirmed) {
        let expenses = getExpenses();
        expenses = expenses.filter(expense => expense.id !== id);
        saveExpenses(expenses);
        loadExpenses();
    }
}
// Function to edit the expenses

function editExpense(id) {
    let expenses = getExpenses();
    const expenseToEdit = expenses.find(expense => expense.id === id);

    if (expenseToEdit) {
        const updatedDescription = prompt('Enter updated description:', expenseToEdit.description);
        const updatedAmount = parseFloat(prompt('Enter updated amount:', expenseToEdit.amount));

        if (validateInput(updatedDescription, updatedAmount)) {
            expenseToEdit.description = updatedDescription;
            expenseToEdit.amount = updatedAmount;
            saveExpenses(expenses);
            loadExpenses();
        } else {
            alert('Invalid input for editing expense.');
        }
    }
}

function loadExpenses() {
    const expenses = getExpenses();
    const expenseList = document.getElementById('expense-list');

    expenseList.innerHTML = '';

    if (expenses.length === 0) {
        expenseList.innerHTML = '<p>No expenses available.</p>';
    } else {
        expenses.forEach(expense => {
            const div = document.createElement('div');
            div.className = 'expense-item';
            div.innerHTML = `
                <span>${expense.description}</span>
                <span>${expense.amount}</span>
                <button onclick="editExpense(${expense.id})">Edit</button>
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(div);
        });
    }
}

function getExpenses() {
    const expensesString = localStorage.getItem('expenses');
    return expensesString ? JSON.parse(expensesString) : [];
}

function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function clearForm() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

// Function to validate user input
function validateInput(description, amount) {
    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid description and amount.');
        return false;
    }
    return true;
}
