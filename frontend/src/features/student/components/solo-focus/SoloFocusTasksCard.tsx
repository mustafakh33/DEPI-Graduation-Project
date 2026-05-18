import { Check, Plus, X } from "lucide-react";
import type { SoloStudyTask } from "../../types/student.types";
import SoloFocusGlassCard from "./SoloFocusGlassCard";

interface SoloFocusTasksCardProps {
  tasks: SoloStudyTask[];
  newTask: string;
  onNewTaskChange: (value: string) => void;
  onAddTask: () => void;
  onToggleTask: (taskId: number) => void;
  onRemoveTask: (taskId: number) => void;
}

const SoloFocusTasksCard = ({
  tasks,
  newTask,
  onNewTaskChange,
  onAddTask,
  onToggleTask,
  onRemoveTask,
}: SoloFocusTasksCardProps) => {
  return (
    <SoloFocusGlassCard>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
        Session Goals
      </p>

      <div className="mt-3 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5"
          >
            <button
              type="button"
              onClick={() => onToggleTask(task.id)}
              className="flex size-5 shrink-0 items-center justify-center rounded-md border border-cyan-300/60"
            >
              {task.isCompleted ? <Check className="size-3" /> : null}
            </button>

            <span
              className={`flex-1 text-xs ${
                task.isCompleted ? "text-slate-400 line-through" : "text-white"
              }`}
            >
              {task.title}
            </span>

            <button
              type="button"
              onClick={() => onRemoveTask(task.id)}
              className="text-slate-300 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={newTask}
          onChange={(event) => onNewTaskChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onAddTask();
            }
          }}
          placeholder="Add task"
          className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-300 focus:border-cyan-300"
        />

        <button
          type="button"
          onClick={onAddTask}
          className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-cyan-400 hover:text-slate-950"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </SoloFocusGlassCard>
  );
};

export default SoloFocusTasksCard;