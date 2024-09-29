import React, { useState } from 'react';
import { toggleLike } from '../../services/likeService';

interface LikeSectionProps {
   likes: string[];
  idPost:string ;
  currentUser:any
}
const LikeSection: React.FC<LikeSectionProps> = ({ likes,currentUser , idPost }) => {
    const [likesState, setLikesState] = useState<string[]>(likes)
    const [userHasLiked, setuserHasLiked] = useState( likes.some((like:string) => like === currentUser._id))
    const [countLikes, setcountLikes] = useState(likes.length)
    const onToggleLike = () => {
      
        toggleLike(currentUser._id , idPost ).then((res)=>  {
            if (res.succes){ 
                setLikesState([res.data.likes]);
                setcountLikes(res.data.likes.length)
                setuserHasLiked(!userHasLiked)
            }
        })
      };
  return (
    <div className="flex justify-between items-center mt-3">
      <button
        onClick={onToggleLike} // Toggle like/unlike
        className={`py-1 px-2 rounded-md text-sm ${
          userHasLiked ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        {userHasLiked ? 'Unlike' : 'Like'}
      </button>
      <span className="text-sm">{countLikes} {countLikes === 1 ? 'Like' : 'Likes'}</span>
    </div>
  );
};

export default LikeSection;
