import React, { useEffect, useRef, useState } from "react";
import { ToDo } from "../model";
import "./singleTodo.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: ToDo;
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  index: number;
};

const SingleTodo = ({ todo, setTodos, index }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number): void => {
    setTodos((current: ToDo[]): ToDo[] => {
      const newTodos = current.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      });
      return newTodos;
    });
  };

  const handleDelete = (id: number): void => {
    setTodos((current: ToDo[]): ToDo[] => {
      const newTodos = current.filter((todos) => todos.id !== id);
      return newTodos;
    });
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    id: number
  ): void => {
    e.preventDefault();
    setTodos((current: ToDo[]): ToDo[] => {
      const newTodos = current.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      });
      return newTodos;
    });
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleSubmit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}>
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className='todos__single--text'
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className='todos__single--text'>{todo.todo}</s>
          ) : (
            <span className='todos__single--text'>{todo.todo}</span>
          )}
          <div>
            <span
              className='icon'
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}>
              <AiFillEdit />
            </span>
            <span className='icon' onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className='icon' onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
