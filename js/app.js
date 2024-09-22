const seatSelectedEl=document.getElementById('seat-selected');
const totalBookedEl=document.getElementById('total-booked');
const availableSeatEl=document.getElementById('available-seat');
const totalPriceEl=document.getElementById('total-price');
const couponInputEl=document.getElementById('coupon-input');
const btnCouponEl=document.getElementById('btn-coupon');
const defaultTextEl=document.getElementById('default-text');
const grandTotalEl=document.getElementById('grand-total');
const phoneNumberEl=document.getElementById('phone-number');
const btnNextEl=document.getElementById('btn-next');

let selectedSeat=[];
let totalPrice=0;
function handleSelectSeat(event){
    
    const value=event.innerText;

    if(selectedSeat.includes(value)){
        return alert('Seat Already Booked')
    }
    else if(selectedSeat.length < 4){


    event.classList.add('bg-primary');
    event.classList.add('text-white');
    
    // total seat count

    selectedSeat.push(event.innerText)
    totalBookedEl.innerText= selectedSeat.length;

    // decrease total seat

    const availableSeatValue=parseFloat(availableSeatEl.innerText);
    const newAvailableSeatValue=availableSeatValue-1;
    availableSeatEl.innerText=newAvailableSeatValue;

        // default text
        defaultTextEl.classList.add('hidden');


    // seat booked info

    seatSelectedEl.innerHTML +=`
    <li class="text-base font-normal flex justify-between">
    <span>${event.innerText}</span>
    <span>Economy</span>
    <span>550</span>
    </li>
    `
    // update price
    totalPrice += 550;
    totalPriceEl.innerText= totalPrice.toFixed(2);

    // active coupon button

    if(selectedSeat.length > 3){
        couponInputEl.removeAttribute('disabled');
        btnCouponEl.removeAttribute('disabled');
    }

    // can not select same seat 2nd time and more than 4 seat
    }
    else{
        return alert('Maximum Seat Booked')
    }

}

// coupon apply

document.getElementById('btn-coupon').addEventListener('click',function(){
    const couponInputValue=couponInputEl.value;
    let couponSave=0;

    if(couponInputValue !== "NEW50" && couponInputValue !== "couple 20"){
        alert('Your coupon is not Valid');
        return;
    }
    if(couponInputValue === "NEW50"){
        couponSave=totalPrice* .15;
    }
    else if(couponInputValue === "couple 20"){
        couponSave=totalPrice * .20;
    }

    const showCouponPriceEl=document.getElementById('show-coupon');
    showCouponPriceEl.innerHTML=`
    <p>Discount</p>
    <p>
        <span>-BDT:</span>
        <span>${couponSave.toFixed(2)}</span>
    </p>
    `

    const grandTotalValue=totalPrice-couponSave;
    grandTotalEl.innerText=grandTotalValue.toFixed(2);
})

phoneNumberEl.addEventListener('input',function(e){
    const inputValue=e.target.value;
    if(inputValue.length >= 11){
        btnNextEl.removeAttribute('disabled');
    }
})


// reset window
document.getElementById('btn-continue').addEventListener('click',function(){
    window.location.reload();
})
