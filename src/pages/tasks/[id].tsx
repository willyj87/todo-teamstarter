import { Task } from "@prisma/client";
import axios from "axios";
import { NextApiRequest } from "next";
import { Button, Table } from "react-bootstrap";
import { FaRegCheckCircle, FaRegCircle, FaRegTrashAlt } from "react-icons/fa";

export default function Home({ task }: { task: Task }) {
  return (
    <div className="m-5">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
    </div>
  );
}

export async function getServerSideProps(req: NextApiRequest) {
  const { data } = await axios(`${process.env.API_URL}/tasks/${req.query.id}`);
  return {
    props: { task: data },
  };
}
