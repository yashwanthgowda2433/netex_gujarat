db.tasks.find(
	{
		$and: [
			{
				task_zone_id : '0' 
			},
			{
				task_addedby: { $in: db.users.find({$or:[{user_role:8},{user_role:4},{user_role:9},{user_role:7}]}, {_id:1}) }  
			},
			{
				task_status: { $nin: [
				 8, 9 
				] }  
			},
			{
				task_deleted : 0 
			}
		]
	}
).sort(
	{
		"task_id" : -1
	}
);