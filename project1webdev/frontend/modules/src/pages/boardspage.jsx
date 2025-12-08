import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function BoardPage() {
  const { id: boardId } = useParams();
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");

  // load lists + cards
  const loadData = async () => {
    try {
      const res = await API.get(`/api/list/${boardId}`);
      const listsArr = res.data;

      // har list ke cards lao
      const withCards = await Promise.all(
        listsArr.map(async (list) => {
          const cardsRes = await API.get(`/api/card/${list._id}`);
          return { ...list, cards: cardsRes.data };
        })
      );

      setLists(withCards);
    } catch {
      alert("Error loading board data");
    }
  };

  useEffect(() => {
    loadData();
  }, [boardId]);

  const addList = async (e) => {
    e.preventDefault();
    if (!newListTitle.trim()) return;
    try {
      await API.post("/api/list/create", {
        title: newListTitle,
        boardId,
      });
      setNewListTitle("");
      loadData();
    } catch {
      alert("Failed to create list");
    }
  };

  const addCard = async (listId, text) => {
    if (!text.trim()) return;
    try {
      await API.post("/api/card/create", { text, listId });
      loadData();
    } catch {
      alert("Failed to add card");
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // same list movement (frontend only)
    if (source.droppableId === destination.droppableId) {
      const listIndex = lists.findIndex(
        (l) => l._id === source.droppableId
      );
      const list = lists[listIndex];
      const newCards = Array.from(list.cards);
      const [moved] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, moved);

      const newLists = Array.from(lists);
      newLists[listIndex] = { ...list, cards: newCards };
      setLists(newLists);
    } else {
      // moving between lists (frontend only)
      const sourceListIndex = lists.findIndex(
        (l) => l._id === source.droppableId
      );
      const destListIndex = lists.findIndex(
        (l) => l._id === destination.droppableId
      );

      const sourceList = lists[sourceListIndex];
      const destList = lists[destListIndex];

      const sourceCards = Array.from(sourceList.cards);
      const destCards = Array.from(destList.cards);

      const [moved] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, moved);

      const newLists = Array.from(lists);
      newLists[sourceListIndex] = { ...sourceList, cards: sourceCards };
      newLists[destListIndex] = { ...destList, cards: destCards };
      setLists(newLists);
    }
  };

  return (
    <>
      <header className="topbar">
        <h2>Board</h2>
        <Link to="/boards" className="btn-secondary">
          Back to Boards
        </Link>
      </header>

      <div className="boardpage-wrapper">
        <form onSubmit={addList} className="add-list-form">
          <input
            placeholder="New list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button type="submit">Add List</button>
        </form>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="lists-row">
            {lists.map((list) => (
              <Droppable droppableId={list._id} key={list._id}>
                {(provided) => (
                  <div
                    className="list-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h3>{list.title}</h3>

                    {list.cards.map((card, index) => (
                      <Draggable
                        key={card._id}
                        draggableId={card._id}
                        index={index}
                      >
                        {(providedDrag) => (
                          <div
                            className="card-item"
                            ref={providedDrag.innerRef}
                            {...providedDrag.draggableProps}
                            {...providedDrag.dragHandleProps}
                          >
                            {card.text}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}

                    <SmallAddCardForm onAdd={(text) => addCard(list._id, text)} />
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

function SmallAddCardForm({ onAdd }) {
  const [text, setText] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText("");
  };
  return (
    <form onSubmit={submit} className="add-card-form">
      <input
        placeholder="+ Add card"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </form>
  );
}
