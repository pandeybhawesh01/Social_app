import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from '../coponents/sidebar';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import { AppContext } from '../contex/AppContex';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import Navbar from '../coponents/navbar';
import { useNavigate } from 'react-router-dom';
import usePostViewModel from '../viewModels/postViewModel';
import PostsListShimmer from '../coponents/PostsListShimmer';

function PostsList() {
  const { userData } = useContext(AppContext);
  const { loading, getDashboardPost, postComment, likePost, error } = usePostViewModel();

  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);

  const [expandedPostId, setExpandedPostId] = useState(null);
  const [expandedPostUserId, setExpandedPostUserId] = useState(null);
  const [expandedContentPostId, setExpandedContentPostId] = useState(null);
  const [commenttext, setCommenttext] = useState('');
  const [isOpen, setIsOpen] = useState(false);



  const navigation = useNavigate();
  console.log(userData)

  // infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        hasMore &&
        !loading
      ) {
        fetchPosts();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading,hasMore]);

  // initial load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    console.log('Fetching page:', pageRef.current);
    try {
      const res = await getDashboardPost({
        page: pageRef.current,
        setPosts,
        setHasMore,
      });
      pageRef.current += 1;
    } catch (e) {
      console.warn('Error loading posts', e);
    }
  };

  // like handler: toggles local state only
  const likePostfn = async (postId, postUserId) => {
        setPosts(prev =>
          prev.map(item => {
            if (item.post._id === postId) {
              const already = item.post.likes.some(l => l.email === userData.email);
              const newLikes = already
                ? item.post.likes.filter(l => l.email !== userData.email)
                : [...item.post.likes, { email: userData.email }];
              return {
                ...item,
                post: {
                  ...item.post,
                  likes: newLikes,
                },
              };
            }
            return item;
          })
        );
        await likePost(postUserId, postId)
      } 

  // comment handler: appends new comment locally
  const comment = async text => {
    if (!expandedPostId || !text.trim()) return;
   
      
        const newComment = {
          comment: text,
          createdAt: new Date().toISOString(),
          user: {
            username: userData.name,
            profilePic: userData.image,
            email: userData.email,
          },
        }
        
        setPosts(prev =>
          prev.map(item =>
            item.post._id === expandedPostId
              ? {
                
                  ...item,
                  
                  post: {
                    ...item.post,
                    comments: [...item.post.comments, newComment],
                  },
                  
                }
              : item
          )
        );
       await postComment(expandedPostUserId, expandedPostId, text);
  };

  // Helpers
  const truncateText = (text, maxChars = 150) =>
    text.length <= maxChars ? text : text.slice(0, maxChars).trim() + '...';

  const onProfileClick = email => navigation(`/post-profile/${email}`);
  const toggleExpanded = postId =>
    setExpandedContentPostId(prev => (prev === postId ? null : postId));
  const toggleCommentSection = (postId, postUserId) => {
    setExpandedPostId(prev => (prev === postId ? null : postId));
    console.log(postUserId)
    setExpandedPostUserId(postUserId);
  };
  const onShare = () => {
    if (navigator.share) navigator.share({ title: 'CollegeVerse Post', url: window.location.href });
    else alert('Share not supported');
  };
  const getTimeAgo = dateString => {
    const now = Date.now();
    const then = new Date(dateString).getTime();
    const d = Math.floor((now - then) / 1000);
    if (d < 60) return 'Just now';
    if (d < 3600) return `${Math.floor(d / 60)}m ago`;
    if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
    if (d < 604800) return `${Math.floor(d / 86400)}d ago`;
    return new Date(dateString).toLocaleDateString();
  };

  if (loading && posts.length === 0) {
    return <PostsListShimmer isSidebarOpen={isOpen} />;
  }

  return (
    <div className="flex">
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <Navbar/>
      <div className={`flex-1 min-h-screen bg-admin-pattern py-10 px-4 sm:px-6 lg:px-8 ${isOpen ? 'md:ml-64' : 'md:ml-16'} transition-all duration-300`} >
        <div className="text-center mb-16">
          <h1
            className="text-5xl sm:text-6xl font-extrabold leading-tight sm:leading-[1.2] animate-pop text-transparent bg-clip-text inline-block"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--bg-blue-green), var(--hover-bg-blue-green-hover))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CollegeVerse
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-moderategray font-medium">
            Where students connect, create, and thrive together
          </p>
        </div>

        {/* Stats */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 px-32">
          {[
            { label: 'Active Students', value: '12.5K' },
            { label: 'Universities', value: '150+' },
            { label: 'Posts Today', value: '2.3K' },
            { label: 'Connections Made', value: '45K' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="p-4 text-center rounded-lg bg-containerwhite shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-grayhover"
            >
              <div className="text-3xl font-bold" style={{ color: 'var(--bg-blue-green)' }}>
                {stat.value}
              </div>
              <div className="text-lg text-moderategray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Posts */}
        <div className="max-w-2xl mx-auto space-y-8">
          {posts.map((post) => (
            <article
              key={post.post._id}
              className="p-6 rounded-lg bg-containerwhite shadow-md border border-amber-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl backdrop-blur-sm hover:border-[var(--hover-border-grayhover)] hover:border-1"
              aria-label={`Post by ${post.owner.username}`}
            >
              {/* Header */}
              <div className="flex items-center space-x-4 mb-4">
                <div onClick={() => onProfileClick(post.owner.email)}>

                {post.owner.profilePic ? (
                  <div className='w-12 h-12 border-2 rounded-full border-[var(--hover-bg-grayhover)]'>
                    <img src={post.owner.profilePic} alt={`${post.owner.username} avatar`} className="w-11 h-11 rounded-full object-cover" />
                  </div>) :
                  (<div className='w-12 h-12 border-2 rounded-full border-[var(--hover-bg-grayhover)] flex items-center justify-center'>
                    <div className="w-9 h-9 rounded-full bg-blue-green flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">{post.owner.username.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>)}
                  </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-semibold text-gray truncate">{post.owner.username}</p>
                  <p className="text-sm text-lightgray truncate">{post.post.college}</p>
                </div>
                <div className='flex-col items-center justify-center text-center'>
                  <div className='bg-admin-pattern p-1 rounded-full px-2'>
                    <p className="text-md font-semibold text-gray truncate">{post.post.type}</p>
                  </div>
                  <time className="text-sm text-lightgray" dateTime={new Date().toISOString()}>
                    {post.post.createdAt ? getTimeAgo(post.post.createdAt) : 'Just now'}
                  </time>

                </div>
              </div>

              {/* Content */}
              <div className="text-gray text-base leading-relaxed mb-4">
                {expandedContentPostId === post.post._id ? (
                  <>
                    <p>{post.post.content}</p>
                    <button
                      onClick={() => toggleExpanded(post.post._id)}
                      className="text-moderategray font-small ml-1 cursor-pointer"
                    >
                      Show less
                    </button>
                  </>
                ) : (
                  <p>
                    {truncateText(post.post.content, 150)}
                    {post.post.content.length > 150 && (
                      <button
                        onClick={() => toggleExpanded(post.post._id)}
                        className="font-small text-moderategray ml-1 cursor-pointer"
                      >
                        Read more
                      </button>
                    )}
                  </p>
                )}
              </div>
              {/* Image */}
              {post.post.image && (
                <div className="mb-4 rounded-lg overflow-hidden border border-bordergray">
                  <img
                    src={post.post.image}
                    alt="Post visual"
                    className="w-full object-cover w-auto"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1e9f285e-5fa0-4bba-903b-5b99db8bffb7.png';
                    }}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center pt-3 border-t border-bordergray text-lightgray text-sm select-none">
                <button onClick={() => likePostfn(post.post._id, post._id)}
                  className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }}
                >

                  {post.post.likes.some(like => like.email === userData?.email) ? (<FavoriteSharpIcon />) :  (<FavoriteBorderOutlinedIcon />)}

                  {/* <span>{post.post.likes.length +likecount}</span> */}
                  <span>
                    {
                      post.post.likes.some(like => like.email === userData?.email)
                        ? post.post.likes.length
                      
                          : post.post.likes.length
                    }
                  </span>

                </button>

                <button
                  className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }}
                  onClick={() => toggleCommentSection(post.post._id, post._id)}
                >
                  <CommentRoundedIcon />
                  <span>{post.post.comments.length}</span>
                </button>

                <button className="flex items-center space-x-1 px-2 py-1 rounded-full transition-all duration-300 hover:bg-grayhover" style={{ color: 'var(--bg-blue-green)' }} onClick={onShare}>
                  <ShareRoundedIcon />
                  <span>Share</span>
                </button>
              </div>

              {/* Comment Section */}
              {expandedPostId === post.post._id && (
                <div className="mt-6 space-y-4">
                  {/* Add Comment Input */}
                  <div className="flex items-cemter gap-3">
                    {userData?.image ?
                    (<img
                      src={userData?.image}
                      alt="You"
                      className="w-10 h-10 rounded-full object-cover"
                    />):
                    ( <div className="w-9 h-9 rounded-full bg-blue-green flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">{userData?.name.charAt(0).toUpperCase()}</span>
                    </div>)
}
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commenttext}
                      onChange={(e) => setCommenttext(e.target.value)}
                      // onKeyDown={(e) => {
                      //   if (e.key === 'Enter' && commenttext.trim() !== '') {setCommenttext(e.target.value)}}}
                      className="flex-1 border border-bordergray bg-white px-4 py-0 rounded-full focus:outline-none hover:border-[var(--hover-border-grayhover)] hover:border-1"
                    />
                    <button onClick={() => {
                      comment(commenttext);
                      setCommenttext("");
                    }} className=" flex justify-center items-center space-x-1 text-gray px-3 py-1 rounded-full transition-all duration-300 hover:bg-grayhover ">
                      <SendRoundedIcon fontSize="medium" />
                    </button>
                  </div>

                  {/* Existing Comments */}

                  {
                    (post.post.comments.length === 0) ? (
                      <p className="flex text-gray text-sm justify-center items-center ">No comments yet. Be the first to comment!</p>
                    ) :

                      (
                        post.post.comments.map((comment, index) => (
                          <div key={index} className="flex items-start gap-3 w-full">
                            {comment.user.profilePic ? (
                              <img
                                src={comment.user.profilePic}
                                alt={comment.user.username}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-9 rounded-full bg-blue-green flex items-center justify-center">
                                <span className="text-white text-lg font-semibold">
                                  {comment.user.username.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                            <div className="bg-gray-100 px-4 py-2 rounded-lg w-full relative">

                              {/* Top row with username and timestamp */}
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-semibold text-gray">{comment.user.username}</p>
                                <span className="text-xs text-lightgray ml-4 whitespace-nowrap">
                                  {getTimeAgo(comment.createdAt)}
                                </span>
                              </div>
                              {/* Comment text */}
                              <p className="text-sm text-gray mt-1">{comment.comment}</p>
                            </div>
                          </div>
                        )))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostsList;
