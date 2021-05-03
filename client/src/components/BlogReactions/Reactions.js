import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addCommentReaction,
  addBlogReaction,
} from "../../features/blog/blogSlice";
import { selectUserData } from "../../features/user/userSlice";

import './Reactions.css'

export default function Reactions(props) {
  const [hasReacted, setHasReacted] = useState("false");

  // get the BlogId from params
  let blogId = parseInt(useParams().blogPostId);

  // get the userId from the state
  const userId = useSelector(selectUserData).id;

  //find out if this user has reacted to anything, if it has, set it to its name
  useEffect(() => {
    let reacted = props.reactions.find((element) => element.userId === userId);
    if (reacted) {
      setHasReacted(reacted.reaction);
    }
  }, [props.reactions, userId]);

  const dispatch = useDispatch();

  const reactionTotals = {
    like: 0,
    heart: 0,
    laugh: 0,
    trophy: 0,
  };

  // map the reactions into the reactionTotal object
  props.reactions.forEach((element) => {
    reactionTotals[element.reaction]++;
    });

  const reactionEmojis = {
    like: "👍",
    heart: "❤️",
    laugh: "😂",
    trophy: "🏆",
  };

  // server request function
  async function updateServerReaction(data = {}, target) {
    const response = await fetch(`/api/blog/${blogId}/${target}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data),
    });
    return response;
  }

  function updateReaction(event) {
    //lots of set-up - get the old reaction, the new reaction, the user
    let newReaction = { userId: userId, reaction: event.target.value };
    let oldReactions = props.reactions;
    let newReactionArray = []

    //compare them, has the user reacted before?
    let hasUserReacted = oldReactions.find(
      (reaction) => reaction.userId === userId
    );
    if (hasUserReacted) {
      // if they've reacted, set their reaction to the new reaction (assuming it's different)
      if (hasUserReacted.reaction !== newReaction.reaction) {
          newReactionArray = oldReactions.filter(
              (reaction) => reaction.userId !== userId
            )
          newReactionArray.push(newReaction);
      } else {
        // otherwise we should remove the reaction
        newReactionArray = oldReactions.filter(
          (reaction) => reaction.userId !== userId
        );
        setHasReacted("false")
      }
    } else {
      // if they haven't reacted, add their reaction to the array
      newReactionArray = [...oldReactions, newReaction];
    }

    //now it diverges slightly if it's a comment or a blog post we are reacting to

    if (props.commentId) {
      // if it's a comment dispatch add commentreaction
      dispatch(
        addCommentReaction({
          commentId: props.commentId,
          userId: userId,
          newReaction: event.target.value,
        })
      );
      // update the server copy too
      updateServerReaction({commentId: props.commentId, newReaction: JSON.stringify(newReactionArray)}, 'comment/react')
    } else if (props.blogId) {
      // if it's a blog, dispatch add blogreaction
      dispatch(
        addBlogReaction({
          blogId: props.blogId,
          userId: userId,
          newReaction: event.target.value,
        })
      );
      // update the server copy too
      updateServerReaction({commentId: props.commentId, newReaction: JSON.stringify(newReactionArray)}, 'react')
    }
  }

  return (
    <div className="ReactionButtonContainer">
      {Object.entries(reactionEmojis).map(([name, emoji]) => {
        return (
          <button
            key={name}
            type="button"
            className="ReactionEmojiButton"
            value={name}
            onClick={updateReaction}
            style={
              hasReacted === name
                ? { color: "blue", fontWeight: "bold" }
                : { color: "black" }
            }
            disabled={
              props.disabled ? true : false
            }
          >
            {emoji} {reactionTotals[name] ? reactionTotals[name] : ""}
          </button>
        );
      })}
    </div>
  );
}
