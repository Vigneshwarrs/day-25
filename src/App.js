import { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Todo />
    </div>
  );
}

function Todo() {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  function handleTodo() {
    setTodos([...todos,{name,description, status: "not_completed"}]);
    setName('');
    setDescription('');
  }

  function handleFilter(e) {
    setFilter(e.target.value)
  }

  function handleEditTodo(todo) {
    setEditingTodo(todo);
    setName(todo.name);
    setDescription(todo.description);
    setIsEdit(true);
  }

  function handleUpdate(todo) {
    const todoIndex = todos.findIndex((tod)=> todo===tod);
    const updatedTodo = todos.map((td,index)=>(todoIndex === index ? {...td, name,description}: td));
    setTodos(updatedTodo);
    setEditingTodo(null)
    setName('');
    setDescription('');
    setIsEdit(false);
  }

  const filteredTodo = todos.filter((todo)=>(filter==='all'? true : todo.status===filter));


  return (
    <div>
      <p>My Todo</p>
      <div className='add'>
        <input type='text' value={name} name='name' id='name' placeholder='Todo Name' onChange={(e)=> setName(e.target.value)} />
        <input type='text' value={description} name='description' id='description' placeholder='Todo Description' onChange={(e)=> setDescription(e.target.value)}/>
        {
          editingTodo ? <button type='update' onClick={()=>handleUpdate(editingTodo)}>Update Todo</button>
                        :<button type='submit' onClick={()=>handleTodo()}>Add Todo</button>
        }
      </div>
      <div className='statusBar'>
        <p>My Todos</p>
        <div className='filter'>
        <label htmlFor='statusFilter'>Status Filter: </label>
        <select name='statusFilter' id='statusFilter' value={filter} onChange={handleFilter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </select>
        </div>
      </div>
      <div id="display">
      {filteredTodo.map((todo, index)=> 
      <Card todo={todo} key={index} id={index} todos={todos} setTodos={setTodos} selectedStatus={todo.status} handleEditTodo={handleEditTodo} isEdit={isEdit}/>
    )}
      </div>
    </div>
  );
}

function Card({todo, setTodos, todos, selectedStatus, handleEditTodo ,isEdit}) {

  function handleSelect(e) {
    const selectedValue = e.target.value;
    const todoIndex = todos.findIndex((tod)=> todo===tod);
    setTodos((prev)=>prev.map((td,index)=>(index===todoIndex? {...td, status:selectedValue}: td)));
  }

  function handleDelete() {
    const updatesTodo = todos.filter((td)=> (todo!==td));
    setTodos(updatesTodo);
  }


  return (
    <div className='card'>
      <p>Name: {todo.name}</p>
      <p>Description: {todo.description}</p>
      <label htmlFor='status'>Status:  </label>
      <select id='status' name='status' style={{backgroundColor: selectedStatus === 'completed'?'green':'rgb(255, 128, 128)'}} onChange={(e)=>handleSelect(e)} value={todo.status}>
        <option value="not_completed">Not Completed</option>
        <option value="completed">Completed</option>
      </select>
      <div className='btn'>
        {
          isEdit ? '': <button id='edit' onClick={()=>handleEditTodo(todo)}>Edit</button>
        }
        <button id='delete' onClick={()=>handleDelete()}>Delete</button>
      </div>
    </div>
  );
}

export default App;
