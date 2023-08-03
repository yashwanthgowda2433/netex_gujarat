//Roles
const super_admin = 1;
const admin = 2;
const analyst = 3;
const field_engineer = 4;
const zone_user = 5;
const dept_user = 6;
const executive = 7;
const mis = 10;					 
const l3tl = 8;
const l2tl = 9;
const outcall = 11;
const client = 12;

const roles = {
	"1": "Super admin",
	"2": "Manager",
	"3": "Analysts",
	"4": "Field engineer",
	"5": "Zone User",
	"6": "Department User",
	"7": "L2 Executive",
	"8": "L3 Team Lead",
	"9": "L2 Team Lead",
	"10": "MIS Executive",
	"11": "Outcall User",
	"12": "Client"
};
//const sla_fwz_depts = [1 => "Optimiztion", 2 => "ONM", 3 => "Core", 4 => "IBS"]; //Second level forward to zone options
const sla_fwz_depts = {
	"3": "ONM",
	"4": "Core",
	"5": "IN"
}; 
const zones = {
	"2": "Mangalore",
	"3": "Hubli",
	"4": "Davanagere",
	"5": "Mysore",
	"6": "Banglore East",
	"7": "Banglore West"
}; //Second level forward to zone options

//Account status
const active = 1;
const in_active = 0;

//Confirmation status
const confirmed_yes = 1;
const confirmed_no = 0;

const opti_yes = 1;
const opti_no = 0;

//Logged In status
const is_logged_in_yes = 1;
const is_logged_in_no = 0;

//Gender
const male = 1;
const female = 0;

//Account deletion status
const deleted_yes = 1;
const deleted_no = 0;

module.exports = {active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
    admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
    roles, sla_fwz_depts, zones, is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no};