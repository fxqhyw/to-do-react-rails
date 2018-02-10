module Api::V1
  class TasksController < ApplicationController

    def index
      @user = User.find(params[:user_id])
      @tasks = @user.tasks.order("created_at DESC")

      render json: @tasks, status: :ok
    end

    def create
      @user = User.find(params[:user_id])
      @task = @user.tasks.create(task_params)

      render json: @task, status: :created
    end

    def update
      @user = User.find(params[:user_id])
      @task = @user.tasks.find(params[:id])
      @task.update_attributes(task_params)

      render json: @task
    end

    def destroy
      @user = User.find(params[:user_id])
      @task = @user.tasks.find(params[:id])
      if @task.destroy
        head(:ok)
      else
        head(:unprocessable_entity)
      end
    end

    private
      def task_params
        params.require(:task).permit(:name, :done, :deadline, :project_id)
      end
  end
end
