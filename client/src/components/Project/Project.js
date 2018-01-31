import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import Tasks from './Tasks/Tasks';
import TaskForm from './TaskForm/TaskForm';
import EditProjectForm from './EditProjectForm/EditProjectForm';
import './Project.css';



class Project extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
    
    this.handleChange = this.handleChange.bind(this);
    this.submitTaskHandler = this.submitTaskHandler.bind(this);
}


    handleChange = (event) => {
        this.setState({term: event.target.value});
    }

    submitTaskHandler = (event) => {
        const task = {
            name: this.state.term,
            done: false,
            deadline: null,
            project_id: this.props.projectId
        };
        this.props.submitTask(task);
        this.setState({term: ''});
        event.preventDefault();
    }

    deleteProject = () => {
       this.props.deleteProject(this.props.projectId);
    }

    showEditProjectForm = () => {
        this.props.showEditProjectForm(this.props.projectId);
    } 

    editProject = (event) => {
        const project = {
            id: this.props.projectId,
            name: event.target.value
        };
        this.props.editProject(project);
        event.preventDefault();
    }


    render () {

        const SortableList = SortableContainer(({tasks}) => {          
        
            return (            
                <Tasks 
                projectId={this.props.projectId} 
                tasks={this.props.tasks}
                deleteTask={this.props.deleteTask}
                editTask={this.props.editTask}
                showEditTaskForm={this.props.showEditTaskForm}
                editingTaskId={this.props.editingTaskId}/> 
            );
        });
    
        return (
            <div className="Project">                
                {this.props.editingProjectId === this.props.projectId ? 
                    <EditProjectForm editProject={this.editProject}/> 
                    : this.props.name}
                <button onClick={this.deleteProject}>DELETE</button>
                <button onClick={this.showEditProjectForm}>EDIT</button>
                <TaskForm 
                    onSubmit={this.submitTaskHandler}
                    onChange={this.handleChange}
                    value={this.state.term}/>
                <SortableList tasks={this.props.tasks} useDragHandle={true}/>                    
            </div>
        );
    }
}

export default Project;