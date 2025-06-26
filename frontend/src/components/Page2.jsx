function Page2() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="w-100" style={{ maxWidth: 500 }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold">
            My Awesome <span className="badge bg-success fs-4">TODO</span> App
          </h1>
          <p className="text-muted">Organize your tasks efficiently and stylishly!</p>
        </div>
        <form className="mb-4 shadow-sm rounded p-4 bg-white">
          <div className="mb-3">
            <label htmlFor="newItem" className="form-label fs-5">
              New Item
            </label>
            <input
              type="text"
              id="newItem"
              className="form-control"
              placeholder="What do you need to do?"
              autoComplete="off"
            />
            <div className="form-text">Add items to your TODO list!</div>
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-semibold">
            <i className="bi bi-plus-circle me-2"></i>Add Task
          </button>
        </form>
        <div className="bg-white rounded shadow-sm p-4">
          <h3 className="mb-3">Todo Items</h3>
          <ul className="list-group">
            <li className="list-group-item d-flex align-items-center justify-content-between">
              <div className="form-check">
                <input type="checkbox" className="form-check-input me-2" id="item1" />
                <label className="form-check-label" htmlFor="item1">
                  ITEM
                </label>
              </div>
              <button className="btn btn-outline-danger btn-sm">
                <i className="bi bi-trash"></i> Delete
              </button>
            </li>
            {/* Add more items here */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page2;
