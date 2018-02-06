module Api::V1
  class ProjectsController < ApplicationController
    def index
      @projects = Project.all

      render json: @projects, status: :ok
    end

    def create
      @project = Project.create(project_params)

      render json: @project, status: :created
    end

    def update
      @project = Project.find(params[:id])
      @project.update_attributes(project_params)

      render json: @project
    end

    def destroy
      @project = Project.find(params[:id])
      if @project.destroy
        head(:ok)
      else
        head(:unprocessable_entity)
      end
    end

    private
      def project_params
        params.require(:project).permit(:name, :user_id)
      end
  end
end
