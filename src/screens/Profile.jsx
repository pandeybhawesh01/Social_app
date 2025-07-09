import React, { useEffect, useState } from 'react';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Sidebar from '../coponents/sidebar';
import ProfileHeader from '../coponents/ProfileHeader';
import useProfileViewModel from '../viewModels/profileViewModel';
const mockProfile = {
  id: 1,
  name: 'Bhawesh Pandey',
  username: 'bhaweshpandey',
  bio: '3rd Year B.Tech Student | BIT Mesra',
  avatar: 'https://i.pravatar.cc/150?img=2',
  banner: 'https://via.placeholder.com/1200x300/7C3AED/FFFFFF?text=CollegeVerse',
  followers: 120,
  following: 75,
  location: 'Ranchi, India',
  website: 'https://collegeverse.com',
  joinedDate: 'Jul 2025',
};

const mockPosts = [
  {
    id: 1,
    content: "Just finished my Data Structures assignment! The feeling of solving complex algorithms is unmatched. 🔥",
    timestamp: '2h ago',
    likes: 24,
    retweets: 5,
    replies: 8,
    images: []
  },
  {
    id: 2,
    content: "Campus life at BIT Mesra is amazing! The tech fest preparations are in full swing. Can't wait to showcase our projects! #TechFest2025",
    timestamp: '5h ago',
    likes: 45,
    retweets: 12,
    replies: 15,
    images: ['https://via.placeholder.com/400x300/7C3AED/FFFFFF?text=Tech+Fest']
  }
];

export default function Profile() {
  // const [profile] = useState(mockProfile);
  // const [posts] = useState(mockPosts);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { profile, posts, loading, error, fetchProfile, fetchPosts } =
    useProfileViewModel();

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, [loading, profile, posts, error]);  
  console.log("first", profile);
  console.log("posgts ", posts);
  if(loading){
    return(
      <div>
        loading...
      </div>
    )
  }
  console.log("error",error)
  if(error){
    return(
      <div>
        error...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-admin-pattern">
      <Sidebar />
      <div className="flex-1 ml-16 md:ml-64 transition-all duration-300">
        {/*  */}
        <ProfileHeader profile={profile} onEditProfile={() => setIsEditOpen(true)} />

        {/* Tabs Section */}
        <div className="max-w-6xl mx-auto mt-8">
          <div className="bg-containerwhite rounded-t-2xl shadow-lg sticky top-0 z-10">
            <div className="flex border-b border-purple-100">
              {['posts', 'replies', 'media', 'likes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-sm font-medium capitalize transition-all duration-300 hover:bg-purple-50 ${
                    activeTab === tab 
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-containerwhite rounded-b-2xl shadow-lg">
            {activeTab === 'posts' && (
              <div className="divide-y divide-purple-100">
                {posts.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <EditIcon className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
                    <p className="text-gray-600">Share your first thought with the world!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <article key={post.id} className="p-6 hover:bg-purple-50/50 transition-colors">
                      <div className="flex gap-4">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full object-cover border border-purple-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                            <span className="text-gray-500">@{profile.username}</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-500 text-sm">{post.timestamp}</span>
                          </div>
                          <p className="text-gray-800 leading-relaxed mb-3">{post.content}</p>
                          {post.images.length > 0 && (
                            <div className="mb-3 rounded-xl overflow-hidden">
                              <img
                                src={post.images[0]}
                                alt="Post image"
                                className="w-full max-h-80 object-cover"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-8 text-gray-500 text-sm">
                            <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
                              <span>💬</span>
                              <span>{post.replies}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-green-600 transition-colors">
                              <span>🔄</span>
                              <span>{post.retweets}</span>
                            </button>
                            <button className="flex	items-center gap-2 hover:text-red-600 transition-colors">
                              <span>❤️</span>
                              <span>{post.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
            {activeTab !== 'posts' && (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No {activeTab} yet</h3>
                <p className="text-gray-600">Content will appear here when available.</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import ProfileHeader from '../coponents/ProfileHeader';
// import CreatePost from '../coponents/CreatePost';
// import PostCard from '../coponents/PostCard';
// import EditProfileModal from '../coponents/EditProfileModal';

// const mockProfile = {
//   id: 1,
//   name: 'Bhawesh Pandey',
//   username: 'bhaweshpandey',
//   bio: '3rd Year B.Tech Student | BIT Mesra',
//   avatar: 'https://i.pravatar.cc/150?img=2',
//   banner: 'https://via.placeholder.com/800x200.png',
//   followers: 120,
//   following: 75,
//   location: 'Ranchi, India',
//   website: 'https://collegeverse.com',
//   joinedDate: 'Jul 2025',
// };

// export default function Profile() {
//   const [profile, setProfile] = useState(mockProfile);
//   const [posts, setPosts] = useState([]);
//   const [activeTab, setActiveTab] = useState('posts');
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const handleCreatePost = (content, images) => {
//     const newPost = {
//       id: Date.now(),
//       content,
//       timestamp: 'Just now',
//       likes: 0,
//       retweets: 0,
//       replies: 0,
//       images,
//     };
//     setPosts([newPost, ...posts]);
//   };

//   const handleSaveProfile = (upd) => {
//     setProfile(upd);
//     setIsEditOpen(false);
//   };

//   return (
//     <div className=" flex min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto bg-white min-h-screen">
//         <ProfileHeader profile={profile} onEditProfile={() => setIsEditOpen(true)} />

//         {/* Tabs */}
//         <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
//           <div className="flex">
//             {['posts', 'replies', 'media', 'likes'].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`flex-1 py-4 px-6 text-sm font-medium capitalize transition-colors hover:bg-gray-50 ${
//                   activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Content */}
//         <div className="divide-y divide-gray-100">
//           {activeTab === 'posts' && (
//             <>
//               <CreatePost onCreatePost={handleCreatePost} />
//               {posts.map((p) => (
//                 <PostCard key={p.id} post={p} user={profile} />
//               ))}
//             </>
//           )}
//           {activeTab !== 'posts' && (
//             <div className="p-8 text-center text-gray-500">
//               <p>No {activeTab} yet.</p>
//             </div>
//           )}
//         </div>

//         <EditProfileModal
//           isOpen={isEditOpen}
//           onClose={() => setIsEditOpen(false)}
//           profile={profile}
//           onSave={handleSaveProfile}
//         />
//       </div>
//     </div>
//   );
// }
