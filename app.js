const reasonInput = document.querySelector('#input-reason');
const amount = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-clear');
const confirmBtn = document.querySelector('#btn-add-expense');
const expensesList = document.querySelector('#expenses-list');
const alertCtrl = document.querySelector('ion-alert-controller');

let list = [];

const clear = () =>{
  reasonInput.value = '';
  amount.value = '';
};

confirmBtn.addEventListener('click', () =>{
    const enteredReason = reasonInput.value;
    const enterendAmount = amount.value;

    if (enteredReason.trim().length <=0 || enterendAmount <=0 || enterendAmount.trim().length <=0){
        alertCtrl.create({
            message: 'Enter valid data',
            header: 'invalid input',
            buttons: ['Ok']
        }).then(alertElement =>{
            alertElement.present();
        });
        return;
    }
    clear();
    const newItem = document.createElement('ion-item');
    newItem.textContent = enteredReason + ': £' + enterendAmount;
    expensesList.appendChild(newItem);

});

cancelBtn.addEventListener('click', clear);