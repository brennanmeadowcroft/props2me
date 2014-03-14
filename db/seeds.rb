# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(email:'brennan.meadowcroft@datalogix.com', first_name:'Brennan', last_name:'Meadowcroft', position:'Analyst', active: 1)
User.create(email:'phanny.chan@datalogix.com', first_name:'Phanny', last_name:'Chan', position:'Director', active:1)
User.create(email:'hayley.davis@datalogix.com', first_name:'Hayley', last_name:'Davis', position:'Assoc Analyst', active:1)

Goal.create(user_id:1, name:'Be Awesome', description:'I want to be more awesome')
Goal.create(user_id:2, name:'Help my team', description:'I want to make my team more effective')
Goal.create(user_id:3, name:'Learn stuff', description:'I want to know ALL THE THINGS!')

Prop.create(goal_id:1)
Prop.create(goal_id:2, comments:'Good Job!')
Prop.create(goal_id:3)
Prop.create(goal_id:2, comments:'Yes!')
Prop.create(goal_id:3, comments:'You know things.  It is good.')

PropsUser.create(user_id:1, prop_id:1, anonymous_flag:1, recipient_flag:1)
PropsUser.create(user_id:nil, prop_id:1, anonymous_flag:1, recipient_flag:0)
PropsUser.create(user_id:2, prop_id:2, anonymous_flag:0, recipient_flag:1)
PropsUser.create(user_id:1, prop_id:2, anonymous_flag:0, recipient_flag:0)
PropsUser.create(user_id:3, prop_id:3, anonymous_flag:1, recipient_flag:1)
PropsUser.create(user_id:1, prop_id:3, anonymous_flag:1, recipient_flag:0)
PropsUser.create(user_id:2, prop_id:4, anonymous_flag:0, recipient_flag:1)
PropsUser.create(user_id:3, prop_id:4, anonymous_flag:0, recipient_flag:0)
PropsUser.create(user_id:3, prop_id:5, anonymous_flag:0, recipient_flag:1)
PropsUser.create(user_id:1, prop_id:6, anonymous_flag:0, recipient_flag:0)
