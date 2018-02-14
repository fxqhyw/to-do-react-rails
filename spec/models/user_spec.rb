require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:projects) }
  it { should have_many(:tasks) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_length_of(:password_digest).is_at_least(6) }
  it { is_expected.to validate_uniqueness_of :email }
end
