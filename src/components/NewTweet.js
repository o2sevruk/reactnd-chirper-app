import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {handleAddTweet} from '../actions/tweets';

class NewTweet extends Component {
	state = {
		text: '',
		toHome: false
	}
	
	handleChange = (e) => {
		const text = e.target.value;
		
		this.setState(() => ({
			text
		}));
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		const {text} = this.state,
			{dispatch, id} = this.props;
		
		dispatch(handleAddTweet(text, id));
		
		this.setState(() => ({
			text: '',
			toHome: !id
		}));
	}
	
	render() {
		const {text, toHome} = this.state,
			tweetLeft = 280 - text.length;
		
		if (toHome === true) {
			return <Redirect to="/" />
		}
		
		return (
			<div>
				<h3 className="center">Compose new Tweet</h3>
				
				<form className="new-tweet" onSubmit={this.handleSubmit}>
          <textarea className="textarea" placeholder="What's happening?" value={text} maxLength={280}
                    onChange={this.handleChange} />
					{tweetLeft <= 100 && (
						<div className="tweet-length">
							{tweetLeft}
						</div>
					)}
					<button className="btn" type="submit" disabled={text === ''}>
						Submit
					</button>
				</form>
			</div>
		)
	}
}

export default connect()(NewTweet);