import React from 'react';
import Album from './Album';
import Post from './Post';
import User from './User';
import { useSelector } from 'react-redux';

function DashboardBody() {
    const view = useSelector(state => state.viewList);
    return (
        <div className="col-md-12">
            {view === 'User' ? (
                <User />
            ) : null}
            {view === 'Album' ? (
                <Album />
            ) : null}
            {view === 'Post' ? (
                <Post />
            ) : null}
        </div>
    );
}

export default DashboardBody;
