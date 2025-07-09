import React, { useContext, useEffect, useState } from 'react';
// import Sidebar from './Sidebar';
import Sidebar from '../coponents/sidebar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
// import { AppContext } from '../context/AppContext';
import { AppContext } from '../contex/AppContex';
import axios from 'axios';
import { cn } from '../lib/utils';

function PostsList() {
  const { userData, backendUrl } = useContext(AppContext);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [expandedPostUserId, setExpandedPostUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commenttext, setCommenttext] = useState("");
  const [expandedContentPostId, setExpandedContentPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/post/allUsersPosts`);
      if (data.success) {
        setPosts(data.posts);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error getting all the posts");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const comment = async (comment) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/post/comment/${expandedPostUserId}/${expandedPostId}`,
        { comment }
      );
      if (data.success) {
        getPosts();
        setCommenttext("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error commenting on post");
      console.log(err);
    }
  };

  const likePost = async (likePostId, likePostUserId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/post/like-post/${likePostUserId}/${likePostId}`
      );
      if (data.success) {
        getPosts();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error liking post");
      console.log(err);
    }
  };

  const toggleExpanded = (postId) => {
    setExpandedContentPostId((prev) => (prev === postId ? null : postId));
  };

  const truncateText = (text, maxChars = 150) => {
    if (text.length <= maxChars) return text;
    return text.slice(0, maxChars).trim() + '...';
  };

  const toggleCommentSection = (id, postUserId) => {
    setExpandedPostId((prev) => (prev === id ? null : id));
    setExpandedPostUserId((prev) => (prev === postUserId ? null : postUserId));
  };

  const onShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'CollegeVerse Post', url: window.location.href });
    } else {
      alert('Share feature is not supported in your browser.');
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffInSeconds = Math.floor((now - postedDate) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postedDate.toLocaleDateString();
  };

  const stats = [
    { label: 'Active Students', value: '12.5K', icon: PeopleIcon, color: 'text-blue-600' },
    { label: 'Universities', value: '150+', icon: TrendingUpIcon, color: 'text-green-600' },
    { label: 'Posts Today', value: '2.3K', icon: DescriptionIcon, color: 'text-purple-600' },
    { label: 'Connections Made', value: '45K', icon: AutoGraphIcon, color: 'text-orange-600' },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Sidebar />
      <div className="flex-1 ml-16 lg:ml-64 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent mb-4">
              CollegeVerse
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Where students connect, create, and thrive together
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className={cn("w-8 h-8", stat.color)} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12">
                <DescriptionIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
              </div>
            ) : (
              posts.map((post) => (
                <article
                  key={post.post._id}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden"
                >
                  <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {post.owner.profilePic ? (
                          <img
                            src={post.owner.profilePic}
                            alt={`${post.owner.username} avatar`}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                            <span className="text-white text-lg font-semibold">
                              {post.owner.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-lg font-semibold text-gray-900 truncate">{post.owner.username}</p>
                          <p className="text-sm text-gray-500 truncate">{post.post.college}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
                          <p className="text-sm font-medium text-purple-700">{post.post.type}</p>
                        </div>
                        <time className="text-xs text-gray-500">
                          {post.post.createdAt ? getTimeAgo(post.post.createdAt) : 'Just now'}
                        </time>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-4">
                    <div className="text-gray-800 text-base leading-relaxed">
                      {expandedContentPostId === post.post._id ? (
                        <>
                          <p>{post.post.content}</p>
                          <button
                            onClick={() => toggleExpanded(post.post._id)}
                            className="text-purple-600 hover:text-purple-700 font-medium text-sm mt-2 transition-colors"
                          >Show less</button>
                        </>
                      ) : (
                        <p>
                          {truncateText(post.post.content, 150)}
                          {post.post.content.length > 150 && (
                            <button
                              onClick={() => toggleExpanded(post.post._id)}
                              className="text-purple-600 hover:text-purple-700 font-medium text-sm ml-2 transition-colors"
                            >Read more</button>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {post.post.image && (
                    <div className="px-6 pb-4">
                      <div className="rounded-xl overflow-hidden border border-gray-200">
                        <img
                          src={post.post.image}
                          alt="Post visual"
                          className="w-full object-cover max-h-96"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://storage.googleapis.com/…/image/1e9f285e-5fa0-4bba-903b-5b99db8bffb7.png';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => likePost(post.post._id, post._id)}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                          post.post.likes.some(like => like.email === userData.email)
                            ? "text-red-600 bg-red-50 hover:bg-red-100"
                            : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                        )}
                      >
                        {post.post.likes.some(like => like.email === userData.email) ? (
                          <FavoriteIcon size={20} />
                        ) : (
                          <FavoriteBorderIcon size={20} />
                        )}
                        <span className="font-medium">{post.post.likes.length}</span>
                      </button>
                      <button
                        onClick={() => toggleCommentSection(post.post._id, post._id)}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        <ChatBubbleOutlineIcon size={20} />
                        <span className="font-medium">{post.post.comments.length}</span>
                      </button>
                      <button
                        onClick={onShare}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                      >
                        <ShareIcon size={20} />
                        <span className="font-medium">Share</span>
                      </button>
                    </div>
                  </div>
                  {expandedPostId === post.post._id && (
                    <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                      <div className="flex items-center space-x-3 mb-4">
                        <img
                          src="https://i.pravatar.cc/100"
                          alt="You"
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-200"
                        />
                        <div className="flex-1 flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Write a comment..."
                            value={commenttext}
                            onChange={(e) => setCommenttext(e.target.value)}
                            className="flex-1 border border-gray-200 bg-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all"
                          />
                          <button
                            onClick={() => { comment(commenttext); setCommenttext(""); }}
                            disabled={!commenttext.trim()}
                            className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            <SendIcon size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {post.post.comments.length === 0 ? (
                          <p className="text-center text-gray-500 py-4">
                            No comments yet. Be the first to comment!
                          </p>
                        ) : (
                          post.post.comments.map((comment, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              {comment.user.profilePic ? (
                                <img
                                  src={comment.user.profilePic}
                                  alt={comment.user.username}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                  <span className="text-white text-xs font-semibold">
                                    {comment.user.username.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1 bg-white rounded-lg px-4 py-2 shadow-sm">
                                <div className="flex justify-between items-start mb-1">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {comment.user.username}
                                  </p>
                                  <span className="text-xs text-gray-500">
                                    {getTimeAgo(comment.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{comment.comment}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsList;

// import React, { useContext, useEffect, useState } from 'react';
// import Sidebar from '../coponents/sidebar';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
// import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
// import { AppContext } from '../contex/AppContex';
// import axios from 'axios';
// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

// function PostsList() {
//   const { userData, backendUrl } = useContext(AppContext);
//   const [expandedPostId, setExpandedPostId] = useState(null);
//   const [expandedPostUserId, setExpandedPostUserId] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [commenttext, setCommenttext] = useState("");
//   const [expandedContentPostId, setExpandedContentPostId] = useState(null);

//   useEffect(() => {
//     getPosts();
//   }, []);

//   const getPosts = async () => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/post/allUsersPosts`);
//       if (data.success) {
//         setPosts(data.posts);
//         console.log(data.posts);
//       }
//       else {
//         alert(data.message)
//       }
//     }
//     catch (err) {
//       alert("error gtting all the posts");
//       console.log(err)
//     }
//   }
//   const comment = async (comment) => {
//     console.log(expandedPostId, comment, posts._id
//     );
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/post/comment/${expandedPostUserId}/${expandedPostId}`, { comment });
//       console.log(data)
//       if (data.success) {
//         getPosts();
//         setCommenttext("");
//       }
//       else {
//         alert(data.message);
//       }
//     }
//     catch (err) {
//       alert("error commenting on post");
//       console.log(err);
//     }
//   }

//   const likePost = async (likePostId, likePostUserId) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/post/like-post/${likePostUserId}/${likePostId}`);
//       if (data.success) {
//         getPosts();
//       }
//       else {
//         alert(data.message);
//       }
//     }
//     catch (err) {
//       alert("error liking post");
//       console.log(err);
//     }
//   }

