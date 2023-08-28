// import task table variables
const { rth_yes, rth_no, assigned_yes, assigned_no, reassigned_yes, reassigned_no, pending, progress, completed,
    cancelled,closed,fwz,transfer,withdraw,addedbyl2_executive,fwz_to_zone,approve_for_fieldvisit,analysis_required,
    analysis_required_fwdbyl3,zone_analysed,zone_closed,l3_closed,optimisationprogress,analysed,optimised,closedbyl2_executive,
    resolved_and_closed,not_resolved_and_closed,closedbyl2_tl,fwd_to_l2,closedbyl2_outcall,addedbyl2_outcall,preopti,postopti,
    optimisationpending,preoptipending,preoptiprogress,preopticompleted,task_status,corporate,postpaid,prepaid,escalation,vip,
    employees,ebu,service_plus,repeated,social_media,outbound,my_idea,others,tat_vip,tat_employees,tat_ebu,tat_service_plus,
    tat_social_media,tat_my_idea,tat_outbound,tat_repeated,tat_others,tat_customer_categories,all_network,two_g,three_g,four_g,
    two_g_three_g,three_g_four_g,four_g_two_g,withdrawn_yes,withdrawn_no,fieldvisit_yes,fieldvisit_no,analyse_yes,analyse_no,		
    fwdtofe_yes,fwdtofe_no,	coverage_related,voice_related,data_related,subscription_types,customer_categories,cust_categories,
    categories,p1_categories,esc_categories,districts,priorities,network_types,prepaid_segment,complaint_types,complaint_postpaid_types,
    complaint_prepaid_types,task_status_filters,task_status_filters_dept,task_addedby_options,tat_excluded_hours,tat_start_time,
    tat_end_time,tat_expired_sql,tat_calc_sql,tat_stop_sql,district_options,visit_pending_option,analyze_pending_option,dept_pending_option,
    visit_progress_option,optimization_progress_option,visit_completed_option,analyze_completed_option,revertTeam_option,closedwithoutFV_option,
    directL2Close_option,resolvedClosed_option,notResolvedClosed_option,
    } = require('../../../global_variables/task_variables');

    // import user table variables
const { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
    admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
    roles, sla_fwz_depts, zones, is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} = require('../../../global_variables/user_variables');
  



const User = require('../../../models/userModel');
const Task = require('../../../models/taskModel');
const test = require('./test');

