import "../styles/Dashboard.css";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import userpool from "./userpool";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import { v4 as uuidv4 } from "uuid";
import GLOBAL_VARS from "../GLOBAL_VARS";

function Dashboard() {
  // Set global vars
  const VITE_BACKEND_API_URL = GLOBAL_VARS.VITE_BACKEND_API_URL;

  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [todoItems, setTodoItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (!user) {
      navigate(`/home`);
    }
    try {
      // Get user details to populate page
      const clientId = user?.pool?.clientId;
      const username = user?.username;
      console.debug(`username is: ${username}, clientId is: ${clientId}`);

      const idTokenKey = `CognitoIdentityServiceProvider.${clientId}.${username}.idToken`;
      const idToken = user?.storage[idTokenKey];
      const decodedToken = jose.decodeJwt(idToken);
      let userName = user?.username;
      let userEmailText = decodedToken.email;
      let userFullName = decodedToken.name;
      console.debug(`decodedToken is: ${JSON.stringify(decodedToken)}`);
      console.log(
        `userName is: ${userName}, userEmail is: ${userEmailText}, userFullName is: ${userFullName}`
      );
      setUserEmail(userEmailText);

      // Fetch TODO items
      const myHeaders = new Headers();
      let correlationId = `santi-${uuidv4()}`;
      myHeaders.append("Correlation-ID", correlationId);
      myHeaders.append("Authorization", idToken);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      let getTodosPath =
        VITE_BACKEND_API_URL + `/todos?user_email=${userEmailText}`;
      console.log(`getTodosPath is: ${getTodosPath}`);

      // Fetch the TODO items
      fetch(getTodosPath, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(`fetched_data: ${data}`);
          setTodoItems(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      setUserEmail("");
    }
  }, []);

  // **************************
  // Create a new TODO item
  // **************************

  const deleteItem = async (sk) => {
    console.log(`Starting deleteItem with sk: ${sk}`);
    let todoId = sk.replace("TODO#", "");
    let deleteTodoPath =
      VITE_BACKEND_API_URL + `/todos/${todoId}?user_email=${userEmail}`;
    console.log(`deleteTodoPath is: ${deleteTodoPath}`);

    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (!user) {
      navigate(`/home`);
    }

    // Get user details to populate page
    const clientId = user?.pool?.clientId;
    const username = user?.username;
    console.debug(`username is: ${username}, clientId is: ${clientId}`);

    const idTokenKey = `CognitoIdentityServiceProvider.${clientId}.${username}.idToken`;
    const idToken = user?.storage[idTokenKey];
    const decodedToken = jose.decodeJwt(idToken);
    let userName = user?.username;
    let userEmailText = decodedToken.email;
    let userFullName = decodedToken.name;
    console.debug(`decodedToken is: ${JSON.stringify(decodedToken)}`);
    console.log(
      `userName is: ${userName}, userEmail is: ${userEmailText}, userFullName is: ${userFullName}`
    );
    setUserEmail(userEmailText);

    try {
      // Fetch TODO items
      const myHeaders = new Headers();
      let correlationId = `santi-${uuidv4()}`;
      myHeaders.append("Correlation-ID", correlationId);
      myHeaders.append("Authorization", idToken);

      const response = await fetch(deleteTodoPath, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });

      if (!response.ok) {
        throw new Error("Error deleting item");
      }

      // Remove the deleted item from the state
      setTodoItems(todoItems.filter((item) => item.SK !== sk));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  // **************************
  // Create a new TODO item
  // **************************
  const createItem = async (event) => {
    event.preventDefault();
    console.log(`Starting createItem with newTitle: ${newTitle}`);

    let user = userpool.getCurrentUser();
    console.log(`user is: ${JSON.stringify(user)}`);

    if (!user) {
      navigate(`/home`);
    }

    // Get user details to populate page
    const clientId = user?.pool?.clientId;
    const username = user?.username;
    console.debug(`username is: ${username}, clientId is: ${clientId}`);

    const idTokenKey = `CognitoIdentityServiceProvider.${clientId}.${username}.idToken`;
    const idToken = user?.storage[idTokenKey];
    const decodedToken = jose.decodeJwt(idToken);
    let userName = user?.username;
    let userEmailText = decodedToken.email;
    let userFullName = decodedToken.name;
    console.debug(`decodedToken is: ${JSON.stringify(decodedToken)}`);
    console.log(
      `userName is: ${userName}, userEmail is: ${userEmailText}, userFullName is: ${userFullName}`
    );
    setUserEmail(userEmailText);

    try {
      // Create TODO items
      let createTodoPath = VITE_BACKEND_API_URL + `/todos`;
      console.log(`createTodoPath is: ${createTodoPath}`);

      const myHeaders = new Headers();
      let correlationId = `santi-${uuidv4()}`;
      myHeaders.append("Correlation-ID", correlationId);
      myHeaders.append("Authorization", idToken);
      myHeaders.append("Content-Type", "application/json");

      const response = await fetch(createTodoPath, {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          user_email: userEmailText,
          todo_title: newTitle,
          todo_details: "Default details",
          todo_date: "2025-12-31",
        }),
      });

      if (!response.ok) {
        throw new Error("Error creating item");
      }
      const newItem = await response.json();
      setTodoItems([...todoItems, newItem]);
      // Remove existing text from the input field
      // Clear the input field
      document.getElementById("newItem").value = "";
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  return (
    <>
      <Header userEmail={userEmail} />
      <div className="dashboard-container py-4" style={{ background: "#f7f9fb", minHeight: "100vh" }}>
        <div className="container shadow rounded p-4 bg-white" style={{ maxWidth: 700 }}>
          <h1 className="mb-4 text-primary fw-bold text-center" style={{ letterSpacing: 2 }}>📝 TODOs App</h1>
          <form id="form-create-todos" onSubmit={createItem} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                id="newItem"
                className="form-control form-control-lg"
                placeholder="Add a new task..."
                onChange={(e) => setNewTitle(e.target.value)}
                autoComplete="off"
                style={{ borderTopLeftRadius: 30, borderBottomLeftRadius: 30 }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ borderTopRightRadius: 30, borderBottomRightRadius: 30, padding: "0 2rem" }}
              >
                <span role="img" aria-label="add">➕</span> Add
              </button>
            </div>
            <small id="newItemHelp" className="form-text text-muted ms-2">
              Stay productive! Add your next task.
            </small>
          </form>

          <div className="todo-list-section">
            <h4 className="mb-3 text-secondary">Your Todo Items</h4>
            {todoItems.length === 0 ? (
              <div className="alert alert-info text-center">No items yet. Start by adding one!</div>
            ) : (
              <ul className="list-group list-group-flush">
                {todoItems.map((item) => (
                  <li
                    key={item.SK}
                    className="list-group-item d-flex align-items-center justify-content-between py-3"
                    style={{ borderRadius: 12, marginBottom: 10, background: "#f4f6fa" }}
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <input type="checkbox" className="form-check-input me-3" style={{ width: 22, height: 22 }} />
                      <div>
                        <div className="fw-semibold fs-5">{item.todo_title}</div>
                        <div className="text-muted small">{item.todo_details}</div>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm ms-3"
                      style={{ borderRadius: 20, fontWeight: 500 }}
                      onClick={() => deleteItem(item.SK)}
                    >
                      <span role="img" aria-label="delete">🗑️</span> Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