//   const toggleExpanded = (postId) => {
//     setExpandedContentPostId(prev => prev === postId ? null : postId);
//   };
//   const truncateText = (text, maxChars = 150) => {
//     if (text.length <= maxChars) return text;
//     return text.slice(0, maxChars).trim() + '...';
//   };

//   const toggleCommentSection = (id, postUserId) => {
//     setExpandedPostId(prev => (prev === id ? null : id));
//     setExpandedPostUserId(prev => (prev === postUserId ? null : postUserId));
//   };

//   const onShare = () => {
//     if (navigator.share) {
//       navigator.share({ title: 'CollegeVerse Post', url: window.location.href });
//     } else {
//       alert('Share feature is not supported in your browser.');
//     }
//   };
//   const getTimeAgo = (dateString) => {
//     const now = new Date();
//     const postedDate = new Date(dateString);
//     const diffInSeconds = Math.floor((now - postedDate) / 1000);

//     if (diffInSeconds < 60) return 'Just now';
//     if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//     if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//     if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
//     // For older posts, show date
//     return postedDate.toLocaleDateString();
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1 min-h-screen bg-admin-pattern py-10 px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <h1
//             className="text-5xl sm:text-6xl font-extrabold leading-tight sm:leading-[1.2] animate-pop text-transparent bg-clip-text inline-block"
//             style={{
//               backgroundImage: 'linear-gradient(to right, var(--bg-blue-green), var(--hover-bg-blue-green-hover))',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//             }}
//           >
//             CollegeVerse
//           </h1>
//           <p className="mt-4 text-xl sm:text-2xl text-moderategray font-medium">
//             Where students connect, create, and thrive together
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 px-32">
//           {[
//             { label: 'Active Students', value: '12.5K' },
//             { label: 'Universities', value: '150+' },
//             { label: 'Posts Today', value: '2.3K' },
//             { label: 'Connections Made', value: '45K' },
//           ].map((stat, idx) => (
//             <div
//               key={idx}
//               className="p-4 text-center rounded-lg bg-containerwhite shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-grayhover"
//             >
//               <div className="text-3xl font-bold" style={{ color: 'var(--bg-blue-green)' }}>
//                 {stat.value}
//               </div>
//               <div className="text-lg text-moderategray">{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Posts */}
//         <div className="max-w-4xl mx-auto space-y-8">
//           {posts.map((post) => (
//             <article
//               key={post.post._id}
//               className="p-6 rounded-lg bg-containerwhite shadow-md border border-amber-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl backdrop-blur-sm hover:border-[var(--hover-border-grayhover)] hover:border-1"
//               aria-label={`Post by ${post.owner.username}`}
//             >
//               {/* Header */}
//               <div className="flex items-center space-x-4 mb-4">
//                 {post.owner.profilePic ? (
//                   <img src={post.owner.profilePic} alt={`${post.owner.username} avatar`} className="w-12 h-12 rounded-full object-cover" />) :
//                   (<div className="w-12 h-12 rounded-full bg-blue-green flex items-center justify-center">
//                     <span className="text-white text-lg font-semibold">{post.owner.username.charAt(0).toUpperCase()}</span>
//                   </div>)}
//                 <div className="flex-1 min-w-0">
//                   <p className="text-lg font-semibold text-gray truncate">{post.owner.username}</p>
//                   <p className="text-sm text-lightgray truncate">{post.post.college}</p>
//                 </div>
//                 <div className='flex-col items-center justify-center text-center'>
//                   <div className='bg-admin-pattern p-1 rounded-full px-2'>
//                     <p className="text-md font-semibold text-gray truncate">{post.post.type}</p>
//                   </div>
//                   <time className="text-sm text-lightgray" dateTime={new Date().toISOString()}>
//                     {post.post.createdAt ? getTimeAgo(post.post.createdAt) : 'Just now'}
//                   </time>

