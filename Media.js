from datetime import datetime
from typing import List, Optional
from enum import Enum

class TaskStatus(Enum):
    TODO = "TODO"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"

class Task:
    def __init__(self, title: str, description: str, due_date: str):
        self.id = None  # Will be set by TaskManager
        self.title = title
        self.description = description
        self.due_date = self._validate_date(due_date)
        self.status = TaskStatus.TODO

    def _validate_date(self, date_str: str) -> datetime:
        try:
            return datetime.strptime(date_str, "%Y-%m-%d")
        except ValueError:
            raise ValueError("Date must be in YYYY-MM-DD format")

    def update_status(self, status: TaskStatus):
        self.status = status

class TaskManager:
    def __init__(self):
        self.tasks: List[Task] = []
        self.next_id = 1

    def add_task(self, task: Task) -> int:
        task.id = self.next_id
        self.tasks.append(task)
        self.next_id += 1
        return task.id

    def remove_task(self, task_id: int) -> bool:
        task = self.get_task(task_id)
        if task:
            self.tasks.remove(task)
            return True
        return False

    def get_task(self, task_id: int) -> Optional[Task]:
        return next((task for task in self.tasks if task.id == task_id), None)

    def list_tasks(self, status: TaskStatus = None) -> List[Task]:
        if status:
            return [task for task in self.tasks if task.status == status]
        return self.tasks

def main():
    manager = TaskManager()
    
    while True:
        print("\n1. Add task")
        print("2. List tasks")
        print("3. Update task status")
        print("4. Remove task")
        print("5. Exit")
        
        choice = input("Choose an option: ")

        if choice == "1":
            title = input("Title: ")
            desc = input("Description: ")
            due_date = input("Due date (YYYY-MM-DD): ")
            try:
                task = Task(title, desc, due_date)
                task_id = manager.add_task(task)
                print(f"Task added with ID: {task_id}")
            except ValueError as e:
                print(f"Error: {e}")

        elif choice == "2":
            tasks = manager.list_tasks()
            for task in tasks:
                print(f"\nID: {task.id}")
                print(f"Title: {task.title}")
                print(f"Status: {task.status.value}")
                print(f"Due: {task.due_date.strftime('%Y-%m-%d')}")

        elif choice == "3":
            task_id = int(input("Task ID: "))
            print("Statuses: TODO, IN_PROGRESS, DONE")
            status = input("New status: ")
            task = manager.get_task(task_id)
            if task:
                try:
                    task.update_status(TaskStatus[status])
                    print("Status updated")
                except KeyError:
                    print("Invalid status")
            else:
                print("Task not found")

        elif choice == "4":
            task_id = int(input("Task ID: "))
            if manager.remove_task(task_id):
                print("Task removed")
            else:
                print("Task not found")

        elif choice == "5":
            break

if __name__ == "__main__":
    main()