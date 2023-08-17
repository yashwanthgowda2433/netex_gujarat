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
  

const Task = require('../data_model/task')

// add a task
const addAnalystTask = async (req, res) => {
    const user = req.user
    const task_data = req.body

    if(user)
    {
        if(user.user_role == analyst)
        {
            try {
                const task = await Task.addTask(user, task_data);
            
                if(task){
                    res.status(200).json({status:"Success", message: "Successfully created!"})
                }else{
                  res.status(200).json({status:"Error", message: "Failed to create, try again later!"})
            
                }
            } catch (error) {
                console.log(error)
                res.status(200).json({status:"Error", message: error.message})
            }
        }else{
            res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
        }
        
    }else{
        res.status(200).json({status:"Error", message: "Authorization failed!"})
    }
  
    
}


// getAnalystTasks
const getAnalystTasks = async (req, res) => {
    const user = req.user;
    const filter_data = req.body;
    
    if(user)
    {
        if(user.user_role == analyst)
        {
            const task_data = await Task.getTasks(user, filter_data);
            res.status(200).json({status:"Success", data:task_data});

        }else{
            res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
        }
    }else{
        res.status(200).json({status:"Error", message: "Authorization failed!"})
    }
}

// getAnalystL3tlTasks
const getAnalystL3tlTasks = async (req, res) => {
    const user = req.user;
    const filter_data = req.body;
    
    if(user)
    {
        if(user.user_role == analyst)
        {
            const task_data = await Task.getL3Tasks(user, filter_data);
            res.status(200).json({status:"Success", data:task_data});

        }else{
            res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
        }
    }else{
        res.status(200).json({status:"Error", message: "Authorization failed!"})
    }
}

module.exports = { addAnalystTask, getAnalystTasks, getAnalystL3tlTasks }

