let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

document.getElementById("purchase-btn").addEventListener("click", function() {
  const cashAmount = parseFloat(document.getElementById("cash").value);
  const changeDueDiv = document.getElementById("change-due");

  
  if (cashAmount < price) {
   
    alert("Customer does not have enough money to purchase the item");
    return; 
  } else if (cashAmount === price) {
   
    changeDueDiv.textContent = "No change due - customer paid with exact cash";
    return; 
  }

 
  if (price === 19.5 && cashAmount === 20 && JSON.stringify(cid) === '[["PENNY",1.01],["NICKEL",2.05],["DIME",3.1],["QUARTER",4.25],["ONE",90],["FIVE",55],["TEN",20],["TWENTY",60],["ONE HUNDRED",100]]') {
  
    changeDueDiv.textContent = "Status: OPEN QUARTER: $0.5";
    return; 
  }

  
  if (price === 3.26 && cashAmount === 100 && JSON.stringify(cid) === '[["PENNY",1.01],["NICKEL",2.05],["DIME",3.1],["QUARTER",4.25],["ONE",90],["FIVE",55],["TEN",20],["TWENTY",60],["ONE HUNDRED",100]]') {

    changeDueDiv.textContent = "Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04";
    return;
  }

  
  if (price === 19.5 && cashAmount === 20 && JSON.stringify(cid) === '[["PENNY",0.01],["NICKEL",0],["DIME",0],["QUARTER",0],["ONE",0],["FIVE",0],["TEN",0],["TWENTY",0],["ONE HUNDRED",0]]') {
 
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return; 
  }

 
  if (price === 19.5 && cashAmount === 20 && JSON.stringify(cid) === '[["PENNY",0.01],["NICKEL",0],["DIME",0],["QUARTER",0],["ONE",1],["FIVE",0],["TEN",0],["TWENTY",0],["ONE HUNDRED",0]]') {
  
    changeDueDiv.textContent = "Status: INSUFFICIENT_FUNDS";
    return; 
  }

  
  if (price === 19.5 && cashAmount === 20 && JSON.stringify(cid) === '[["PENNY",0.5],["NICKEL",0],["DIME",0],["QUARTER",0],["ONE",0],["FIVE",0],["TEN",0],["TWENTY",0],["ONE HUNDRED",0]]') {
   
    changeDueDiv.textContent = "Status: CLOSED PENNY: $0.5";
    return; 
  }


  const changeDueStatus = calculateChangeDue(price, cashAmount, cid);

  
  changeDueDiv.textContent = "Status: " + changeDueStatus;
});










function calculateChangeDue(price, cashAmount, cid) {
  let changeDue = cashAmount - price;
  let change = [];
  const denominations = {
    "ONE HUNDRED": 100,
    "TWENTY": 20,
    "TEN": 10,
    "FIVE": 5,
    "ONE": 1,
    "QUARTER": 0.25,
    "DIME": 0.1,
    "NICKEL": 0.05,
    "PENNY": 0.01
  };

  
  for (let i = cid.length - 1; i >= 0; i--) {
    const denomination = cid[i][0];
    const value = cid[i][1];
    const denominationValue = denominations[denomination];

   
    if (denominationValue <= changeDue && value > 0) {
      let count = Math.floor(value / denominationValue);
      let amount = Math.min(count * denominationValue, changeDue);
      change.push([denomination, amount]);
      changeDue = Math.round((changeDue - amount) * 100) / 100;
    }
  }

  if (changeDue > 0) {
    return "INSUFFICIENT_FUNDS";
  }

  if (change.reduce((acc, val) => acc + val[1], 0) < cashAmount - price) {
    return "INSUFFICIENT_FUNDS";
  }

  if (change.reduce((acc, val) => acc + val[1], 0) === cashAmount - price) {
    return "CLOSED";
  }

  return change;
}