const addTask = async (user, task_data) => {

    // validation
    if (task_data.sr_no == "") {
        throw Error('All fields must be filled')
    }
    if (task_data.employee_id == "") {
        throw Error('Employee must be Select')
    }
    

    var data = {};
    // console.log("=====================")
    // console.log(task_data.crystal_date);
    // console.log(new Date(task_data.crystal_date));

    data.task_employee_id = task_data.employee_id ? task_data.employee_id : "";
    data.task_rf_employee_id = task_data.rf_employee_id ? task_data.rf_employee_id : "";
    data.task_post_rf_employee_id = task_data.post_rf_employee_id ? task_data.post_rf_employee_id : "";
    data.task_zone_employee_id = task_data.zone_employee_id ? task_data.zone_employee_id : "";
    data.task_fwd_dept_id = task_data.fwd_dept_id ? task_data.fwd_dept_id : "";
    data.task_crystal_date = task_data.crystal_date ? new Date(task_data.crystal_date) : "";
    data.task_issue_date = task_data.issue_date ? task_data.issue_date : "";
    data.task_crm_uploaddate = task_data.crm_uploaddate ? task_data.crm_uploaddate : "";
    data.task_crm_due_date = task_data.crm_due_date ? task_data.crm_due_date : "";
    data.task_sr_no = task_data.sr_no ? task_data.sr_no : "";
    data.task_issue_in = task_data.issue_in ? task_data.issue_in : "";
    data.task_issue_technology = task_data.issue_technology ? task_data.issue_technology : "";
    data.task_distance = task_data.distance ? task_data.distance : "";
    data.task_duration = task_data.duration ? task_data.duration : "";
    data.task_end_latitude = task_data.end_latitude ? task_data.end_latitude : "";
    data.task_end_longitude = task_data.end_longitude ? task_data.end_longitude : "";
    data.task_latitude = task_data.latitude ? task_data.latitude : "";
    data.task_rflongitude = task_data.rflongitude ? task_data.rflongitude : "";
    data.task_rflatitude = task_data.rflatitude ? task_data.rflatitude : "";
    data.task_longitude = task_data.longitude ? task_data.longitude : "";
    data.task_accuracy = task_data.accuracy ? task_data.accuracy : "";
    data.task_rfaccuracy = task_data.rfaccuracy ? task_data.rfaccuracy : "";
    data.task_cancel_longitude = task_data.cancel_longitude ? task_data.cancel_longitude : "";
    data.task_cancel_latitude = task_data.cancel_latitude ? task_data.cancel_latitude : "";
    data.task_location = task_data.location ? task_data.location : "";
    data.task_landmark = task_data.landmark ? task_data.landmark : "";
    data.task_pincode = task_data.pincode ? task_data.pincode : "";
    data.task_customer_name = task_data.customer_name ? task_data.customer_name : "";
    data.task_mobile_number = task_data.mobile_number ? task_data.mobile_number : "";
    data.task_alternate_mobile = task_data.alternate_mobile ? task_data.alternate_mobile : "";
    data.task_subscription_type = task_data.subscription_type ? task_data.subscription_type : "";
    data.task_network_type = task_data.network_type ? task_data.network_type : "";
    data.task_customer_category = task_data.customer_category ? task_data.customer_category : "";
    data.task_issue_category = task_data.issue_category ? task_data.issue_category : "";
    data.task_bulk_segment = task_data.bulk_segment ? task_data.bulk_segment : "";
    data.task_kpi_issue_identified = task_data.kpi_issue_identified ? task_data.kpi_issue_identified : "";
    data.task_customer_inputs = task_data.customer_inputs ? task_data.customer_inputs : "";
    data.task_out_called = task_data.out_called ? task_data.out_called : "";
    data.task_zone_id = task_data.zone_id ? task_data.zone_id : "";
    data.task_serving_site = task_data.serving_site ? task_data.serving_site : "";
    data.task_district = task_data.district ? task_data.district : "";
    data.task_cluster = task_data.cluster ? task_data.cluster : "";
    data.task_customer_distance = task_data.customer_distance ? task_data.customer_distance : "";
    data.task_area = task_data.area ? task_data.area : "";
    data.task_congestion = task_data.congestion ? task_data.congestion : "";
    data.task_taluk = task_data.taluk ? task_data.taluk : "";
    data.task_verified_address = task_data.verified_address ? task_data.verified_address : "";
    data.task_connected = task_data.connected ? task_data.connected : "";
    data.task_appartment = task_data.appartment ? task_data.appartment : "";
    data.task_floor = task_data.floor ? task_data.floor : "";
    data.task_customer_floor = task_data.customer_floor ? task_data.customer_floor : "";
    data.task_problem_since = task_data.problem_since ? task_data.problem_since : "";
    data.task_specific_timing = task_data.specific_timing ? task_data.specific_timing : "";
    data.task_handset_bars = task_data.handset_bars ? task_data.handset_bars : "";
    data.task_indoor_outdoor = task_data.indoor_outdoor ? task_data.indoor_outdoor : "";
    data.task_office_residence = task_data.office_residence ? task_data.office_residence : "";
    data.task_issue_type = task_data.issue_type ? task_data.issue_type : "";
    data.task_voice_type = task_data.voice_type ? task_data.voice_type : "";
    data.task_data_type = task_data.data_type ? task_data.data_type : "";
    data.task_balance = task_data.balance ? task_data.balance : "";
    data.task_validity = task_data.validity ? task_data.validity : "";
    data.task_data_plan = task_data.data_plan ? task_data.data_plan : "";
    data.task_data_usage = task_data.data_usage ? task_data.data_usage : "";
    data.task_outcall_time = task_data.outcall_time ? task_data.outcall_time : "";
    data.task_browsing_type = task_data.browsing_type ? task_data.browsing_type : "";
    data.task_resolution_code = task_data.resolution_code ? task_data.resolution_code : "";
    data.task_fl_congestion_kl_id = task_data.fl_congestion_kl_id ? task_data.fl_congestion_kl_id : "";
    data.task_company_name = task_data.company_name ? task_data.company_name : "";
    data.task_tat = task_data.tat ? task_data.tat : "";
    data.task_rftat = task_data.rftat ? task_data.rftat : "";
    data.task_datetime = task_data.datetime ? task_data.datetime : "";
    data.task_start_datetime = task_data.start_datetime ? task_data.start_datetime : "";
    data.task_end_datetime = task_data.end_datetime ? task_data.end_datetime : "";
    data.task_rf_end_datetime = task_data.rf_end_datetime ? task_data.rf_end_datetime : "";
    data.testing_end_datetime = task_data.testing_end_datetime ? task_data.testing_end_datetime : "";
    data.rf_testing_end_datetime = task_data.rf_testing_end_datetime ? task_data.rf_testing_end_datetime : "";
    data.task_rf_testing_end_datetime = task_data.rf_testing_end_datetime ? task_data.rf_testing_end_datetime : "";
    data.task_reached_location = task_data.reached_location ? task_data.reached_location : "";
    data.task_issue_details = task_data.issue_details ? task_data.issue_details : "";
    data.task_sr_sub_type = task_data.sr_sub_type ? task_data.sr_sub_type : "";
    data.task_media = task_data.media ? task_data.media : "";
    data.task_submedia = task_data.submedia ? task_data.submedia : "";
    data.task_reached_datetime = task_data.reached_datetime ? task_data.reached_datetime : "";
    data.task_rf_reached_datetime = task_data.rf_reached_datetime ? task_data.rf_reached_datetime : "";
    data.task_appointment_datetime = task_data.appointment_datetime ? task_data.appointment_datetime : "";
    data.task_addedby = user._id;
    data.task_addedby_l2 = task_data.addedby_l2 ? task_data.addedby_l2 : "";
    data.task_closedby_l2 = task_data.addedby_l2 ? task_data.addedby_l2 : "";
    data.task_subscriber_type = task_data.subscriber_type ? task_data.subscriber_type : "";
    data.task_complaint_category = task_data.complaint_category ? task_data.complaint_category : "";
    data.task_postpaid_sub_type = task_data.postpaid_sub_type ? task_data.postpaid_sub_type : "";
    data.task_remarks = task_data.remarks ? task_data.remarks : "";
    data.task_brand = task_data.brand ? task_data.brand : "";
    data.task_signal_bar = task_data.signal_bar ? task_data.signal_bar : "";
    data.task_l2_close_p1_p2 = task_data.l2_close_p1_p2 ? task_data.l2_close_p1_p2 : "";
    data.task_l2_close_root = task_data.l2_close_root ? task_data.l2_close_root : "";
    data.task_l2_close_service_affected = task_data.l2_close_service_affected ? task_data.l2_close_service_affected : "";
    data.task_l2_close_details = task_data.l2_close_details ? task_data.l2_close_details : "";
    data.task_prepaid_remark = task_data.prepaid_remark ? task_data.prepaid_remark : "";
    data.task_canceled_remarks = task_data.canceled_remarks ? task_data.canceled_remarks : "";
    data.task_final_remarks = task_data.final_remarks ? task_data.final_remarks : "";
    data.task_remarks_addedby = task_data.remarks_addedby ? task_data.remarks_addedby : "";
    data.task_attempt_count = task_data.attempt_count ? task_data.attempt_count : "";
    data.task_questionnaires = task_data.questionnaires ? task_data.questionnaires : "";
    data.task_rfquestionnaires = task_data.rfquestionnaires ? task_data.rfquestionnaires : "";
    data.task_postquestionnaires = task_data.postquestionnaires ? task_data.postquestionnaires : "";
    data.task_prequestionnaires = task_data.prequestionnaires ? task_data.prequestionnaires : "";
    data.task_cancelled_on = task_data.cancelled_on ? task_data.cancelled_on : "";
    data.task_visit_upload = task_data.visit_upload ? task_data.visit_upload : "";
    data.task_rfvisit_upload = task_data.rfvisit_upload ? task_data.rfvisit_upload : "";
    data.task_is_fieldvisit = task_data.is_fieldvisit ? task_data.is_fieldvisit : "";
    data.task_is_assigned = task_data.is_assigned ? task_data.is_assigned : "";
    data.task_is_rf_fieldvisit = task_data.is_rf_fieldvisit ? task_data.is_rf_fieldvisit : "";
    data.task_withdrawn = task_data.withdrawn ? task_data.withdrawn : "";
    data.task_withdrawn_on = task_data.withdrawn_on ? task_data.withdrawn_on : "";
    data.task_assigned_on = task_data.assigned_on ? task_data.assigned_on : "";
    data.task_fwdtoteam_on = task_data.fwdtoteam_on ? task_data.fwdtoteam_on : "";
    data.task_fwdtoteam_by = task_data.fwdtoteam_by ? task_data.fwdtoteam_by : "";
    data.task_fwdtozone_on = task_data.fwdtozone_on ? task_data.fwdtozone_on : "";
    data.task_fwdtozone_by = task_data.fwdtozone_by ? task_data.fwdtozone_by : "";
    data.task_fwdtofe_on = task_data.fwdtofe_on ? task_data.fwdtofe_on : "";
    data.task_forwardtoanalyst = task_data.forwardtoanalyst ? task_data.forwardtoanalyst : "";
    data.task_fwdtoanalyst_by = task_data.fwdtoanalyst_by ? task_data.fwdtoanalyst_by : "";
    data.task_fwdtoanalyst_on = task_data.fwdtoanalyst_on ? task_data.fwdtoanalyst_on : "";
    data.task_closed_on = task_data.closed_on ? task_data.closed_on : "";
    data.task_fwdtofe = task_data.fwdtofe ? task_data.fwdtofe : "";
    data.task_fwdtol2_on = task_data.fwdtol2_on ? task_data.fwdtol2_on : "";
    data.task_outcallclosed_on = task_data.outcallclosed_on ? task_data.outcallclosed_on : "";
    data.created_by_group = task_data.created_by_group ? task_data.created_by_group : "";
    data.task_rth_flag = task_data.rth_flag ? task_data.rth_flag : "";
    data.task_is_reassign = task_data.is_reassign ? task_data.is_reassign : "";
    data.task_is_postopti = task_data.is_postopti ? task_data.is_postopti : "";
    data.task_is_closed_fv = task_data.is_closed_fv ? task_data.is_closed_fv : "";
    data.task_post_datetime = task_data.post_datetime ? task_data.post_datetime : "";
    data.task_post_assignedon = task_data.post_assignedon ? task_data.post_assignedon : "";
    data.task_saved_attended_on = task_data.saved_attended_on ? task_data.saved_attended_on : "";
    data.task_is_save_submit = task_data.is_save_submit ? task_data.is_save_submit : "";
    data.task_status = task_data.status ? task_data.status : pending;
    data.task_deleted = task_data.deleted ? task_data.deleted : deleted_no;
    data.task_modifiedon = new Date();
    var task_submit = "";
    const exists = await Task.findOne({$and: [{ task_sr_no: task_data.sr_no },{ task_deleted: deleted_no}]})
    if (exists) {

        var where = { task_sr_no: task_data.sr_no };
        var new_values = { $set : data }

        const task_submit = await Task.updateOne(where, new_values)
        
        if(task_submit){
            const add_test_report = test.addTest(user, task_data, exists._id);
            if(add_test_report)
            {
                return true;

            }else{
                return false;
            }
            
        }else{
            return false;
        }
    }else{
        const task_submit = await Task.create(data)

        if(task_submit){
            const add_test_report = test.addTest(user, task_data, task_submit._id);
            if(add_test_report)
            {
                return true;
            }else{
                return false;
            }
            
        }else{
            return false;
        }
    }
    

}

