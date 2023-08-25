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



tasks.aggregate([ { '$match': { '$expr': { '$and': [ { '$in': [ '$task_addedby', [ '64c8a44fce97bad97a87a584', '64e5c5024fec7bb4193046bd' ] ] }, { '$eq': [ '$task_deleted', 0 ] }, { '$not': { '$in': [ '$task_status', [ 8, 9 ] ] } }]}}}])