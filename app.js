const reasonInput = document.querySelector('#input-reason');
const amount = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-clear');
const confirmBtn = document.querySelector('#btn-add-expense');

confirmBtn.addEventListener('click', () =>{
    const enteredReason = reasonInput.value;
    const enterendAmount = amount.value;

    if (enteredReason.trim().length <=0 || enterendAmount <=0 || enterendAmount.trim().length <=0){
        return;
    }
    console.log(enteredReason, '£', enterendAmount);
});