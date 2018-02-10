module Api::V1
  class ProjectsController < ApplicationController
    before_action :set_user
    before_action :set_project, only: [:update, :destroy]

    def index
      @projects = @user.projects.order("created_at DESC")
      json_response(@projects)
    end

    def create
      @project = @user.projects.create!(project_params)
      json_response(@project, :created)
    end

    def update
      @project.update_attributes(project_params)
      head :no_content
    end

    def destroy
      @project.destroy
      head :no_content
    end

    private
      def project_params
        params.require(:project).permit(:name)
      end

      def set_user
        @user = User.find(params[:user_id])
      end

      def set_project
        @project = @user.projects.find(params[:id])
      end
  end
end
