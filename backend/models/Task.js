import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: Number,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 3,
    },
    status: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// mapping userId and taskId so that an individual can not have a duplicate task id , but if other user adds same numbered task , he should be allowed to do so along with a unique taskId and no issue comes while fetching individual id's data through taskId 
//we simply create a unique index on the combination of userId and taskId , This means that for each userId, the taskId must be unique
taskSchema.index({ userId: 1, taskId: 1 }, { unique: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
