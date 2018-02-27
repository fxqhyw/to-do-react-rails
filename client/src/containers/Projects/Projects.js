import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import jwtDecode from 'jwt-decode';

import Project from '../../components/Project/Project';
import ProjectForm from '../../components/ProjectForm/ProjectForm';
import { arrayMove } from 'react-sortable-hoc';



class Projects extends Component {

    constructor () {
        super ();
        this.state = {
            term: '',
            user_id: '',
            showAddForm: false,
            editingProjectId: null,
            editingTaskId: null,
            projects: [],
            tasks: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addProjectHandler = this.addProjectHandler.bind(this);
    }

    componentDidMount = () => {
        let jwt = window.localStorage.getItem('jwt');
        let result = jwtDecode(jwt);
        const user_id = result.id;
        this.setState({user_id: result.id});
        axios.get(`http://localhost:3001/api/v1/users/${user_id}/projects`)
            .then(response => {
                this.setState({projects: response.data})
            })
            .catch(error => console.log(error));

        axios.get(`http://localhost:3001/api/v1/users/${user_id}/tasks`)
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error));
    }

    handleChange = (event) => {
        this.setState({term: event.target.value});
    }

    showAddForm = () => {
        this.setState({showAddForm: true});
    }

    addProjectHandler = (event) => {
        event.preventDefault();
        const user_id = this.state.user_id;
            axios.post(
            `http://localhost:3001/api/v1/users/${user_id}/projects`,
                { project:
                    {
                        name: this.state.term,
                    }
                }
            )
            .then(response => {
            console.log(response);
            const projects = update(this.state.projects, {
                $splice: [[0, 0, response.data]]
            });
                this.setState({projects: projects,
                    term: '',
                    showAddForm: false});
            })
            .catch(error => console.log(error));
    }

    addTaskHandler = (task) => {
        const user_id = this.state.user_id;        
        axios.post(
        `http://localhost:3001/api/v1/users/${user_id}/tasks`,
            { 
                task
            }
        )
        .then(response => {
        console.log(response);
        // const tasks = update(this.state.tasks, {
        //     $splice: [[0, 0, response.data]]
        // });
        const tasks = this.state.tasks;
        tasks.push(response.data);
        this.setState({tasks: tasks});
        })
        .catch(error => console.log(error));
    }

    showEditProjectFormHandler = (id) => {
        this.setState({editingProjectId: id});
    }

    showEditTaskFormHandler = (id) => {
        this.setState({editingTaskId: id});
    }

    editProjectHandler = (project) => {
        const user_id = this.state.user_id; 
        axios.put(`http://localhost:3001/api/v1/users/${user_id}/projects/${project.id}`,
        {
            project: project
        })
        .then(response => {
            console.log(response);
            const projectIndex = this.state.projects.findIndex(x => x.id === project.id);
            const projects = update(this.state.projects, {
                [projectIndex]: { $set: project } });
            this.setState({projects: projects, editingProjectId: null});

        })
        .catch(error => console.log(error))
    }

    editTaskHandler = (task) => {
        const user_id = this.state.user_id;
        axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${task.id}`,
        {
            task: {
                name: task.name,
                done: task.done,
                deadline: task.deadline,
            }
        })
        .then(response => {
            console.log(response);
            const taskIndex = this.state.tasks.findIndex(x => x.id === task.id);
            const tasks = update(this.state.tasks, {
                [taskIndex]: { $set: task } });
            this.setState({tasks: tasks, editingTaskId: null});
        })
        .catch(error => console.log(error))
    }
     
    deleteProjectHandler = (id) => {
        const user_id = this.state.user_id;
        axios.delete(`http://localhost:3001/api/v1/users/${user_id}/projects/${id}`)
        .then(response => {
            const projectIndex = this.state.projects.findIndex(x => x.id === id);
            const projects = update(this.state.projects, {$splice: [[projectIndex, 1]]});
            this.setState({projects: projects});
            axios.get(`http://localhost:3001/api/v1/users/${user_id}/tasks`)
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

    deleteTaskHandler = (id) => {
        const user_id = this.state.user_id;
        axios.delete(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id}`)
        .then(response => {
            const tasksIndex = this.state.tasks.findIndex(x => x.id === id);
            const tasks = update(this.state.tasks, {$splice: [[tasksIndex, 1]]});
            this.setState({tasks: tasks})
        })
        .catch(error => console.log(error))
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const user_id = this.state.user_id;

        const touchedTask = this.state.tasks[oldIndex];
        const replacableTask = this.state.tasks[newIndex];
        const id1 = touchedTask.id;
        const id2 = replacableTask.id;
        let futurePriority = newIndex+1;

        if (( newIndex === oldIndex+1 || newIndex+1 === oldIndex ) &&  (newIndex !== oldIndex))  {
            this.setState({
                tasks: arrayMove(this.state.tasks, oldIndex, newIndex)
            });
            axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id1}`,
                {
                    task: {
                        priority: futurePriority
                    }
            })
            .then(response => {
                axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id2}`,
                    {
                        task: {
                            priority: touchedTask.priority
                        }
                    })
            })
            .then(response => {

            })
            .catch(error => console.log(error)); 
        }
    //        else if (!(touchedTask.priority === replacableTask.priority) || newIndex > oldIndex) {
    //           axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id1}`,
    //               {
    //                   task: {
    //                       priority: futurePriority
    //                   }
    //           })
    //           .then(response => {
    //             axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id2}`,
    //                 {
    //                     task: {
    //                         priority: replacableTask.priority - 1
    //                     }
    //                 })
    //         })
    //           .then(response => {
    //               this.setState({
    //                   tasks: arrayMove(this.state.tasks, oldIndex, newIndex)
    //               });
    //           })
    //           .catch(error => console.log(error)); 

    //     } else if (!(touchedTask.priority === replacableTask.priority) || newIndex < oldIndex) {
    //         axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id1}`,
    //             {
    //                 task: {
    //                     priority: futurePriority
    //                 }
    //         })
    //         .then(response => {
    //           axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id2}`,
    //               {
    //                   task: {
    //                       priority: replacableTask.priority + 1
    //                   }
    //               })
    //       })
    //         .then(response => {
    //             this.setState({
    //                 tasks: arrayMove(this.state.tasks, oldIndex, newIndex)
    //             });
    //         })
    //         .catch(error => console.log(error)); 
    //   } else {
    //     this.setState({
    //         tasks: arrayMove(this.state.tasks, oldIndex, newIndex)
    //     });
    //     axios.put(`http://localhost:3001/api/v1/users/${user_id}/tasks/${id1}`,
    //         {
    //             task: {
    //                 priority: futurePriority
    //             }
    //     })
    //     .catch(error => console.log(error));
    //   }           
    }

    render() {        
        return (
        <section>
            <div className="base">
                <h2>SIMPLE TODO LISTS</h2>
                <h4>FOR RUBY GARAGE</h4>
                {this.state.projects.map((project, i) => {

                        return (
                            <Project 
                            key={i}
                            projectId={project.id}
                            name={project.name}
                            userId={this.state.user_id}
                            tasks={this.state.tasks}
                            deleteProject={this.deleteProjectHandler}
                            submitTask={this.addTaskHandler}
                            deleteTask={this.deleteTaskHandler}
                            showEditProjectForm={this.showEditProjectFormHandler}
                            showEditTaskForm={this.showEditTaskFormHandler}
                            editProject={this.editProjectHandler}
                            editTask={this.editTaskHandler}
                            editingProjectId={this.state.editingProjectId}
                            editingTaskId={this.state.editingTaskId} 
                            onSortEnd={this.onSortEnd}/>
                        );
                })}
            </div>
            {this.state.showAddForm
                ?
                    <ProjectForm 
                    onSubmit={this.addProjectHandler}
                    onChange={this.handleChange}
                    value={this.state.term}
                    /> 
                :
                    <button className="add-button" onClick={this.showAddForm}>
                        <i className="fas fa-plus"></i><span>Add TODO List</span>
                    </button>
            }
        </section>
                       
        );
    }
}

export default Projects;