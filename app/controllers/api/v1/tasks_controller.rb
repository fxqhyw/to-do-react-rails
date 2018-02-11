module Api::V1
  class TasksController < ApplicationController
    before_action :set_user
    before_action :set_task, only: [:update, :destroy]


    def index
      @tasks = @user.tasks.order("created_at DESC")
      json_response(@tasks)
    end

    def create
      @task = @user.tasks.create!(task_params)
      json_response(@task, :created)
    end

    def update
      @task.update_attributes(task_params)
      head :no_content
    end

    def destroy
      @task.destroy
      head :no_content
    end

    private
      def task_params
        params.require(:task).permit(:name, :done, :project_id)
      end

      def set_user
        @user = User.find(params[:user_id])
      end

      def set_task
        @task = @user.tasks.find(params[:id])
      end
  end
end
