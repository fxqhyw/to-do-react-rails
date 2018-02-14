class User < ApplicationRecord
    has_secure_password
    has_many :projects
    has_many :tasks

    validates :email, presence: true, uniqueness: true
    validates_presence_of :password_digest
    validates :password_digest, length: { minimum: 6 }
end
