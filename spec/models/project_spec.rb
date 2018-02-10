require 'rails_helper'

RSpec.describe Project, type: :model do

    it { should have_many(:tasks).dependent(:destroy) }
    it { should belong_to(:user) }

    it { should validate_presence_of(:name) }
end
