import React, { useState, useRef } from 'react';
import { Question, Comment, Attachment } from '../types/assessment';
import { useAuth } from '../auth/AuthContext';
import { X, Paperclip, Download, Trash2, Edit2, Check, XCircle, AlertCircle } from 'lucide-react';

interface QuestionDetailsProps {
  question: Question;
  onClose: () => void;
  onUpdate: (questionId: string, updates: Partial<Question>) => void;
}

export const QuestionDetails: React.FC<QuestionDetailsProps> = ({ question, onClose, onUpdate }) => {
  const [newComment, setNewComment] = useState('');
  const [localQuestion, setLocalQuestion] = useState<Question>(question);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: crypto.randomUUID(),
      text: newComment,
      createdAt: new Date().toISOString(),
      createdBy: user.username
    };

    const updatedQuestion = {
      ...localQuestion,
      comments: [...localQuestion.comments, comment]
    };

    setLocalQuestion(updatedQuestion);
    onUpdate(question.id, {
      comments: updatedQuestion.comments
    });
    setNewComment('');
  };

  const handleDeleteComment = (commentId: string) => {
    const updatedQuestion = {
      ...localQuestion,
      comments: localQuestion.comments.filter(c => c.id !== commentId)
    };

    setLocalQuestion(updatedQuestion);
    onUpdate(question.id, {
      comments: updatedQuestion.comments
    });
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.text);
  };

  const handleSaveComment = (commentId: string) => {
    if (!editedCommentText.trim()) return;

    const updatedQuestion = {
      ...localQuestion,
      comments: localQuestion.comments.map(c =>
        c.id === commentId
          ? { ...c, text: editedCommentText }
          : c
      )
    };

    setLocalQuestion(updatedQuestion);
    onUpdate(question.id, {
      comments: updatedQuestion.comments
    });
    setEditingCommentId(null);
    setEditedCommentText('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      
      const attachment: Attachment = {
        id: crypto.randomUUID(),
        fileName: file.name,
        fileType: file.type,
        fileData: base64String,
        uploadDate: new Date().toISOString()
      };

      const updatedQuestion = {
        ...localQuestion,
        attachments: [...localQuestion.attachments, attachment]
      };

      setLocalQuestion(updatedQuestion);
      onUpdate(question.id, {
        attachments: updatedQuestion.attachments
      });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteAttachment = (attachmentId: string) => {
    const updatedQuestion = {
      ...localQuestion,
      attachments: localQuestion.attachments.filter(a => a.id !== attachmentId)
    };

    setLocalQuestion(updatedQuestion);
    onUpdate(question.id, {
      attachments: updatedQuestion.attachments
    });
  };

  const handleDownload = (attachment: Attachment) => {
    const link = document.createElement('a');
    link.href = attachment.fileData;
    link.download = attachment.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Update local state when question prop changes
  React.useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {localQuestion.category}
              </span>
              <span className="text-sm font-medium px-2 py-1 bg-gray-100 text-gray-800 rounded">
                {localQuestion.id}
              </span>
              {localQuestion.isUncertain && (
                <span className="text-sm font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Unsicher
                </span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{localQuestion.text}</h2>
            {localQuestion.description && (
              <p className="mt-2 text-gray-600 text-sm">{localQuestion.description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Comments Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <div className="space-y-4 mb-4">
              {localQuestion.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-900">{comment.createdBy}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                      {comment.createdBy === user?.username && (
                        <div className="flex gap-2">
                          {editingCommentId === comment.id ? (
                            <>
                              <button
                                onClick={() => handleSaveComment(comment.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setEditingCommentId(null)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEditComment(comment)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {editingCommentId === comment.id ? (
                    <input
                      type="text"
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      autoFocus
                    />
                  ) : (
                    <p className="text-gray-700">{comment.text}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded-md border border-gray-300 px-3 py-2"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Attachments</h3>
            <div className="space-y-4 mb-4">
              {localQuestion.attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900">{attachment.fileName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(attachment.uploadDate).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDownload(attachment)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Download className="h-5 w-5" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteAttachment(attachment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Paperclip className="h-5 w-5 mr-2" />
                Upload Attachment
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};