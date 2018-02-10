require 'rails_helper'

RSpec.describe 'Projects API', type: :request do
  let(:user) { create(:user) }
  let!(:projects) { create_list(:project, 10, user_id: user.id) }
  let(:user_id) { user.id }
  let(:id) { projects.first.id }

  describe 'GET /api/v1/users/:user_id/projects' do
    before { get "/api/v1/users/#{user_id}/projects" }

    context 'when user exist' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all user projects' do
        expect(json.size).to eq(10)
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

  describe 'POST /api/v1/users/:user_id/projects/' do
    context 'when request attributes are valid' do
      let(:project) { { project: {name: 'Valid attributes'} } }

      before { post "/api/v1/users/#{user_id}/projects", params: project }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      let(:project) { { project: {name: ''} } }
      before { post "/api/v1/users/#{user_id}/projects", params: project }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Name can't be blank/)
      end
    end
  end

  describe 'PUT /api/v1/users/:user_id/projects/:id' do
    let(:project) { { project: {name: 'Valid attributes'} } }

    before { put "/api/v1/users/#{user_id}/projects/#{id}", params: project }

    context 'when project exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the project' do
        updated_project = Project.find(id)
        expect(updated_project.name).to match(/Valid attributes/)
      end
    end

    context 'when the project does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Project/)
      end
    end
  end

  describe 'DELETE /api/v1/users/:user_id/projects/:id' do
    before { delete "/api/v1/users/#{user_id}/projects/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