//                 </div>
//               </div>

//               {/* Content */}
//               <div className="text-gray text-base leading-relaxed mb-4">
//                 {expandedContentPostId === post.post._id ? (
//                   <>
//                     <p>{post.post.content}</p>
//                     <button
//                       onClick={() => toggleExpanded(post.post._id)}
//                       className="text-moderategray font-small ml-1 cursor-pointer"
//                     >
//                       Show less
//                     </button>
//                   </>
//                 ) : (
//                   <p>
//                     {truncateText(post.post.content, 150)}
//                     {post.post.content.length > 150 && (
//                       <button
//                         onClick={() => toggleExpanded(post.post._id)}
//                         className="font-small text-moderategray ml-1 cursor-pointer"
//                       >
//                         Read more
//                       </button>
//                     )}
//                   </p>
//                 )}
//               </div>
//               {/* Image */}
//               {post.post.image && (
//                 <div className="mb-4 rounded-lg overflow-hidden border border-bordergray">
//                   <img
//                     src={post.post.image}
//                     alt="Post visual"
//                     className="w-full object-cover max-h-80 mx-auto"
//                     onError={(e) => {
//                       e.currentTarget.onerror = null;
//                       e.currentTarget.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e9f285e-5fa0-4bba-903b-5b99db8bffb7.png';
//                     }}
//                   />
//                 </div>
//               )}

