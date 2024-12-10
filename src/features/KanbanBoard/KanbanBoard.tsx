import { DragDropContext, DragUpdate, Droppable, DropResult } from "react-beautiful-dnd";
import { Task, TaskPriority, TaskStatus } from "../../types/Task";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore, useTaskStore, useTeamStore } from "@/stores";
import CreateTaskModal from "./CreateTaskModal";
import { TaskCard } from "./TaskCard";

export type ColumnType = {
  id: string;
  title: string;
  subheading: string;
  cards: Task[];
  icon: string;
};

type BoardType = {
  columns: ColumnType[];
};

const initialBoard: BoardType = {
  columns: [
    {
      id: "0",
      title: "Backlog",
      subheading: "Tasks that are not yet started",
      icon: "mdi:tray-full",
      cards: [],
    },
    {
      id: "1",
      title: "Todo",
      subheading: "Tasks ready to be worked on",
      icon: "mdi:clipboard-text-clock",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      subheading: "This is actively being worked on",
      icon: "mdi:progress-clock",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      subheading: "Tasks that are completed",
      icon: "mdi:checkbox-marked-circle",
      cards: [],
    },
  ],
};

const getEmptyBoard = () => ({
  columns: initialBoard.columns.map(col => ({
    ...col,
    cards: []
  }))
});

const KanbanBoard = () => {
  const [board, setBoard] = useState<BoardType>(getEmptyBoard());
  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [placeholderColumnId, setPlaceholderColumnId] = useState<string | null>(null);
  const { teamId } = useParams<{ teamId: string }>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [initialTaskStatus, setInitialTaskStatus] = useState<TaskStatus>(TaskStatus.TODO);

  const { tasks, isLoading, fetchAllTasksInTeam, updateTask, createTask } = useTaskStore();
  const { token, user } = useAuthStore();
  const { teamMembers } = useTeamStore();

  useEffect(() => {
    if (teamId && token) {
      fetchAllTasksInTeam(parseInt(teamId), token);
    }
  }, [teamId, token, fetchAllTasksInTeam]);

  // Update board when tasks change
  useEffect(() => {
    const newBoard = getEmptyBoard(); // Start with a fresh empty board
    
    tasks.forEach(task => {
      const columnMap: Record<TaskStatus, string> = {
        BACKLOG: "0",
        TODO: "1",
        IN_PROGRESS: "2",
        DONE: "3"
      };
      
      const columnId = columnMap[task.status];
      const column = newBoard.columns.find(col => col.id === columnId);
      
      if (column) {
        column.cards.push(task);
      }
    });

    setBoard(newBoard);
  }, [tasks]);

  const handleCreateTask = async (task: Partial<Task>) => {
    if (!teamId || !token || !user) return;
    
    await createTask({
      teamId: parseInt(teamId),
      name: task.name || '',
      description: task.description,
      status: task.status || TaskStatus.TODO,
      priority: task.priority || TaskPriority.NO_PRIORITY,
      assignedUser: task.assignedUser!,
      token
    });
  };

  const handleOpenCreateModal = (status: TaskStatus) => {
    setInitialTaskStatus(status);
    setShowCreateModal(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceColumn = board.columns.find((column) => column.id === source.droppableId);
    const destinationColumn = board.columns.find((column) => column.id === destination.droppableId);

    if (!sourceColumn || !destinationColumn) return;

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    setBoard(prevBoard => ({
      ...prevBoard,
      columns: [...prevBoard.columns]
    }));

    const statusMap: Record<string, TaskStatus> = {
      "0": TaskStatus.BACKLOG,
      "1": TaskStatus.TODO,
      "2": TaskStatus.IN_PROGRESS,
      "3": TaskStatus.DONE
    };

    if (statusMap[destinationColumn.id] && token && teamId) {
      await updateTask({
        taskId: movedCard.id,
        task: { status: statusMap[destinationColumn.id] },
        teamId: parseInt(teamId),
        token
      });
    }

    setPlaceholderIndex(null);
    setPlaceholderColumnId(null);
  };

  const onDragUpdate = (update: DragUpdate) => {
    const { destination } = update;
    if (destination) {
      setPlaceholderIndex(destination.index);
      setPlaceholderColumnId(destination.droppableId);
    } else {
      setPlaceholderIndex(null);
      setPlaceholderColumnId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-400">
          <Icon icon="mdi:loading" className="h-6 w-6 animate-spin" />
          <span>Loading tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-x-auto bg-[#0f1219] p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Task Board</h1>
        <p className="mt-1 text-gray-400">Manage and track your team's tasks</p>
      </div>

      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
        <div className="flex min-h-[calc(100vh-12rem)] space-x-4">
          {board.columns.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              <div className="mb-3 flex items-center space-x-2">
                <Icon icon={column.icon} className="h-5 w-5 text-gray-400" />
                <h2 className="font-medium text-white">{column.title}</h2>
                <span className="ml-2 rounded-full bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
                  {column.cards.length}
                </span>
              </div>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="h-full rounded-lg border border-gray-800 bg-[#1a1f2e] p-4"
                  >
                    <div className="space-y-4">
                      {column.cards.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                      ))}
                      {provided.placeholder}
                    </div>
                    
                    {column.cards.length === 0 && (
                      <button 
                        onClick={() => handleOpenCreateModal(
                          column.id === "0" ? TaskStatus.BACKLOG :
                          column.id === "1" ? TaskStatus.TODO :
                          column.id === "2" ? TaskStatus.IN_PROGRESS :
                          TaskStatus.DONE
                        )}
                        className="flex h-20 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-700 p-4 text-center text-sm text-gray-500 hover:border-blue-500 hover:text-blue-500"
                      >
                        <Icon icon="mdi:plus" className="mr-2 h-5 w-5" />
                        Add task
                      </button>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateTask={handleCreateTask}
        initialStatus={initialTaskStatus}
        teamMembers={teamMembers}
      />
    </div>
  );
};

export default KanbanBoard;