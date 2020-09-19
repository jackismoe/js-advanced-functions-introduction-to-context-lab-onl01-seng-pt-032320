const createEmployeeRecord = (row) => {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = (array) => {
  return array.map(element => createEmployeeRecord(element))
}

const createTimeInEvent = (employee, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')
  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

const createTimeOutEvent = (employee, dateStamp) => {
  let [date, hour] = dateStamp.split(' ')
  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  })
  return employee
}

const hoursWorkedOnDate = (employee, desiredDate) => {
  let inEvent = employee.timeInEvents.find(e => e.date === desiredDate)
  let outEvent = employee.timeOutEvents.find(e => e.date === desiredDate)
  return (outEvent.hour - inEvent.hour)/100
}

const wagesEarnedOnDate = (employee, desiredDate) => {
  let wage = hoursWorkedOnDate(employee, desiredDate) * employee.payPerHour
  return parseFloat(wage.toString())
}

const allWagesFor = (employee) => {
  let dates = employee.timeInEvents.map(e =>  e.date)
  let payable = dates.reduce((memo, d) => memo + wagesEarnedOnDate(employee, d))
  return payable
}

const findEmployeeByFirstName = (source, firstName) => {
  return source.find(record => record.firstName === firstName)
}

const calculatePayroll = (employee) => {
  return employee.reduce((memo, record) => {
    return memo + allWagesFor(record)
  }, 0)
}