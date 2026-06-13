import { useEffect, useState } from "react";

import type { ToDoItem } from "../../models/ToDoItem";

import appDraw1 from "../assets/images/graphic1.png";
import appDraw2 from "../assets/images/graphic2.png";
import appDraw3 from "../assets/images/graphic3.png";

interface ToDoModalProps {
  isOpen: boolean;
  onClose: () => void;

  toDo?: ToDoItem | null;

  onCreate: (toDo: {
    title: string;
    notes: string;
    priority: string;
    deadline: string;
  }) => void;

  onUpdate: (todo: ToDoItem) => void;

  onDelete: (id: number) => void;
}

function ToDoModal({
  isOpen,
  onClose,
  toDo,
  onCreate,
  onUpdate,
  onDelete,
}: ToDoModalProps) {
  const isEditMode = toDo !== null && toDo !== undefined;
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (toDo) {
      setTitle(toDo.title);
      setNotes(toDo.notes);
      setPriority(toDo.priority);
      setDeadline(toDo.deadline.split("T")[0]);
    } else {
      setTitle("");
      setNotes("");
      setPriority("Medium");
      setDeadline("");
    }
  }, [toDo]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="win98-window">
        <div className="win98-titlebar">
          <span>{isEditMode ? "Edit Task" : "Create New Task"}</span>
        </div>

        {/*Tourquese side panel*/}
        <div className="modal-body">
          <div className="modal-sidebar">
            <img src={appDraw3} alt="" className="icon-calendar" />
            <img src={appDraw2} alt="" className="icon-clock" />
            <img src={appDraw1} alt="" className="icon-note" />
          </div>

          {/*FORM*/}
          <div className="modal-content">
            <h2>{isEditMode ? "Edit Task" : "Create New Task"}</h2>

            <div className="modal-form">
              <div className="form-group">
                <label>Task</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Note</label>
                <textarea
                  style={{ resize: "none" }}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>

              <fieldset className="priority-box">
                <legend>Priority</legend>

                <div className="priority-option">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    id="Low"
                    checked={priority === "Low"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <label htmlFor="Low">Low</label>
                </div>

                <div className="priority-option">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    id="Medium"
                    checked={priority === "Medium"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <label htmlFor="Medium">Medium</label>
                </div>

                <div className="priority-option">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    id="High"
                    checked={priority === "High"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <label htmlFor="High">High</label>
                </div>
              </fieldset>
            </div>

            <div className="modal-divider"></div>

            {/*Buttons*/}
            <div className="modal-actions">
              <button
                onClick={() => {
                  if (isEditMode && toDo) {
                    onUpdate({
                      ...toDo,
                      title,
                      notes,
                      priority,
                      deadline,
                    });
                  } else {
                    onCreate({
                      title,
                      notes,
                      priority,
                      deadline,
                    });
                  }

                  onClose();
                }}
              >
                OK
              </button>

              {/*visible only if you are editing*/}
              {isEditMode && toDo && (
                <button
                  onClick={() => {
                    onDelete(toDo.id);
                  }}
                >
                  Delete
                </button>
              )}

              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoModal;
