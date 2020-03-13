import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { setViewList, setUserName, setUserId, setPostList, setAlbumList } from '../state/action';

function User() {
    const dispatch = useDispatch();

    const [list, setList] = useState([]);

    function getUser() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            setList(data);
        })
    }

    function viewAlbum(value) {
        dispatch(setViewList('Album'));

        fetch(`https://jsonplaceholder.typicode.com/users/${String(value.id)}/albums`)
        .then(res => res.json())
        .then(data => {
            dispatch(setAlbumList(data));
            dispatch(setUserName(value.name));
            dispatch(setUserId(value.id));
        })
    }

    function viewPost(value) {
        dispatch(setViewList('Post'));

        fetch(`https://jsonplaceholder.typicode.com/users/${String(value.id)}/posts`)
        .then(res => res.json())
        .then(data => {
            dispatch(setPostList(data));
            dispatch(setUserName(value.name));
            dispatch(setUserId(value.id));
        })
    }

    useEffect(() => {
        getUser();
    }, []);
    return (
        <div className="col-md-12">
            <div className="col-md-12" style={{textAlign: 'center'}}>
                <h3>List User</h3>
            </div>
            {list.length !== 0 ? (
                <Table striped responsive size="lg">
                    <thead style={{backgroundColor: '#00a1b0', color: '#fff', fontWeight: 'bold'}}>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((value, i) => (
                                <tr key={value.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{value.name}</td>
                                    <td>{value.username}</td>
                                    <td>{value.email}</td>
                                    <td>
                                        <Button color="success" size="sm" style={{marginRight: 5}} onClick={() => viewPost(value)}><i className="fas fa-comment-alt"></i> Post</Button>
                                        <Button color="primary" size="sm" onClick={() => viewAlbum(value)}><i className="fas fa-images"></i> Album</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            ) : null}
        </div>
    );
}

export default User;
