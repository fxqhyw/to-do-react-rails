import React, { Component } from 'react';
import { SortableElement } from 'react-sortable-hoc';

import Task from './Task/Task';
import './Tasks.css';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            term: '',
        };
    }

    render () {
        const SortableItem = SortableElement(({task}) => {
            return (
                <Task 
                    task={task}
                    deleteTask={this.props.deleteTask}
                    editTask={this.props.editTask}
                    showEditForm={this.props.showEditTaskForm}
                    editingTaskId={this.props.editingTaskId}/>
            );
        });

        return (
            <ul >
                {this.props.tasks.map((task, i) => {
                    if (task.project_id === this.props.projectId) {
                        return (
                            <SortableItem key={`item-${i}`} task={task} index={i} />
                        );
                    }
                    return null;
                })}
            </ul>
        );
    }
}

export default Tasks;