//               {/* Actions */}
//               <div className="flex justify-between items-center pt-3 border-t border-bordergray text-lightgray text-sm select-none">
//                 <button onClick={() => likePost(post.post._id, post._id)}
//                   className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }}
//                 >
//                   {post.post.likes.some(like => like.email === userData.email) ? (<FavoriteSharpIcon />) : (<FavoriteBorderOutlinedIcon />)}

//                   <span>{post.post.likes.length}</span>
//                 </button>

//                 <button
//                   className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }}
//                   onClick={() => toggleCommentSection(post.post._id, post._id)}
//                 >
//                   <CommentRoundedIcon />
//                   <span>{post.post.comments.length}</span>
//                 </button>

//                 <button className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }} onClick={onShare}>
//                   <ShareRoundedIcon />
//                   <span>Share</span>
//                 </button>
//               </div>

//               {/* Comment Section */}
//               {expandedPostId === post.post._id && (
//                 <div className="mt-6 space-y-4">
//                   {/* Add Comment Input */}
//                   <div className="flex items-cemter gap-3">
//                     <img
//                       src="https://i.pravatar.cc/100"
//                       alt="You"
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Write a comment..."
//                       value={commenttext}
//                       onChange={(e) => setCommenttext(e.target.value)}
//                       // onKeyDown={(e) => {
//                       //   if (e.key === 'Enter' && commenttext.trim() !== '') {setCommenttext(e.target.value)}}}
//                       className="flex-1 border border-bordergray bg-white px-4 py-0 rounded-full focus:outline-none hover:border-[var(--hover-border-grayhover)] hover:border-1"
//                     />
//                     <button onClick={() => {
//                       comment(commenttext);
//                       setCommenttext("");
//                     }} className=" flex justify-center items-center space-x-1 text-gray px-3 py-1 rounded-full transition-all duration-300 hover:bg-grayhover ">
//                       <SendRoundedIcon fontSize="medium" />
//                     </button>
//                   </div>

//                   {/* Existing Comments */}

//                   {
//                     (post.post.comments.length === 0) ? (
//                       <p className="flex text-gray text-sm justify-center items-center ">No comments yet. Be the first to comment!</p>
//                     ) :

//                       (
//                         post.post.comments.map((comment, index) => (
//                           <div key={index} className="flex items-start gap-3 w-full">
//                             {comment.user.profilePic ? (
//                               <img
//                                 src={comment.user.profilePic}
//                                 alt={comment.user.username}
//                                 className="w-10 h-10 rounded-full object-cover"
//                               />
//                             ) : (
//                               <div className="w-10 h-10 rounded-full bg-blue-green flex items-center justify-center">
//                                 <span className="text-white text-lg font-semibold">
//                                   {comment.user.username.charAt(0).toUpperCase()}
//                                 </span>
//                               </div>
//                             )}
//                             <div className="bg-gray-100 px-4 py-2 rounded-lg w-full relative">

//                               {/* Top row with username and timestamp */}
//                               <div className="flex justify-between items-start">
//                                 <p className="text-sm font-semibold text-gray">{comment.user.username}</p>
//                                 <span className="text-xs text-lightgray ml-4 whitespace-nowrap">
//                                   {getTimeAgo(comment.createdAt)}
//                                 </span>
//                               </div>
//                               {/* Comment text */}
//                               <p className="text-sm text-gray mt-1">{comment.comment}</p>
//                             </div>
//                           </div>
//                         )))}
//                 </div>
//               )}
//             </article>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PostsList;




