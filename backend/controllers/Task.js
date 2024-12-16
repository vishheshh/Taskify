import Task from "../models/Task.js";
import mongoose from "mongoose";

class TaskController {
  async create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if task with the same taskId already exists
        const userId = new mongoose.Types.ObjectId(data.userId);

        const existingTask = await Task.findOne({
          userId: userId,
          taskId: data.taskId,
        });
        if (existingTask) {
          reject({
            msg: "Task ID already exists",
            status: 0,
          });
        } else {
          const task = new Task({
            taskId: data.taskId,
            taskTitle: data.taskTitle,
            priority: data.priority,
            status: data.status,
            startTime: new Date(data.startTime), // Convert string to Date if necessary
            endTime: new Date(data.endTime), // Convert string to Date if necessary
            userId: userId, // Use the converted ObjectId
          });
          task
            .save()
            .then((success) => {
              resolve({
                msg: "Task created successfully",
                status: 1,
                task: success,
              });
            })
            .catch((err) => {
              reject({
                msg: "Error while creating task",
                status: 0,
                error: err.message,
              });
            });
        }
      } catch (err) {
        reject({
          msg: "Error creating task",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  // Get all tasks
  async getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const tasks = await Task.find().populate("userId", "name email"); // Assuming the User model has 'name' and 'email'
        resolve(tasks);
      } catch (err) {
        reject({
          msg: "Error fetching tasks",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async getTasksByUser(userId, priority, status, sortBy, order) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Build the query object
        let query = { userId: userObjectId };

        // Add priority filter if provided
        if (priority) {
          const priorityNum = parseInt(priority, 10);
          if (priorityNum >= 1 && priorityNum <= 5) {
            query.priority = priorityNum; // Filter tasks by priority
          } else {
            return reject({
              msg: "Invalid priority value. It should be between 1 and 5.",
              status: 0,
            });
          }
        }

        // Add status filter if provided
        if (status !== undefined) {
          query.status = status === "true"; // Convert string 'true'/'false' to boolean
        }

        // Default sort by createdAt ascending if not provided
        if (!sortBy) {
          sortBy = "createdAt";
        }

        // Default order to ascending if not provided
        if (!order) {
          order = "asc";
        }

        // Validate order (ascending or descending)
        if (order !== "asc" && order !== "desc") {
          return reject({
            msg: "Invalid order value. It should be 'asc' or 'desc'.",
            status: 0,
          });
        }

        // Validate sort field (only one field)
        const validSortFields = [
          "priority",
          "status",
          "createdAt",
          "updatedAt",
        ];
        if (!validSortFields.includes(sortBy)) {
          return reject({
            msg: "Invalid sort field. Valid fields are 'priority', 'status', 'createdAt'.",
            status: 0,
          });
        }

        // Build the sort object for the query
        let sort = {};
        sort[sortBy] = order === "desc" ? -1 : 1;

        // Fetch tasks based on the dynamic query and sort
        const tasks = await Task.find(query).sort(sort);

        if (!tasks || tasks.length === 0) {
          return resolve({
            msg: "No tasks found for this user",
            status: 0,
          });
        }

        resolve({
          msg: "Tasks fetched successfully",
          status: 1,
          tasks,
        });
      } catch (err) {
        reject({
          msg: "Error fetching tasks",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async getTaskByTaskId(userId, taskId) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is a valid ObjectId and taskId is a number
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId and taskId is a number
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Fetch tasks for the user by both userId (ObjectId) and taskId (number)
        const tasks = await Task.find({ userId: userObjectId, taskId: taskId });

        if (!tasks || tasks.length === 0) {
          return resolve({
            msg: "No tasks found for this user with the given taskId",
            status: 0,
          });
        }

        // Return the first matching task or handle duplicates as needed
        resolve({
          msg: "Task fetched successfully",
          status: 1,
          task: tasks[0], // If you want the first task
        });
      } catch (err) {
        reject({
          msg: "Error fetching task",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async editTask(userId, taskId, taskData) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find and update the task by both userId (ObjectId) and taskId (number)
        const updatedTask = await Task.findOneAndUpdate(
          { userId: userObjectId, taskId: taskId }, // taskId is a number
          { $set: taskData }, // Update task data
          { new: true } // Return the updated task
        );

        if (!updatedTask) {
          return resolve({
            msg: "Task not found for this user with the given taskId",
            status: 0,
          });
        }

        resolve({
          msg: "Task updated successfully",
          status: 1,
          task: updatedTask,
        });
      } catch (err) {
        reject({
          msg: "Error updating task",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  // Delete a task by taskId and userId
  async deleteTask(userId, taskId) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find and delete the task by both userId (ObjectId) and taskId (number)
        const deletedTask = await Task.findOneAndDelete({
          userId: userObjectId,
          taskId: taskId, // taskId is a number
        });

        if (!deletedTask) {
          return resolve({
            msg: "Task not found for this user with the given taskId",
            status: 0,
          });
        }

        resolve({
          msg: "Task deleted successfully",
          status: 1,
        });
      } catch (err) {
        reject({
          msg: "Error deleting task",
          status: 0,
          error: err.message,
        });
      }
    });
  }
  async getLastTaskId(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the last task by the given userId, sorted by taskId in descending order
        const lastTask = await Task.findOne({ userId: userObjectId })
          .sort({ taskId: -1 }) // Sort by taskId in descending order
          .limit(1); // Limit to 1 document
        // console.log("Last Task:", lastTask.taskId);
        if (!lastTask) {
          return resolve({
            msg: "No tasks found for this user",
            status: 0,
            taskId: null,
          });
        }

        // Return the taskId of the last task
        resolve({
          msg: "Last task found",
          status: 1,
          taskId: lastTask.taskId,
        });
      } catch (err) {
        reject({
          msg: "Error fetching last task",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async updateStatus(userId, taskId) {
    return new Promise(async (resolve, reject) => {
      try {
        // Ensure userId is valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        // Convert userId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the task by userId and taskId
        const task = await Task.findOne({
          userId: userObjectId,
          taskId: taskId,
        });

        if (!task) {
          return resolve({
            msg: "Task not found for this user with the given taskId",
            status: 0,
          });
        }

        // Toggle the status (assuming status is a boolean)
        const newStatus = task.status === true ? false : true; // Invert the boolean status

        // If the task is being marked as complete, update the endTime
        const updateData = { status: newStatus };
        if (newStatus === true) {
          // Task completed, set the endTime to current date
          updateData.endTime = new Date(); // Set end time to current date/time
        }

        // Update the task with the new status and possibly the endTime
        const updatedTask = await Task.findOneAndUpdate(
          { userId: userObjectId, taskId: taskId },
          { $set: updateData },
          { new: true } // Return the updated task
        );

        resolve({
          msg: "Task status updated successfully",
          status: 1,
          task: updatedTask,
        });
      } catch (err) {
        reject({
          msg: "Error updating task status",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async fetchTaskStatistics(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          return reject({
            msg: "Invalid userId format",
            status: 0,
          });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Fetch all tasks for the user
        const tasks = await Task.find({ userId: userObjectId });

        if (!tasks.length) {
          return resolve({
            msg: "No tasks found for this user",
            status: 0,
          });
        }

        const totalTasks = tasks.length;

        // Completed and Pending Tasks
        const completedTasks = tasks.filter((task) => task.status).length;
        const pendingTasks = totalTasks - completedTasks;

        const completedTaskTimes = tasks
          .filter((task) => task.status)
          .map((task) => {
            const time =
              (new Date(task.endTime) - new Date(task.startTime)) / 3600000; // Convert ms to hours
            return time >= 0 ? time : 0; // Ensure non-negative time
          });

        const pendingTaskTimes = tasks
          .filter((task) => !task.status)
          .map((task) => {
            const timeLapsed = Math.max(
              0,
              (new Date() - new Date(task.startTime)) / 3600000 // Convert ms to hours
            );

            const balanceTime = Math.max(
              0,
              (new Date(task.endTime) - new Date()) / 3600000 // Ensure non-negative balance time
            );

            const priority = task.priority || 1; // Default to priority 1 if not set
            return {
              timeLapsed: timeLapsed >= 0 ? timeLapsed : 0, // Ensure non-negative time
              balanceTime: balanceTime >= 0 ? balanceTime : 0, // Ensure non-negative balance time
              priority,
            };
          });

        // Average completion time for completed tasks
        const averageCompletionTime = completedTaskTimes.length
          ? completedTaskTimes.reduce((a, b) => a + b, 0) /
            completedTaskTimes.length
          : 0;

        // Group pending task times by priority
        const pendingStatsByPriority = pendingTaskTimes.reduce((acc, task) => {
          const { priority, timeLapsed, balanceTime } = task;

          // If the priority does not exist, initialize it
          if (!acc[priority]) {
            acc[priority] = { timeLapsed: 0, balanceTime: 0, count: 0 };
          }

          // Add the current task's time and balance values to the accumulator
          acc[priority].timeLapsed += timeLapsed;
          acc[priority].balanceTime += balanceTime;
          acc[priority].count += 1;

          return acc;
        }, {}); // The empty object {} ensures the accumulator is reset on each call

        // Format response with all priorities
        const formattedPriorityStats = Object.keys(pendingStatsByPriority).map(
          (priority) => ({
            priority,
            timeLapsed: pendingStatsByPriority[priority].timeLapsed.toFixed(2),
            balanceTime:
              pendingStatsByPriority[priority].balanceTime.toFixed(2),
            count: pendingStatsByPriority[priority].count,
          })
        );

        resolve({
          totalTasks,
          completedTasksPercent: ((completedTasks / totalTasks) * 100).toFixed(
            2
          ),
          pendingTasksPercent: ((pendingTasks / totalTasks) * 100).toFixed(2),
          averageCompletionTime: averageCompletionTime.toFixed(2),
          pendingStatsByPriority: formattedPriorityStats,
          status: 1,
        });
      } catch (err) {
        reject({
          msg: "Error fetching task statistics",
          status: 0,
          error: err.message,
        });
      }
    });
  }
}

export default TaskController;
