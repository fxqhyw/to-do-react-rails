require 'rails_helper'

RSpec.describe Api::V1::TokensController, type: :routing do
  describe 'authentication routing' do
    it 'routes to /api/v1/tokens to tokens#create' do
      expect(:post => 'api/v1/tokens').to route_to('api/v1/tokens#create')
    end
  end
end
