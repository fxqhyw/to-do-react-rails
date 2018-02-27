class AddPriorityToTasks < ActiveRecord::Migration[5.1]
    def self.up
      add_column :tasks, :priority, :integer
      execute <<-SQL
       CREATE SEQUENCE priority_seq START 1;
       ALTER SEQUENCE priority_seq OWNED BY tasks.priority;
       ALTER TABLE tasks ALTER COLUMN priority SET DEFAULT nextval('priority_seq');
      SQL
    end
end
