const rth_yes = 1;
const rth_no = 0;

const assigned_yes = 1;
const assigned_no = 0;
	
const reassigned_yes = 1;
const reassigned_no = 0;

const pending = 0;
const progress = 1;
const completed = 2;
const cancelled = 3;
const closed = 4;
const fwz = 5;
const transfer = 6;
const withdraw = 7;
const addedbyl2_executive = 8;
const fwz_to_zone = 17;
const approve_for_fieldvisit = 9;
const analysis_required = 10;
const analysis_required_fwdbyl3 = 19;
const zone_analysed = 20;
const zone_closed = 21;
const l3_closed = 22;
const optimisationprogress = 11;
const analysed = 12;
const optimised = 13;
const closedbyl2_executive = 14;
const resolved_and_closed = 15;
const not_resolved_and_closed = 16;
const closedbyl2_tl = 18;
const fwd_to_l2 = 23;
const closedbyl2_outcall = 24;
const addedbyl2_outcall = 25;
const preopti = 26;
const postopti = 27;
const optimisationpending = 28;
const preoptipending = 29;
const preoptiprogress = 30;
const preopticompleted = 31;

	
const task_status = {"0":"Pending", "1":"Progress", "2":"Completed", "3":"Canceled", "4":"Closed", "5":"Forward to Team", "8":"Added by L2executive"};

const corporate = 1;
const postpaid = 2;
const prepaid = 3;
const escalation = 4;

const vip = 1;
const employees = 2;
const ebu = 3;
const service_plus = 4;
const repeated = 5;
const social_media = 6;
const outbound = 7;
const my_idea = 8;
const others = 9;

const tat_vip = 12;
const tat_employees = 12;
const tat_ebu = 36;
const tat_service_plus = 12;
const tat_social_media = 36;
const tat_my_idea = 36;
const tat_outbound = 24;
const tat_repeated = 36;
const tat_others = 36;
const tat_customer_categories = {"1":"12", "2":"12", "3":"36", "4":"12", "5":"36", "6":"36", "7":"24", "8":"36", "9":"36"};

const all_network = 1;
const two_g = 2;
const three_g = 3;
const four_g = 4;
const two_g_three_g = 5;
const three_g_four_g = 6;
const four_g_two_g = 7;

const withdrawn_yes = 1;
const withdrawn_no = 0;
	
const fieldvisit_yes = 1;
const fieldvisit_no = 0;

const analyse_yes = 1;
const analyse_no = 0;	
	
const fwdtofe_yes = 1;
const fwdtofe_no = 0;
	
const coverage_related = 1;
const voice_related = 2;
const data_related = 3;

const subscription_types = {
	"2": "Postpaid",
	"1": "Prepaid",
	"3": "Escalation"
};
const zones = '';
const customer_categories = '';
const cust_categories = '';
const categories = '';
const p1_categories = '';
const esc_categories = '';
const districts = '';
const priorities = '';
	
//const customer_categories = {
// 	"1": "VIP",
// 	"2": "Employees",
// 	"3": "EBU",
// 	"4": "Service Plus",
// 	"5": "Social Media",
// 	"6": "My idea",
// 	"7": "Outbound",
// 	"8": "Repeated",
// 	"9": "Others"
// };
const network_types = {
	"1": "All network",
	"2": "2G",
	"3": "3G",
	"4": "4G",
	"5": "Volte"
};
const prepaid_segment = {
	"13": "SILVER",
	"6": "PM - Prepaid Internal",
	"7": "PC - Prepaid Copper",
	"1": "PD - Prepaid Diamond",
	"4": "PG - Prepaid Gold",
	"8": "PM - Prepaid Mercury",
	"3": "PP - Prepaid Platinum",
	"5": "PS - Prepaid Silver",
	"2": "PT - Prepaid Titanium",
	"11": "ServicePlusGold",
	"12": "Default"
};
const complaint_types = {
	"Coverage related": "Coverage related",
	"Voice related": "Voice related",
	"Data related": "Data related"
};
const complaint_postpaid_types = {
	"Accessibility": "Accessibility",
	"Coverage": "Coverage",
	"Network Down": "Network Down",
	"No Access INC or OG": "No Access INC or OG",
	"Roaming": "Roaming",
	"Speed Related": "Speed Related",
	"Tarang": "Tarang",
	"Voice Quality": "Voice Quality"
};
const complaint_prepaid_types = {
	"Data Accessibility": "Data Accessibility",
	"Data Speed": "Data Speed",
	"Network Coverage": "Network Coverage",
	"Network Down": "Network Down",
	"Roaming": "Roaming",
	"SMS-No Access INC or OG": "SMS-No Access INC or OG",
	"Tarang - Voice And Data": "Tarang - Voice And Data OG",
	"Voice Quality": "Voice Quality",
	"Voice-No Access INC or OG": "Voice-No Access INC or OG"
};
const task_status_filters = {
	"": "All",
	"pending": "Pending",
	"progress": "Progress",
	"completed": "Completed",
	"closed": "Closed",
	"cancelled": "Cancelled",
	"analysed": "analysed",
	"fwd": "Forward To RF",
	"withdrawn": "withdrawn"
};
const task_status_filters_dept = {
	"": "All",
	"pending": "Pending",
	"progress": "Progress",
	"completed": "Completed"
};
const task_addedby_options = {
	"": "Select",
	"field_engineer": "Added by Field engineer",
	"executive": "added by L2 TSG",
	"l2tl": "Added by L2 TL",
	"all": "Added by All"
};

