const pending = 0;
const approved = 1;
const hold = 2;
const rejected = 3;
const status_arr = {'':'All', 'pending' : 'Pending','approved' : 'Approved','hold' : 'Hold','rejected' : 'Rejected'};
const deleted_yes = 1;
const deleted_no = 0;
module.exports = {pending, approved, hold, rejected, status_arr, deleted_no, deleted_yes};