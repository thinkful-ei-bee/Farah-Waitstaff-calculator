'use strict';
/* global $ */

/*
Subtotal = baseMealPrice + tax
Tip =  baseMealPrice * tipPercentage 
Total = subtotal + tip

Tip Total = sum of all tips computed
Meal Count = total number of meals put intp the tool
Ave Tip = totalTipValue / #meals
*/

const STORE = {
  mealDetails: [],
  tips: [],
};

/*==================
  MARK-UP FUNCTIONS
====================*/
function generateCustomerChargesHTML(){
  const customerCharge = STORE.mealDetails.map(data => 
    `<p>Subtotal: ${data.baseMealPrice + data.taxRate} </p>
     <p>Tip:      ${data.baseMealPrice + data.tipPercentage}</p>
     <p>Total:    ${(data.baseMealPrice + data.taxRate) + (data.baseMealPrice + data.tipPercentage)}`);

    

  return customerCharge;
}

function generateEarningsInfoHTML(tipTotal, mealCount, aveTip){
  // let tipcount = 0;
  // for (let i = 0; i < STORE.mealDetails.length; i++){
  //   if (STORE.mealDetails[i] === )
  // }
}

/*==================
  RENDER FUNCTIONS
====================*/
function renderStore(){
  console.log('hello from render: render store ran');
  const customerCharges = generateCustomerChargesHTML();

  $('.customer-charges').append(customerCharges);
}

function addMealDetails(baseMealPrice, taxRate, tipPercentage){
  STORE.mealDetails.push ({baseMealPrice, taxRate, tipPercentage});
  return STORE.mealDetails[STORE.mealDetails.length-1];
}

function addTip(mealDetails){
  STORE.tips.push(mealDetails.baseMealPrice + mealDetails.tipPercentage);

}

/*======================
EVENT LISTENER FUNCTIONS
========================*/
function handleMealDetailsSubmit(){
  $('form').submit(event => {
    event.preventDefault();
    console.log('handleMealDetailsSubmit ran');

    const baseMealInput = parseInt($('.js-base-meal-price').val());
    const taxRateInput = parseInt($('.js-tax-rate').val());
    const tipPercentageInput = parseInt($('.js-tip-percentage').val());
    
    const mealDetails = addMealDetails(baseMealInput, taxRateInput, tipPercentageInput);
    addTip(mealDetails);
    renderStore();
  });
}

function main(){
  handleMealDetailsSubmit();
}

$(main);