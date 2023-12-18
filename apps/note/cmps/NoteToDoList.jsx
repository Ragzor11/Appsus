const { useEffect } = React

function NoteTodoList({ note, onSave, onRemove }) {
  const { style, info } = note
  const { todos, title } = info

  function remove(idx) {
    note.info.todos.splice(idx, 1)
    onSave(note)
  }

  const getTodoStyle = (todo) => ({
    textDecoration: todo.isMarked ? "line-through" : "none",
  })

  function toggleMark(todo) {
    todo.isMarked = !todo.isMarked
    onSave(note)
  }

  // Check if all todos are removed and notify the parent to remove the note
  useEffect(() => {
    if (todos.length === 0) {
      onRemove(note.id)
    }
  }, [note, onRemove])

  return (
    <article style={style} className="todos-preview">
      <h2>{title}</h2>
      {todos.map((todo, idx) => (
        <div key={idx} className="todo-task">
          <span onClick={() => toggleMark(todo)} style={getTodoStyle(todo)}>
            {todo.todo}
          </span>
          <button className="btn-remove-todo" onClick={() => remove(idx)}>
            x
          </button>
        </div>
      ))}
    </article>
  )
}
