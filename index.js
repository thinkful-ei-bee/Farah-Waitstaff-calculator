'use strict';
/* global $ */

const STORE = {
  mealDetails: [],
  tips: [],
};

/*==================
  MARK-UP FUNCTIONS
====================*/
function generateCustomerChargesHTML(){
  let subtotal = 0;
  let tip = 0;
  let total = 0;

  for (let i = 0; i < STORE.mealDetails.length; i++){
    subtotal += STORE.mealDetails[i].baseMealPrice + (STORE.mealDetails[i].taxRate/100);
    tip += STORE.mealDetails[i].baseMealPrice * (STORE.mealDetails[i].tipPercentage/100);
    total += STORE.mealDetails[i].baseMealPrice + (STORE.mealDetails[i].taxRate/100) + (STORE.mealDetails[i].baseMealPrice * (STORE.mealDetails[i].tipPercentage/100));
  }

  $('#subTotal').text(subtotal);
  $('#tip').text(tip);
  $('#total').text(total);
}

function generateEarningsInfoHTML(){
  let tipCount = 0;
  let mealCount = 0;
  let aveTip = 0;
  tipCount += STORE.tips.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  mealCount += STORE.mealDetails.length;
  aveTip += Math.round((tipCount/mealCount)) || ' ';

  $('#tipTotal').text(tipCount);
  $('#mealCount').text(mealCount);
  $('#aveTip').text(aveTip);
}

/*==================
  RENDER FUNCTIONS
====================*/
function renderStore(){
  const customerCharges = generateCustomerChargesHTML();
  const earningsInfo = generateEarningsInfoHTML();

  $('.customer-charges').append(customerCharges);
  $('.earnings-info').append(earningsInfo);
}

function addMealDetails(baseMealPrice, taxRate, tipPercentage){
  STORE.mealDetails.push ({baseMealPrice, taxRate, tipPercentage});
  return STORE.mealDetails[STORE.mealDetails.length-1];
}

function addTip(mealDetails){
  STORE.tips.push(mealDetails.baseMealPrice * (mealDetails.tipPercentage/100));
}

function clearMealDetails(){
  return STORE.mealDetails = [];
}

function clearTips(){
  return STORE.tips = [];
}

/*======================
EVENT LISTENER FUNCTIONS
========================*/
function handleMealDetailsSubmit(){
  $('form').submit(event => {
    event.preventDefault();

    const baseMealInput = parseInt($('.js-base-meal-price').val());
    const taxRateInput = parseInt($('.js-tax-rate').val());
    const tipPercentageInput = parseInt($('.js-tip-percentage').val());
    
    const mealDetails = addMealDetails(baseMealInput, taxRateInput, tipPercentageInput);
    addTip(mealDetails);
    renderStore();
  });
}

function handleResetButton(){
  $('.container').on('click', '.js-reset-button', event => {
    event.preventDefault();
    clearMealDetails();
    clearTips();
    renderStore();
  });
}

function main(){
  handleMealDetailsSubmit();
  handleResetButton();
}

$(main);