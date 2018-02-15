import React, { Component } from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import Task from './Task/Task';
import './Tasks.css';

class Tasks extends Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.onSortEnd({oldIndex, newIndex}); 
    }

    render () {
        const SortableList = SortableContainer(({tasks}) => {       
            return (              
                <ul className="tasks">                    
                    {tasks.map((task, i) => {
                            if (task.project_id === this.props.projectId) {
                                return (
                                    <SortableItem key={`item-${i}`} task={task} index={i} />
                                );
                            }
                            return null;
                        })
                    }
                </ul>
            );
        });

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
            <SortableList tasks={this.props.tasks} useDragHandle={true} onSortEnd={this.onSortEnd} />
        );
    }
}

export default Tasks;
