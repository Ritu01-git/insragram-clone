import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";


function post({username, imageUrl, caption}) {
    return (
        <div className="post">
            <div className="postHeader">
                <Avatar className="postAvatar"
                    src="/static/images/avatar/1.jpg"
                    alt={username}
                />
                <h3>{username}</h3>

            </div>
            {/* header -> avatar and username */}
            <img className="postImage" src={imageUrl}></img>
            {/* image */}

            {/* username + caption */}
            <h4 className="postMessage"><strong>{username}</strong>  {caption}</h4>
        </div>
    )
}

export default post