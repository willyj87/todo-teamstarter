import { Task } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  Container,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";

export default function CreatePage() {
  const [data, setData] = useState<Partial<Task>>({
    title: "",
    description: "",
  });
  const [toast, setToast] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    data: Partial<Task>
  ) => {
    e.preventDefault();
    const submit = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/tasks/create`,
      data,
    });
    setToast(submit.status === 200);
    router.push('/')
  };

  const handleChange = (value: string, name: "title" | "description") => {
    setData({ ...data, [name]: value });
  };
  return (
    <Container className="mt-5">
      {toast && (
        <ToastContainer position="top-center">
          <Toast bg="success" autohide delay={2000} show={toast}>
            <Toast.Body>You successfully create your task</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
      <Form onSubmit={(e) => handleSubmit(e, data)}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={data.title ? data.title : undefined}
            onChange={(e) => handleChange(e.target.value, "title")}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Short description for your task"
            value={data.description ? data.description : undefined}
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
