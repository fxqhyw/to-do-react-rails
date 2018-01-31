module Api::V1
  class TasksController < ApplicationController
    def create
      @task = Task.create(task_params)
      render json: @task
    end

    def index
      @tasks = Task.order("created_at DESC")
      render json: @tasks
    end

    def update
      @task = Task.find(params[:id])
      @task.update_attributes(task_params)
      render json: @idea
    end

    def destroy
      @task = Task.find(params[:id])
      @task.destroy
    end

    private
    def task_params
      params.require(:task).permit(:id, :name, :done, :deadline, :project_id)
    end
  end
end