const tat_excluded_hours = 15;
const tat_start_time = "09:00:00";
const tat_end_time = "18:00:00";
const tat_expired_sql = '';
const tat_calc_sql = '';
	// public static $tat_sql = '';
const tat_stop_sql = '';

const district_options = {
	"Thiruvananthapuram": "Thiruvananthapuram",
	"Kollam": "Kollam",
	"Kottayam": "Kottayam",
	"Pathanamthitta": "Pathanamthitta",
	"Idukki": "Idukki",
	"Alappuzha": "Alappuzha",
	"Ernakulam": "Ernakulam",
	"Thrissur": "Thrissur",
	"Palakkad": "Palakkad",
	"Malappuram": "Malappuram",
	"Kozhikode": "Kozhikode",
	"Wayanad": "Wayanad",
	"Kannur": "Kannur",
	"Kasargod": "Kasargod"
};
	
	
const visit_pending_option = 0;
const analyze_pending_option = 1;
const dept_pending_option = 2;
const visit_progress_option = 3;
const optimization_progress_option = 4;
const visit_completed_option = 5;
const analyze_completed_option = 6;
const revertTeam_option = 7;
const closedwithoutFV_option = 8;
const directL2Close_option = 9;
const resolvedClosed_option = 10;
const notResolvedClosed_option = 11;

module.exports = { rth_yes, rth_no, assigned_yes, assigned_no, reassigned_yes, reassigned_no, pending, progress, completed,
    cancelled,closed,fwz,transfer,withdraw,addedbyl2_executive,fwz_to_zone,approve_for_fieldvisit,analysis_required,
    analysis_required_fwdbyl3,zone_analysed,zone_closed,l3_closed,optimisationprogress,analysed,optimised,closedbyl2_executive,
    resolved_and_closed,not_resolved_and_closed,closedbyl2_tl,fwd_to_l2,closedbyl2_outcall,addedbyl2_outcall,preopti,postopti,
    optimisationpending,preoptipending,preoptiprogress,preopticompleted,task_status,corporate,postpaid,prepaid,escalation,vip,
    employees,ebu,service_plus,repeated,social_media,outbound,my_idea,others,tat_vip,tat_employees,tat_ebu,tat_service_plus,
    tat_social_media,tat_my_idea,tat_outbound,tat_repeated,tat_others,tat_customer_categories,all_network,two_g,three_g,four_g,
    two_g_three_g,three_g_four_g,four_g_two_g,withdrawn_yes,withdrawn_no,fieldvisit_yes,fieldvisit_no,analyse_yes,analyse_no,		
    fwdtofe_yes,fwdtofe_no,	coverage_related,voice_related,data_related,subscription_types,zones,customer_categories,cust_categories,
    categories,p1_categories,esc_categories,districts,priorities,network_types,prepaid_segment,complaint_types,complaint_postpaid_types,
    complaint_prepaid_types,task_status_filters,task_status_filters_dept,task_addedby_options,tat_excluded_hours,tat_start_time,
    tat_end_time,tat_expired_sql,tat_calc_sql,tat_stop_sql,district_options,visit_pending_option,analyze_pending_option,dept_pending_option,
    visit_progress_option,optimization_progress_option,visit_completed_option,analyze_completed_option,revertTeam_option,closedwithoutFV_option,
    directL2Close_option,resolvedClosed_option,notResolvedClosed_option,
    };