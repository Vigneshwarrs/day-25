
export default function Card({ todo, setTodos, todos, selectedStatus, handleEditTodo, isEdit }) {

  function handleSelect(e) {
    const selectedValue = e.target.value;
    const todoIndex = todos.findIndex((tod) => todo === tod);
    setTodos((prev) => prev.map((td, index) => (index === todoIndex ? { ...td, status: selectedValue } : td)));
  }

  function handleDelete() {
    const updatesTodo = todos.filter((td) => (todo !== td));
    setTodos(updatesTodo);
  }


  return (
    <div className='card'>
      <p>Name: {todo.name}</p>
      <p>Description: {todo.description}</p>
      <label htmlFor='status'>Status:  </label>
      <select id='status' name='status' style={{ backgroundColor: selectedStatus === 'completed' ? 'green' : 'rgb(255, 128, 128)' }} onChange={(e) => handleSelect(e)} value={todo.status}>
        <option value="not_completed">Not Completed</option>
        <option value="completed">Completed</option>
      </select>
      <div className='btn'>
        {isEdit ? '' : <button id='edit' onClick={() => handleEditTodo(todo)}>Edit</button>}
        <button id='delete' onClick={() => handleDelete()}>Delete</button>
      </div>
    </div>
  );
}
