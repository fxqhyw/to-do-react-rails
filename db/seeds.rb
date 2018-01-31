# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
projects = Project.create([{name: 'Projject'}, {name: 'Projject2'}, {name: 'Projject3'}, {name: 'Projject4'}])
tasks = Task.create([{name: '11111', done: false, project_id: 1}, {name: '2222', done: false, project_id: 1}, {name: '33333', done: false, project_id: 1},
  {name: 'Loker!', done: false, project_id: 2}, {name: 'Lokerr!', done: false, project_id: 2}, {name: 'Lokertq!', done: false, project_id: 2}])
