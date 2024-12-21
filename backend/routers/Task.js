import { Router } from "express";
import taskController from "../controllers/Task.js"; // Assuming you have a Task controller
const taskRouter = Router();

// Route to create a new task
taskRouter.post("/create", (req, res) => {
  const result = new taskController().create(req.body);
  result
    .then((success) => {
      res.status(201).send(success);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to get all tasks
taskRouter.get("/get", (req, res) => {
  const result = new taskController().getAll();
  result
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Route to get a task by taskId (number) and userId (ObjectId)
taskRouter.get("/get/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;
  
  const result = new taskController().getTaskByTaskId(userId, parseInt(taskId)); // parseInt to ensure taskId is a number
  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    });
});

// Route to get tasks by userId
taskRouter.get("/get/:userId", (req, res) => {
  const { priority, status, sortBy, order } = req.query; // Capture query params for filtering and sorting
  const result = new taskController().getTasksByUser(
    req.params.userId,
    priority,
    status,
    sortBy,
    order
  ); // Pass filters and sorting to the controller

  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    });
});

// Edit task by userId and taskId
  taskRouter.put("/edit/:userId/:taskId", (req, res) => {
    const { userId, taskId } = req.params;
    const taskData = req.body; 
    
    const result = new taskController().editTask(userId, parseInt(taskId), taskData); // Parse taskId as number
    result
      .then((response) => {
        if (response.status === 0) {
          return res.status(404).send({
            message: response.msg,
          });
        }
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Internal Server Error",
          error: err.message,
        });
      });
  });

// Delete task by userId and taskId
taskRouter.delete("/delete/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;

  const result = new taskController().deleteTask(userId, parseInt(taskId)); // Parse taskId as number
  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error",
        error: err.message,         
      });
    });
});

taskRouter.get("/last/:userId", (req, res) => {
  const result = new taskController().getLastTaskId(req.params.userId);

  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error("Error:", err);
      res.status(500).send({
        message: "Error fetching last task",
        error: err.message,
      });
    });
});

// Route to update task status by taskId and userId
taskRouter.patch("/status/:userId/:taskId", (req, res) => {
  const { userId, taskId } = req.params;
  const { status } = req.body; // Expecting status to be sent in the request body
  console.log(req.params)
  const result = new taskController().updateStatus(userId, parseInt(taskId), status); // Parse taskId as number
  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    });
});

taskRouter.get("/statistics/:userId", (req, res) => {
  const { userId } = req.params;

  const result = new taskController().fetchTaskStatistics(userId);
  result
    .then((response) => {
      if (response.status === 0) {
        return res.status(404).send({
          message: response.msg,
        });
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Internal Server Error",
        error: err.message,
      });
    });
});


export default taskRouter;
