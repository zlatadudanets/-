document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    const form = document.getElementById('calculatorForm');
    const quantityInput = document.getElementById('quantity');
    const itemSelect = document.getElementById('item');
    const resultContent = document.getElementById('resultContent');
    const quantityError = document.getElementById('quantityError');
    const itemError = document.getElementById('itemError');
    
    const quantityRegex = /^[1-9]\d*$/;
    
    function clearErrors() {
        quantityError.textContent = '';
        itemError.textContent = '';
    }
    
    function showError(errorElement, message) {
        errorElement.textContent = message;
    }
    
    function validateQuantity(quantity) {
        if (!quantity || quantity.trim() === '') {
            showError(quantityError, 'Введите количество');
            return false;
        }
        
        if (!quantityRegex.test(quantity.trim())) {
            showError(quantityError, 'Количество должно быть положительным числом');
            return false;
        }
        
        return true;
    }
    
    function validateItem(itemValue) {
        if (!itemValue || itemValue === '') {
            showError(itemError, 'Выберите товар');
            return false;
        }
        return true;
    }
    
    function calculateCost(quantity, itemValue) {
        const selectedOption = itemSelect.querySelector('option[value="' + itemValue + '"]');
        const price = parseInt(selectedOption.getAttribute('data-price'), 10);
        const totalCost = quantity * price;
        
        return {
            quantity: quantity,
            itemName: selectedOption.textContent.split(' - ')[0],
            price: price,
            totalCost: totalCost
        };
    }
    
    function displayResult(result) {
        resultContent.innerHTML = 
            'Товар: ' + result.itemName + '<br>' +
            'Цена: ' + result.price + ' руб.<br>' +
            'Количество: ' + result.quantity + ' шт.<br>' +
            'Общая стоимость: ' + result.totalCost + ' руб.';
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        clearErrors();
        
        const quantity = quantityInput.value.trim();
        const itemValue = itemSelect.value;
        
        const isQuantityValid = validateQuantity(quantity);
        const isItemValid = validateItem(itemValue);
        
        if (!isQuantityValid || !isItemValid) {
            return;
        }
        
        const numQuantity = parseInt(quantity, 10);
        const result = calculateCost(numQuantity, itemValue);
        displayResult(result);
    });
    
    quantityInput.addEventListener('input', function() {
        if (quantityError.textContent) {
            quantityError.textContent = '';
        }
    });
    
    itemSelect.addEventListener('change', function() {
        if (itemError.textContent) {
            itemError.textContent = '';
        }
    });
});