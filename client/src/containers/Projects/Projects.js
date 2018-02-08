import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper';
import jwtDecode from 'jwt-decode';

import Project from '../../components/Project/Project';
import ProjectForm from '../../components/ProjectForm/ProjectForm';


class Projects extends Component {

    constructor () {
        super ();
        this.state = {
            term: '',
            user_id: '',
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
        this.setState({user_id: result.id})
        axios.get('http://localhost:3001/api/v1/projects')
            .then(response => {
                this.setState({projects: response.data})
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:3001/api/v1/tasks')
            .then(response => {
                this.setState({tasks: response.data})
            })
            .catch(error => console.log(error));
    }

    handleChange = (event) => {
        this.setState({term: event.target.value});
    }

    addProjectHandler = (event) => {
        event.preventDefault();
            axios.post(
            'http://localhost:3001/api/v1/projects',
                { project:
                    {
                        name: this.state.term,
                        user_id: this.state.user_id
                    }
                }
            )
            .then(response => {
            console.log(response);
            const projects = update(this.state.projects, {
                $splice: [[0, 0, response.data]]
            });
                this.setState({projects: projects,
                    term: ''});
            })
            .catch(error => console.log(error));
    }

    addTaskHandler = (task) => {        
        axios.post(
        'http://localhost:3001/api/v1/tasks',
            { 
                task
            }
        )
        .then(response => {
        console.log(response);
        const tasks = update(this.state.tasks, {
            $splice: [[0, 0, response.data]]
        });
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
        axios.put(`http://localhost:3001/api/v1/projects/${project.id}`,
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
        axios.put(`http://localhost:3001/api/v1/tasks/${task.id}`,
        {
            task: task
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
        axios.delete(`http://localhost:3001/api/v1/projects/${id}`)
        .then(response => {
            const projectIndex = this.state.projects.findIndex(x => x.id === id);
            const projects = update(this.state.projects, {$splice: [[projectIndex, 1]]});
            this.setState({projects: projects})
        })
        .catch(error => console.log(error))
    }

    deleteTaskHandler = (id) => {
        axios.delete(`http://localhost:3001/api/v1/tasks/${id}`)
        .then(response => {
            const tasksIndex = this.state.tasks.findIndex(x => x.id === id);
            const tasks = update(this.state.tasks, {$splice: [[tasksIndex, 1]]});
            this.setState({tasks: tasks})
        })
        .catch(error => console.log(error))
    }

    render() {        
        return (
            <div>
                {this.state.user_id ?<ProjectForm 
                                        onSubmit={this.addProjectHandler}
                                        onChange={this.handleChange}
                                        value={this.state.term}/> : null}
                {this.state.projects.map((project, i) => {
                    if(this.state.user_id === project.user_id)
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
                            editingTaskId={this.state.editingTaskId} />
                        );
                    return null;
                })}
            </div>
                       
        );
    }
}

export default Projects;