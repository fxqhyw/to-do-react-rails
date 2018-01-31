module Api::V1
  class ProjectsController < ApplicationController
    def index
      @projects = Project.all
      render json: @projects
    end

    def update
      @project = Project.find(params[:id])
      @project.update_attributes(project_params)
      render json: @idea
    end

    def destroy
      @project = Project.find(params[:id])
      @project.destroy
    end

    def create
      @project = Project.create(project_params)
      render json: @project
    end


    private
      def project_params
        params.require(:project).permit(:name)
      end

  end
end
