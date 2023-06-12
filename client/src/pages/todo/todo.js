import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState, useEffect } from "react";
import "./todo.css";
import axios from "axios";

const Todo = () => {
  const [taskValue, setTaskValue] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [showUpdateField, setShowUpdateField] = useState("");
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getTasks").then((response) => {
      setTaskList(response.data);
    });
  }, []);

  const addTask = () => {
    axios
      .post("http://localhost:3001/createTask", {
        task: taskValue,
        status: false,
      })
      .then((response) => {
        setTaskList([...taskList, { task: taskValue, status: false }]);
        setTaskValue("");
      });
  };

  const updateTask = (id) => {
    axios
      .put("http://localhost:3001/updateTask", {
        id: id,
        task: editTask,
      })
      .then((response) => {
        setTaskList(response.data);
        setShowUpdateField("");
      });
  };

  const updateStatus = (id, status) => {
    axios
      .put("http://localhost:3001/updateStatus", {
        id: id,
        status: !status,
      })
      .then((response) => {
        setTaskList(response.data);
        setShowUpdateField("");
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/deleteTask/${id}`).then((response) => {
      setTaskList(response.data);
    });
  };

  return (
    <Container>
      <Card className="todoContainer">
        <Card.Header as="h5">Todo</Card.Header>
        <Card.Body>
          <Card.Title>Add new task:</Card.Title>

          <InputGroup className="mb-3">
            <Form.Control
              onChange={(e) => {
                setTaskValue(e.target.value);
              }}
              value={taskValue}
              placeholder="..."
              className="test"
            />
            <Button variant="primary" onClick={addTask}>
              Submit
            </Button>
          </InputGroup>
        </Card.Body>
        <Card.Body>
          <Card.Title className="test">To complete:</Card.Title>

          <ul>
            {taskList.map((item, key) => {
              return (
                item.status === false && (
                  <li key={key} className="tasks">
                    {showUpdateField === item._id ? (
                      <>
                        <InputGroup className="mb-3 mt-4">
                          <Form.Control
                            onChange={(e) => {
                              setEditTask(e.target.value);
                            }}
                            placeholder={item.task}
                          />
                          <Button
                            className="btn btn-success"
                            onClick={() => updateTask(item._id)}
                          >
                            Submit
                          </Button>
                          <Button
                            className="btn btn-primary"
                            onClick={() => {
                              setShowUpdateField("");
                            }}
                          >
                            Cancel
                          </Button>
                        </InputGroup>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            marginTop: "7%",
                            maxWidth: "300px",
                          }}
                        >
                          {item.task}
                        </div>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            updateStatus(item._id, item.status);
                          }}
                        >
                          Complete
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShowUpdateField(item._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteTask(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                )
              );
            })}
          </ul>
        </Card.Body>
        <hr />
        <Card.Body>
          <Card.Title>Completed:</Card.Title>

          <ul>
            {taskList.map((item, key) => {
              return (
                item.status === true && (
                  <li key={key} className="tasks">
                    {showUpdateField === item._id ? (
                      <>
                        <InputGroup className="mb-3 mt-4">
                          <Form.Control
                            onChange={(e) => {
                              setEditTask(e.target.value);
                            }}
                            placeholder={item.task}
                          />
                          <Button
                            className="btn btn-success"
                            onClick={() => updateTask(item._id)}
                          >
                            Submit
                          </Button>
                          <Button
                            className="btn btn-primary"
                            onClick={() => {
                              setShowUpdateField("");
                            }}
                          >
                            Cancel
                          </Button>
                        </InputGroup>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            marginTop: "7%",
                            maxWidth: "300px",
                          }}
                        >
                          {item.task}
                        </div>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            updateStatus(item._id, item.status);
                          }}
                        >
                          Unfinished
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setShowUpdateField(item._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteTask(item._id);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </li>
                )
              );
            })}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Todo;