const getTasks = async (user, filter_data) => {
    // console.log(user);
    const total_size = (await Task.aggregate([
        {$addFields:{emp_id:{$toObjectId:"$task_employee_id"}}},
        {
            $lookup: {
               from: "users", // collection name in db
               localField: "emp_id",
               foreignField: "_id",
               as: "user_arr"
            }
        },
    ])).length;

    var And_Where_Tasks = [];

    // user added by
    const user_data = await User.find({$or:[{user_role:l3tl}, {user_role:field_engineer}, {user_role:l2tl}, {user_role:executive}, {user_role:outcall}]}, {_id:1});
    var user_addedby_arr = user_data.map((val,index)=> val._id.toString());

    // user added by L3
    const user_l3_data = await User.find({$or:[{user_role:l3tl}]}, {_id:1})
    var user_l3_data_arr = user_l3_data.map((val,index)=> val._id.toString());


    And_Where_Tasks.push({ $in: ["$task_addedby", user_addedby_arr] });
    And_Where_Tasks.push({ $eq: ["$task_deleted", deleted_no] });
    And_Where_Tasks.push({ $not: { $in : ["$task_status", [addedbyl2_executive, approve_for_fieldvisit]] }});
    And_Where_Tasks.push({ $or: [ {$eq : ["$task_is_fieldvisit", fieldvisit_yes] }, {$eq : ["$task_fwdtofe", fwdtofe_yes] }]});



    // status
    var status = "";
    var params_status = filter_data.status;
    if(params_status != "")
    {
        if(params_status == "pending")
        {
            And_Where_Tasks.push({ $eq: ["$task_withdrawn", withdrawn_no] });
            And_Where_Tasks.push({ $eq: ["$task_status", pending] });
            And_Where_Tasks.push({ $eq: ["$task_is_rf_fieldvisit", fieldvisit_no] });
        }
        if(params_status == "progress")
        {
            And_Where_Tasks.push({ $eq: ["$task_status", progress] });
            And_Where_Tasks.push({ $eq: ["$task_is_rf_fieldvisit", fieldvisit_no] });
        }
        else if(params_status == "completed")
        {
            And_Where_Tasks.push({ $eq: ["$task_status", completed] });
            And_Where_Tasks.push({ $eq: ["$task_is_rf_fieldvisit", fieldvisit_no] });

        }
        else if(params_status == "closed")
        {
            And_Where_Tasks.push({ $in: ["$task_status", [closed, closedbyl2_executive, l3_closed, resolved_and_closed, analysed, not_resolved_and_closed]] });
        }
        else if(params_status == "analysed")
        {
            And_Where_Tasks.push({ $eq: ["$task_status", analysed] });
        }
        else if(params_status == "cancelled")
        {
            And_Where_Tasks.push({ $eq: ["$task_status", cancelled] });
        }
        else if(params_status == "fwd")
        {
            And_Where_Tasks.push({ $in: ["$task_fwdtoanalyst_by", user_l3_data_arr] });
            And_Where_Tasks.push({ $or: [ {$eq : ["$task_status", analysis_required_fwdbyl3] }, {$eq : ["$task_status", pending] }, {$eq : ["$task_status", progress] }, {$eq : ["$task_status", completed] }, {$eq : ["$task_status", postopti] }, {$eq : ["$task_status", preopti] }]});
        }
        else if(params_status == "withdrawn")
        {
            And_Where_Tasks.push({ $eq: ["$task_status", withdrawn_yes] });
        }
        
        // And_Where_Tasks.push({ $eq: ["$task_status", status] });
    }

    // from date and to date
    var from_date = filter_data.from_date;
    if(from_date != "")
    {
        And_Where_Tasks.push({ $gte: ["$task_createdon", new Date(from_date)] });
    }
    var to_date = filter_data.to_date;
    if(to_date != "")
    {
        And_Where_Tasks.push({ $lte: ["$task_createdon", new Date(to_date)] });
    }

    var Or_Where_Tasks = [];
    var search_param = filter_data.search;
    if(search_param != "")
    {
        Or_Where_Tasks.push({ "task_sr_no" : { $regex : search_param }});
        Or_Where_Tasks.push({ "task_customer_name" : { $regex : search_param }});
        Or_Where_Tasks.push({ "task_mobile_number" : { $regex : search_param }});
    }
    
    var query = {};
    query.$expr = { 
            $and : And_Where_Tasks,
        };

    
    if(Or_Where_Tasks.length>0)
    {
        query.$or = Or_Where_Tasks;
    }

    
    
    const task_data = await Task.aggregate([
        { $match : query,
        },
        {$addFields:{emp_id:{$toObjectId:"$task_employee_id"}}},
        {
            $lookup: {
               from: "users", // collection name in db
               localField: "emp_id",
               foreignField: "_id",
               as: "user_arr"
            }
        },
        {$skip:filter_data.pageStart},
        {$limit:filter_data.pageLimit},
        {
            $sort:{ "task_id" : -1 }
        }
    ])

    // const total_size = (await Task.find()).length;
    // const task_data = await Task.find().skip(filter_data.pageStart).limit(filter_data.pageLimit);
    var gettask = { total_size, task_data };
    return gettask;
    
}


