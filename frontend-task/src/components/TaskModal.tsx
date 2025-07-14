'use client';

import React from 'react';

interface TaskModalProps {
  title: string;
  status: 'pending' | 'done';
  setTitle: (val: string) => void;
  setStatus: (val: 'pending' | 'done') => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function TaskModal({
  title,
  status,
  setTitle,
  setStatus,
  onClose,
  onSubmit,
}: TaskModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center text-[#424242]">
          Tambah Task
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              placeholder="example: task 1"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'pending' | 'done')}
              className="w-full border border-gray-300 rounded px-4 py-2 mt-1"
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-[#424242] px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#424242] text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
