import React from 'react'
import { deleteJob } from '../services/axios'
export default function AdminDeleteJob({ jobId, onDelete, onClose }) {
    const handleDelete = async () => {
        try {
            await deleteJob(jobId);
            onDelete();
            onClose();
        } catch (error) {
            console.error('Error deleting job', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                <h2 className="text-lg font-bold mb-4">
                    Confirm Delete
                </h2>

                <p className="mb-6 text-gray-600">
                    Are you sure you want to delete this job?
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={handleDelete}
                        className="flex-1 bg-red-600 text-white py-2 rounded"
                    >
                        Delete
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
