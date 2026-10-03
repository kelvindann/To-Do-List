import { useState } from "react";

function App() {
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput.trim(),
      done: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.done).length;
  const remainingTasks = tasks.length - completedTasks;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <header className="mb-8">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
              DCIT 26 • Laboratory 2
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My To-Do List
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              Organize your tasks, track your progress, and stay productive.
            </p>
          </div>
        </header>

        {/* Add Task */}
        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
          <label
            htmlFor="task"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Add a new task
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="task"
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="e.g. Finish my laboratory activity"
              className="min-h-12 flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <button
              onClick={addTask}
              disabled={!taskInput.trim()}
              className="min-h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              + Add Task
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Press Enter to quickly add a task.
          </p>
        </section>

        {/* Progress Summary */}
        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Total Tasks</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Remaining</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">
              {remainingTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </section>

        {/* Task List */}
        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Your Tasks
              </h2>

              <p className="text-sm text-slate-500">
                {tasks.length === 0
                  ? "You have no tasks yet."
                  : `${remainingTasks} task${
                      remainingTasks !== 1 ? "s" : ""
                    } remaining`}
              </p>
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">
                ✓
              </div>

              <h3 className="font-semibold text-slate-800">
                No tasks yet
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Add your first task above and start organizing your day.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className={`rounded-2xl bg-white p-4 shadow-sm ring-1 transition sm:p-5 ${
                    task.done
                      ? "ring-green-200"
                      : "ring-slate-200 hover:ring-blue-200"
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    {/* Task Information */}
                    <div className="flex min-w-0 items-start gap-3">
                      <button
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.done
                            ? "Mark task as not done"
                            : "Mark task as done"
                        }
                        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          task.done
                            ? "border-green-500 bg-green-500 text-white"
                            : "border-slate-300 hover:border-blue-500"
                        }`}
                      >
                        {task.done && "✓"}
                      </button>

                      <div className="min-w-0">
                        <h3
                          className={`break-words text-base font-semibold ${
                            task.done
                              ? "text-slate-400 line-through"
                              : "text-slate-800"
                          }`}
                        >
                          {task.text}
                        </h3>

                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            task.done
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {task.done ? "DONE" : "NOT DONE"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 sm:shrink-0">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition sm:flex-none ${
                          task.done
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {task.done ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="flex-1 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:flex-none"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* User Guide */}
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
          <h2 className="text-xl font-bold text-slate-900">
            How to Use
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Follow these simple steps to manage your tasks.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                1
              </div>

              <h3 className="font-semibold text-slate-800">
                Add a Task
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Type your task in the input field and click Add Task.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                2
              </div>

              <h3 className="font-semibold text-slate-800">
                Complete a Task
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Click Done when you finish a task. Use Undo to change it back.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-100 font-bold text-red-700">
                3
              </div>

              <h3 className="font-semibold text-slate-800">
                Delete a Task
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Click Delete when you no longer need a task.
              </p>
            </div>

          </div>
        </section>

        

      </div>
    </div>
  );
}

export default App;