import React from 'react';
import Sidebar from '../coponents/sidebar';

/**
 * PostsList Component
 * Displays a list of posts similar in style to LinkedIn feed using React + Tailwind CSS.
 *
 * Instructions:
 * - Ensure Tailwind CSS is configured in your React project.
 * - Add Material Icons font in your public/index.html:
 *   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
 */

const posts = [
  {
    id: 1,
    author: {
      name: 'Alice Johnson',
      title: 'Senior Frontend Developer at TechCorp',
      avatarUrl:
        'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c0fd4cc-5af4-4ac5-a6fc-e1d9f2743c5e.png',
    },
    timestamp: '2h ago',
    content:
      'Excited to share that our team just launched a new feature in the weather app that enhances location detection and forecasts!',
    imageUrl:
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9b03deaa-635d-45c6-b390-250f6184d3be.png',
    likes: 84,
    comments: 12,
    shares: 7,
  },
  {
    id: 2,
    author: {
      name: 'Michael Lee',
      title: 'Product Manager at WeatherVision',
      avatarUrl:
        'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e9a6e9c8-f85d-4da9-84c2-11005a0559fb.png',
    },
    timestamp: '5h ago',
    content:
      'Our latest update introduces real-time radar maps with enhanced zoom and pan controls. Check it out in the app!',
    imageUrl: null,
    likes: 102,
    comments: 23,
    shares: 15,
  },
  {
    id: 3,
    author: {
      name: 'Sara Kim',
      title: 'UX Designer',
      avatarUrl:
        'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1dc807cb-e195-4fbc-a3ec-a3375d3cbffb.png',
    },
    timestamp: '1d ago',
    content:
      'Innovating with glass morphism and micro-animations to make the weather app more engaging and beautiful.',
    imageUrl:
      'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a5651914-8424-449a-8ce9-071d9e62e3b5.png',
    likes: 150,
    comments: 30,
    shares: 20,
  },
];

function PostsList() {
  return (
    <div>
    <Sidebar/>
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Post Feed</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white backdrop-blur-sm bg-opacity-50 rounded-lg border border-gray-200 shadow-md p-6"
              aria-label={`Post by ${post.author.name}`}
            >
              {/* Post header */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.author.avatarUrl}
                  alt={`Avatar of ${post.author.name}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray-900 truncate">
                    {post.author.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {post.author.title}
                  </p>
                </div>
                <time
                  className="text-sm text-gray-400 whitespace-nowrap"
                  dateTime={new Date().toISOString()}
                  aria-label={`Posted ${post.timestamp}`}
                >
                  {post.timestamp}
                </time>
              </div>

              {/* Post content */}
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Post image (optional) */}
              {post.imageUrl && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={post.imageUrl}
                    alt="Post related visual content"
                    className="w-full object-cover max-h-80 mx-auto"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // prevent looping
                      e.currentTarget.src =
                        'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e9f285e-5fa0-4bba-903b-5b99db8bffb7.png';
                    }}
                  />
                </div>
              )}

              {/* Post actions */}
              <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-gray-500 text-sm select-none">
                <button
                  className="flex items-center space-x-1 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  aria-label="Like post"
                  type="button"
                >
                  <span className="material-icons">thumb_up</span>
                  <span>{post.likes}</span>
                </button>
                <button
                  className="flex items-center space-x-1 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  aria-label="Comment on post"
                  type="button"
                >
                  <span className="material-icons">chat_bubble_outline</span>
                  <span>{post.comments}</span>
                </button>
                <button
                  className="flex items-center space-x-1 hover:text-blue-600 focus:text-blue-600 focus:outline-none"
                  aria-label="Share post"
                  type="button"
                >
                  <span className="material-icons">share</span>
                  <span>{post.shares}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default PostsList;


// import React, { useContext } from 'react';
// import Sidebar from '../coponents/sidebar';
// import { AppContext } from '../contex/AppContex';
// import Navbar from '../coponents/navbar';
// import { Avatar } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ShareIcon from '@mui/icons-material/Share';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

// const dummyPosts = [
//    {
//     id: 1,
//     user: {
//       name: 'Alice Johnson',
//       avatar: 'https://i.pravatar.cc/150?img=1'
//     },
//     content: 'Excited to start my journey with CollegeVerse! Loving the new platform already!',
//     timestamp: '2h ago'
//   },
//   {
//     id: 2,
//     user: {
//       name: 'Bhawesh Pandey',
//       avatar: 'https://i.pravatar.cc/150?img=2'
//     },
//     content: 'Working on a new feature for CollegeVerse — stay tuned for a reel update soon! 🎥',
//     timestamp: '4h ago'
//   },
//   {
//     id: 3,
//     user: {
//       name: 'Sarthak Mehta',
//       avatar: 'https://i.pravatar.cc/150?img=3'
//     },
//     content: 'Just finished my first post on CollegeVerse. What an awesome experience so far! 🚀',
//     timestamp: '6h ago'
//   },
//   {
//     id: 4,
//     user: {
//       name: 'Neha Singh',
//       avatar: 'https://i.pravatar.cc/150?img=4'
//     },
//     content: 'Is anyone up for a coding jam this weekend? Let’s connect through CollegeVerse! 💻',
//     timestamp: '8h ago'
//   },
//   {
//     id: 5,
//     user: {
//       name: 'Ravi Verma',
//       avatar: 'https://i.pravatar.cc/150?img=5'
//     },
//     content: 'Really impressed with the clean UI of CollegeVerse. Great job devs! 👏',
//     timestamp: '10h ago'
//   },
//   {
//     id: 6,
//     user: {
//       name: 'Priya Sharma',
//       avatar: 'https://i.pravatar.cc/150?img=6'
//     },
//     content: 'Looking forward to see what everyone’s working on. Love the community vibe here ✨',
//     timestamp: '12h ago'
//   },
//   {
//     id: 7,
//     user: {
//       name: 'Mohit Rathi',
//       avatar: 'https://i.pravatar.cc/150?img=7'
//     },
//     content: 'Just discovered some awesome project ideas on CollegeVerse. Feeling inspired! 🔥',
//     timestamp: '14h ago'
//   }
// ];

// function Dashboard() {
//   const { userData } = useContext(AppContext);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 ml-64">
//         <Navbar />
//         <div className="p-8 bg-admin-pattern min-h-screen">
//           <h2 className="text-3xl font-semibold text-gray mb-4">Dashboard</h2>
//           <h1 className='text-xl sm:text-3xl font-medium mb-6'>Hey {userData ? userData.name : 'User'} 👋</h1>

//           {/* Posts Section */}
//           <div className="flex flex-col gap-6">
//             {dummyPosts.map(post => (
//               <div key={post.id} className="bg-whitebg shadow-md p-6 rounded-2xl">
//                 <div className="flex items-center gap-4 mb-2">
//                   <Avatar src={post.user.avatar} alt={post.user.name} />
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray">{post.user.name}</h3>
//                     <p className="text-sm text-moderategray">{post.timestamp}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray text-base mb-4">{post.content}</p>
//                 <div className="flex items-center justify-around text-moderategray text-sm">
//                   <button className="flex items-center gap-1 hover:text-blue-500"><FavoriteBorderIcon fontSize="small" /> Like</button>
//                   <button className="flex items-center gap-1 hover:text-blue-500"><ChatBubbleOutlineIcon fontSize="small" /> Comment</button>
//                   <button className="flex items-center gap-1 hover:text-blue-500"><ShareIcon fontSize="small" /> Share</button>
//                   <button className="flex items-center gap-1 hover:text-blue-500"><BookmarkBorderIcon fontSize="small" /> Save</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
