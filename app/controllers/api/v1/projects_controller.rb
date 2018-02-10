module Api::V1
  class ProjectsController < ApplicationController
    def index
      @user = User.find(params[:user_id])
      @projects = @user.projects.order("created_at DESC")

      render json: @projects, status: :ok
    end

    def create
      @user = User.find(params[:user_id])
      @project = @user.projects.create(project_params)

      render json: @project, status: :created
    end

    def update
      @user = User.find(params[:user_id])
      @project = @user.projects.find(params[:id])
      @project.update_attributes(project_params)

      render json: @project
    end

    def destroy
      @user = User.find(params[:user_id])
      @project = @user.projects.find(params[:id])
      if @project.destroy
        head(:ok)
      else
        head(:unprocessable_entity)
      end
    end

    private
      def project_params
        params.require(:project).permit(:name)
      end
  end
end
