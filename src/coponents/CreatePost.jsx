import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export default function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const characterLimit = 280;
  const remainingChars = characterLimit - content.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCreatePost(content.trim(), []);
    setContent('');
    setIsExpanded(false);
  };

  return (
    <div className="border-b border-gray-100 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0" />
          <div className="flex-1">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What's happening?"
              className="resize-none border-none text-xl placeholder:text-gray-500 focus:ring-0 p-0"
              rows={isExpanded ? 4 : 3}
              maxLength={characterLimit}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="flex items-center justify-between ml-15">
            <div className="flex items-center gap-4">
              <div className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!content.trim() || remainingChars < 0}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6"
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