const getExecutiveTasks = async (user, filter_data) => {
    // console.log(user);
    const total_size = (await Task.aggregate([
        {$addFields:{emp_id:{$toObjectId:"$task_employee_id"}}},
        {
            $lookup: {
               from: "users", // collection name in db
               localField: "emp_id",
               foreignField: "_id",
               as: "user_arr"
            }
        },
    ])).length;

    var And_Where_Tasks = [];

    // user added by
    And_Where_Tasks.push({ $eq: ["$task_addedby", user._id.toString()] });
    And_Where_Tasks.push({ $eq: ["$task_status", approve_for_fieldvisit] });


    // status
    var status = "";
    var params_status = filter_data.status;
    if(params_status != "")
    {
        if(params_status == "prepending")
        {
            status = "prepending";
        }
        if(params_status == "postpending")
        {
            status = "postpending";
        }
        else if(params_status == "withdrawn")
        {
            status = withdrawn_yes;
        }
        else if(params_status == "progress")
        {
            status = progress;
        }
        else if(params_status == "completed")
        {
            status = completed;
        }
        else if(params_status == "cancelled")
        {
            status = cancelled;
        }
        else if(params_status == "closed")
        {
            status = closed;
        }
        else if(params_status == "analysed")
        {
            status = analysed;
        }
        else if(params_status == "fwd")
        {
            status = fwz;
        }
        else if(params_status == "preopti")
        {
            status = preopti;
        }
        else if(params_status == "postopti")
        {
            status = postopti;
        }
        And_Where_Tasks.push({ $eq: ["$task_status", status] });
    }
   
    // from date and to date
    var from_date = filter_data.from_date;
    if(from_date != "")
    {
        And_Where_Tasks.push({ $gte: ["$task_createdon", new Date(from_date)] });
    }
    var to_date = filter_data.to_date;
    if(to_date != "")
    {
        And_Where_Tasks.push({ $lte: ["$task_createdon", new Date(to_date)] });
    }

    var Or_Where_Tasks = [];
    var search_param = filter_data.search;
    if(search_param != "")
    {
        Or_Where_Tasks.push({ "task_sr_no" : { $regex : search_param }});
        Or_Where_Tasks.push({ "task_customer_name" : { $regex : search_param }});
        Or_Where_Tasks.push({ "task_mobile_number" : { $regex : search_param }});
    }

    var query = {};
    query.$expr = { 
            $and : And_Where_Tasks,
        };

    
    if(Or_Where_Tasks.length>0)
    {
        query.$or = Or_Where_Tasks;
    }

    
    
    const task_data = await Task.aggregate([
        { $match : query,
        },
        {$addFields:{emp_id:{$toObjectId:"$task_employee_id"}}},
        {
            $lookup: {
               from: "users", // collection name in db
               localField: "emp_id",
               foreignField: "_id",
               as: "user_arr"
            }
        },
        {$skip:filter_data.pageStart},
        {$limit:filter_data.pageLimit}
    ])

    // const total_size = (await Task.find()).length;
    // const task_data = await Task.find().skip(filter_data.pageStart).limit(filter_data.pageLimit);
    var gettask = { total_size, task_data };
    return gettask;
    
}

module.exports = { addTask, getTasks, getExecutiveTasks }
