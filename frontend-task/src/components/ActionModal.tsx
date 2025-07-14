'use client';

import React from 'react';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'done';
}

interface TaskActionModalProps {
  task: Task;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskActionModal({
  task,
  onClose,
  onEdit,
  onDelete,
}: TaskActionModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖
        </button>

        <h3 className="text-lg font-semibold text-center mb-4 text-[#424242]">
          {task.title}
        </h3>

        <div className="flex flex-col gap-3">
          <button
            className="bg-[#424242] text-white py-2 rounded"
            onClick={() => onEdit(task)} 
          >
            Edit
          </button>

          <button
            className="bg-white border border-[#424242] text-[#424242] py-2 rounded"
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
          >
            Delete
          </button>

          <button
            className="bg-white text-[#424242] py-2 rounded"
            onClick={onClose}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
