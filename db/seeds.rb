# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(email:'anonymous_user@datalogix.com', first_name:'Anonymous', last_name:'Anonymous', position:'Placeholder', active: 0, admin: 0, password:'n00n3n03s', password_confirmation:'n00n3n03s')
User.create(email:'brennan.meadowcroft@datalogix.com', first_name:'Brennan', last_name:'Meadowcroft', position:'Analyst', active: 1, admin: 1, password:'supergeo', password_confirmation:'supergeo')
User.create(email:'phanny.chan@datalogix.com', first_name:'Phanny', last_name:'Chan', position:'Director', active:1, password:'flexteam', password_confirmation:'flexteam')
