import { Task } from "@prisma/client";
import { Button, ListGroup, Table } from "react-bootstrap";
import { FaRegCheckCircle, FaRegCircle, FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ tasks: fetchedTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(fetchedTasks);
  const handleDeleted = async (id: number) => {
    const deletedTask = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/delete/${id}`
    );
    if (deletedTask.status === 200) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleChecked = async (task: Task) => {
    const updatedTask = await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/update/${task.id}`,
      data: {
        isDone: !task.isDone,
      },
    });
    if(updatedTask.status === 200) {
      const filteredTask = tasks.map((currentTask) => {
        if(currentTask.id === task.id) {
          currentTask.isDone = !task.isDone;
        }
        return currentTask;
      })
      setTasks(filteredTask)
      console.log(tasks)
    }
  };

  return (
    <>
      <div className="m-5">
        <Button variant="primary" href="/tasks/create">
          Create a new Task
        </Button>
        <Table responsive className="text-align">
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, key) => (
              <tr key={`${task.id}`}>
                <td>{task.title}</td>
                <td>
                  <Button
                    onClick={() => handleChecked(task)}
                    variant={`${task.isDone ? 'success' : 'light'}`}
                  >
                    {task.isDone ? (
                      <FaRegCheckCircle />
                    ) : (
                      <FaRegCircle />
                    )}
                  </Button>
                </td>
                <td>
                  <Button href={`/tasks/${task.id}`} variant="light">
                    Show
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleted(task.id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API_URL}/tasks`);
  return {
    props: { tasks: data },
  };
}
