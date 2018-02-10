class User < ApplicationRecord
    has_secure_password
    has_many :projects
    has_many :tasks

    validates_presence_of :email, :password_digest
end
