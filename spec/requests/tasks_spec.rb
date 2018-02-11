require 'rails_helper'

RSpec.describe 'Tasks API', type: :request do
  let(:user) { create(:user) }
  let(:project) { create(:project, user_id: user.id) }
  let!(:tasks) { create_list(:task, 20, project_id: project.id, user_id: user.id) }
  let(:user_id) { user.id }
  let(:project_id) { project.id }
  let(:id) { tasks.first.id }

  describe 'GET /api/v1/users/:user_id/tasks' do
    before { get "/api/v1/users/#{user_id}/tasks" }

    context 'when user exist' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all user tasks' do
        expect(json.size).to eq(20)
      end
    end

    context 'when user does not exist' do
      let(:user_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find User/)
      end
    end
  end

  describe 'POST /api/v1/users/:user_id/tasks/' do
    context 'when request attributes are valid' do
      let(:task) { { task: {name: 'Valid attributes', done: false, project_id: project_id} } }

      before { post "/api/v1/users/#{user_id}/tasks", params: task }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      let(:task) { { task: {name: '', project_id: project_id} } }
      before { post "/api/v1/users/#{user_id}/tasks", params: task }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/users/:user_id/tasks/:id' do
    let(:task) { { task: {name: 'Valid attributes', done: false, project_id: project_id} } }

    before { put "/api/v1/users/#{user_id}/tasks/#{id}", params: task }

    context 'when task exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the task' do
        updated_project = Task.find(id)
        expect(updated_project.name).to match(/Valid attributes/)
      end
    end

    context 'when the task does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Task/)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id/tasks/:id' do
    before { delete "/api/v1/users/#{user_id}/tasks/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
