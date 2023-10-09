function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(employeesData) {
  return employeesData.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const dates = employee.timeInEvents.map(event => event.date);
  const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(employee => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}

// Example usage:

// Creating employee records
let employeesData = [
  ["John", "Doe", "Developer", 25],
  ["Jane", "Smith", "Designer", 30]
];

let employees = createEmployeeRecords(employeesData);

// Recording time in and out events
employees.forEach(employee => {
  createTimeInEvent(employee, "2023-10-09 0900");
  createTimeOutEvent(employee, "2023-10-09 1700");
});

// Calculating total payroll
let totalPayroll = calculatePayroll(employees);
console.log("Total Payroll: $" + totalPayroll);


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesForUs = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

