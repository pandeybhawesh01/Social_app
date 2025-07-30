import React from 'react';

export default function PostCard({ post, user }) {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-gray-900">{user.name}</span>
            <span className="text-gray-500">@{user.username}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">{post.timestamp}</span>
          </div>

          {/* Content */}
          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap mb-3">
            {post.content}
          </p>

          {/* Images */}
          {post.images?.length > 0 && (
            <div className="mb-3 grid gap-2">
              {post.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Post media ${i + 1}`}
                  className="rounded-xl max-w-full h-auto border border-gray-200"
                />
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md text-gray-500 text-sm">
            {/* replies */}
            <button className="flex items-center gap-2 hover:text-blue-600 transition p-2 -m-2 rounded-full hover:bg-blue-50">
              <span className="material-icons">chat_bubble_outline</span>
              <span>{post.replies}</span>
            </button>
            {/* retweet */}
            <button className="flex items-center gap-2 hover:text-green-600 transition p-2 -m-2 rounded-full hover:bg-green-50">
              <span className="material-icons">autorenew</span>
              <span>{post.retweets}</span>
            </button>
            {/* like */}
            <button className="flex items-center gap-2 hover:text-red-600 transition p-2 -m-2 rounded-full hover:bg-red-50">
              <span className="material-icons">favorite_border</span>
              <span>{post.likes}</span>
            </button>
            {/* share */}
            <button className="p-2 -m-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition">
              <span className="material-icons">share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
