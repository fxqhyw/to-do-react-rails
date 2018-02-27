class Priority < ActiveRecord::Migration[5.1]
  def change
    change_column :tasks, :priority, :int, null: false, auto_increment: true, default: 1
  end
end
