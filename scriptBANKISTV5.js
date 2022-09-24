'use strict';

/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-09-11T17:01:17.194Z',
    '2022-09-13T03:36:17.929Z',
    '2022-09-14T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];
// Elements
const labelWelcome = document.querySelector('.welcome');
// console.log('labelWelcome :', labelWelcome);
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currentAccount;
let receiverAcc;

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log('daysPassed:', daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, '0');
    // const month = now.getMonth() + 1;
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    // return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
// ==================
const formatCur = function (value, locale, currency) {
  const currencyOptions = {
    style: 'currency',
    currency: currency,
  };
  return new Intl.NumberFormat(locale, currencyOptions).format(value);
};

const displayMovements = function (acc, sort = false) {
  console.log('Current AccountTest:', acc);
  const movementsCopy = acc.movements.slice();
  console.log('movementsCopy:', movementsCopy);
  containerMovements.innerHTML = '';
  //sort = flase, then movs= movements (default)
  // const movs = sort ? movementsCopy.sort((a, b) => a - b) : movements;
  const movs = sort
    ? movementsCopy.sort((a, b) => {
        if (a > b) {
          return -1;
        }
        if (a < b) {
          return 1;
        }
      })
    : movementsCopy.sort((a, b) => {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
      });

  // movements.forEach((element, index, arr) => {
  movs.forEach((element, index, arr) => {
    const type = element > 0 ? 'deposit' : 'withdrawal';
    const date1 = new Date(acc.movementsDates[index]);
    const displayDate = formatMovementDate(date1, acc.locale);
    const currencyOptions = {
      style: 'currency',
      currency: acc.currency,
    };
    const formattedMov = new Intl.NumberFormat(
      acc.locale,
      currencyOptions
    ).format(element);
    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
         <div class="movements__value">${formattedMov}</div>
     </div>`;
    ////////  beforeend
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
{
  /* <div class="movements__value">${element.toFixed(2)}€</div> */
  //=211
}
// displayMovements(account1.movements);
//=========================================================
// monitor the state of cliking Sort button
let sorted = false; //in the beginning our array is not sorted
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // displayMovements(currentAccount.movements, true);
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
//=========================================================
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov, index) => acc + mov, 0);

  // add new property to the account obj
  account.balance = balance;
  const currencyOptions = {
    style: 'currency',
    currency: account.currency,
  };
  const formattedBalance = new Intl.NumberFormat(
    account.locale,
    currencyOptions
  ).format(balance);
  // labelBalance.textContent = balance + ' EUR';
  labelBalance.textContent = `${formattedBalance} `;
};
// labelBalance.textContent = `${balance.toFixed(2)} €`; //=238
// calcDisplayBalance(account1.movements);
const calcDisplaySummary = function (acc) {
  //=========================
  const incomes = acc.movements
    .filter(el => el > 0)
    .reduce((acc, next) => acc + next, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
  // `${incomes.toFixed(2)}€`;
  //===========================
  const out = acc.movements
    .filter(el => el <= 0)
    .reduce((acc, next) => acc + next, 0);
  console.log('out', out);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);
  // `${Math.abs(out).toFixed(2)}€`;
  //=========================
  const interest = acc.movements
    .filter(el => el > 0)
    .map(el => (el * acc.interestRate) / 100)
    .filter((el, index, arr) => {
      // console.log('arr', arr);
      return el >= 1;
    })
    .reduce((acc, next) => acc + next, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
  // `${interest.toFixed(2)}%`;
};

// const aaa = createUserName('Steven Thomas Williams');
// Parameter now is: Array of account:
function createUserName(accs) {
  //el: an obj
  accs.forEach(function (el) {
    //add new property: el.username
    el.username = el.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
    return el.username;
  });
}
// const aaa = createUserName('Steven Thomas Williams');
const aaa = createUserName(accounts);
// ==================================================================
let timer;
const startLogOutTimer = function () {
  //Set time to 5 minutes
  let time = 20; //120 seconds (= 2minutes) ;1minute= 100.000 milliseconds
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, '0'); //String convert to string
    const sec = String(time % 60).padStart(2, '0'); //Remain operator

    //In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // // Decrese 1 second
    // time = time - 1;
    //When reach 0 second, stop timer and log the user out
    if (time === 0) {
      clearInterval(timer);
      // debugger;
      labelWelcome.textContent = `Log in to get started`;
      // containerApp.style.opacity = 100;
      document.querySelector('.app').style.opacity = 0;
    }
    // Decrese 1 second
    time = time - 1;
  };

  //Call the timer every second
  tick();
  // const timer = setInterval(tick, 1000);
  timer = setInterval(tick, 1000);
  return timer;
};
// ==================================================================
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('inputLoginUsername:', inputLoginUsername.value);
  currentAccount = accounts.find(
    el => el.username === inputLoginUsername.value
  );
  console.log('currentAccount:', currentAccount);
  // if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('inputLoginPin.value:', inputLoginPin.value);
    //Display UI and welcome message
    // owner: 'Jonas Schmedtmann',
    const wel = currentAccount.owner.split(' ')[0];
    labelWelcome.textContent = `Welcome back, ${wel}`;
    // containerApp.style.opacity = 100;
    document.querySelector('.app').style.opacity = 100;
    // ===============================================================

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //['numeric': 8], ['long': August]
      year: 'numeric', //'numeric': 2022, '2-digit':22
      // weekday: 'long',
    };
    // const locale = navigator.language;
    const locale = currentAccount.locale;

    const now = new Date();
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );
    // ===============================================================
    //Display movements
    // displayMovements(currentAccount.movements);
    displayMovements(currentAccount);
    //Display balance
    calcDisplayBalance(currentAccount);
    // calcDisplayBalance(currentAccount.movements);
    //Display summary
    calcDisplaySummary(currentAccount);
  } else {
    console.log('Login fail');
  }
  if (timer) clearInterval(timer);
  timer = startLogOutTimer();
  //Clear Logininput and pin fields
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  //Lose focus
  inputLoginPin.blur();
});
// btnTransfer, inputTransferTo, inputTransferAmount

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  receiverAcc = accounts.find(el => el.username === inputTransferTo.value);
  // console.log('receiverAcc:', receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    // receiverAcc &&
    amount <= currentAccount.balance &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Add negative amount to current user(Sender)
    currentAccount.movements.push(-amount);
    //Add positive amount to reciver user
    receiverAcc.movements.push(amount);
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    //Update Summary, balance
    //Display movements
    // displayMovements(currentAccount.movements);
    displayMovements(currentAccount);
    //Display balance
    calcDisplayBalance(currentAccount);
    // calcDisplayBalance(currentAccount.movements);
    //Display summary
    calcDisplaySummary(currentAccount);
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(Number(inputLoanAmount.value));
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);
      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());
      //Update UI
      // displayMovements(currentAccount.movements);
      // displayMovements(currentAccount.movements);
      displayMovements(currentAccount);
      //Display balance
      calcDisplayBalance(currentAccount);
      // calcDisplayBalance(currentAccount.movements);
      //Display summary
      calcDisplaySummary(currentAccount);
    }, 3500);
  }
  inputLoanAmount.value = '';
  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      el => el.username === currentAccount.username
    );
    // Delete Account
    accounts.splice(index, 1);
    // Log user out: Actually hide UI(opacity = 0;)
    document.querySelector('.app').style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
labelBalance.addEventListener('click', function () {
  const movementsFromUI = Array.from(
    document.querySelectorAll('.movements__value')
  );
  console.log('movementsFromUI:', movementsFromUI);
  const tmp1 = movementsFromUI.map(el => el.innerHTML.replace('€', ''));
  console.log(movementsFromUI.map(el => el.innerHTML));
  console.log('tmp1:', tmp1);
  // const movementsFromUI2 = [...document.querySelectorAll('.movements__value')];
});
//

labelBalance.addEventListener('click', function () {
  const noteList = document.querySelectorAll('.movements__row');
  console.log('NodeList:', noteList);
  const spreadNoteList = [...noteList];
  console.log('spreadNoteList:', spreadNoteList);
  noteList.forEach(function (row, index) {
    if (index % 2 === 0) {
      row.style.backgroundColor = 'orangered';
    }
    if (index % 3 === 0) {
      row.style.backgroundColor = 'blue';
    }
  });
});
