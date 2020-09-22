import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Nav() {
	return (
		<nav className="nav">
			<ul>
				<li>
					<NavLink to="/"
					         activeClassName="active"
					         exact>Home</NavLink>
				</li>
				<li>
					<NavLink to="/new"
					         activeClassName="active">New Tweet</NavLink>
				</li>
			</ul>
		</nav>
	);
}