import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti';

import {formatTweet, formatDate} from '../utils/helpers';
import {handleToggleTweet} from '../actions/tweets';

class Tweet extends Component {
	toParent = (e, id) => {
		e.preventDefault();
		
		this.props.history.push(`/tweet/${id}`);
	}
	
	handleLike = (e) => {
		e.preventDefault();
		
		const {dispatch, tweet, authedUser} = this.props;
		
		dispatch(handleToggleTweet({
			id: tweet.id,
			hasLiked: tweet.hasLiked,
			authedUser
		}));
	}
	
	render() {
		const {tweet} = this.props;
		
		if (tweet === null) {
			return (
				<p>This tweet doesn't existed...</p>
			);
		}
		
		const {name, timestamp, text, avatar, likes, replies, hasLiked, parent, id} = tweet;
		
		return (
			<Link to={`/tweet/${id}`} className='tweet'>
				<img className="avatar" src={avatar} alt={`Avatar of ${name}`} />
				<div>
					<div className="tweet-info">
						<div>
							<span>{name}</span>
							<div>{formatDate(timestamp)}</div>
							{parent && (
								<div>
									<button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
										Replying to @{parent.author}
									</button>
								</div>
							)}
							<p>{text}</p>
						</div>
						<div className="tweet-icons">
							<TiArrowBackOutline className="tweet-icon" /> {replies !== 0 && (
							<span>{replies}</span>
						)}
							<button className="heart-button" onClick={(e) => this.handleLike(e)}>
								{
									hasLiked ?
										<TiHeartFullOutline className="tweet-icon" color="#e0245e" /> :
										<TiHeartOutline className="tweet-icon" />
								}
							</button>
							{likes !== 0 && (
								<span>{likes}</span>
							)}
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

function mapStateToProps({authedUser, users, tweets}, {id}) {
	const tweet = tweets[id],
		parentTweet = tweet ? tweets[tweet.replyingTo] : null;
	
	return {
		authedUser,
		tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
	}
}

export default withRouter(connect(mapStateToProps)(Tweet));