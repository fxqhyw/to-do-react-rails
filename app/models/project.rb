class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  belongs_to :user

  validates_presence_of :name
end
