import React, { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setViewList, setPostList } from '../state/action';
import Swal from 'sweetalert2';

function Post() {
    const name = useSelector(state => state.name);
    const userId = useSelector(state => state.userId);
    const list = useSelector(state => state.postList);
    const dispatch = useDispatch();

    const [listComment, setListComment] = useState([]);
    const [modalComment, setModalComment] = useState(false);
    const [commentEditing, setCommentEditing] = useState(false);
    const [idPost, setIdPost] = useState('');
    const [titlePost, setTitlePost] = useState('');
    const [bodyPost, setBodyPost] = useState('');
    const [commentItem, setCommentItem] = useState({});
    const [indexComment, setIndexComment] = useState(0);
    const [nameComment, setNameComment] = useState('');
    const [emailComment, setEmailComment] = useState('');
    const [bodyComment, setBodyComment] = useState('');
    const [activeTab, setActiveTab] = useState('1');
    const [modalAddPost, setModalAddPost] = useState(false);
    const [modalViewPost, setModalViewPost] = useState(false);

    function toggleNav(tab) {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
    }

    function openAddComment() {
        setNameComment('');
        setBodyComment('');
        setEmailComment('');
        setCommentEditing(false);
        setModalComment(true);
    }

    function openAddPost() {
        setTitlePost('');
        setBodyPost('');
        setModalAddPost(true);
    }

    function openEditComment(value, index) {
        setCommentItem(value);
        setIndexComment(index);
        setCommentEditing(true);
        setModalComment(true);
    }

    function getComment(value) {
        setIdPost(value.id);
        setTitlePost(value.title);
        setBodyPost(value.body);
        setModalViewPost(true);

        fetch(`https://jsonplaceholder.typicode.com/posts/${value.id}/comments`)
        .then(res => res.json())
        .then(data => {
            setListComment(data);
        })
    }

    function backHome() {
        dispatch(setViewList('User'));
    }

    function addPost() {
        if (titlePost !== '' && bodyPost !== '') {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                title: titlePost,
                body: bodyPost,
                userId: userId
                }),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(data => {
                let addData = list
                addData.push(data);
                dispatch(setPostList(addData));
                setModalAddPost(false);
                Swal.fire({
                    type: 'success',
                    title: 'New Post Added'
                  })
            })
        }
    }

    function editPost() {
        if (titlePost !== '' && bodyPost !== '') {
            fetch(`https://jsonplaceholder.typicode.com/posts/${String(idPost)}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: idPost,
                    title: titlePost,
                    body: bodyPost,
                    userId: userId
                }),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(data => {
                let replaceData = list.map((value) => {
                    let title, body;
                    if (value.id === data.id) {
                        title = data.title
                        body = data.body
                    } else {
                        title = value.title
                        body = value.body
                    }
                    return {
                        id: value.id,
                        title: title,
                        body: body,
                        userId: value.userId
                    }
                })
                
                dispatch(setPostList(replaceData));
                Swal.fire({
                    type: 'success',
                    title: 'Post Edited'
                  })
            })
        } 
    }

    function deletePost(index) {
        Swal.fire({
            title: 'Delete Post',
            text: 'Are you sure you want to delete this post ?',
            type: 'warning',
            reverseButtons: true,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#95a5a6',
            cancelButtonText: 'Cancel',
            confirmButtonText: '<i class="fas fa-trash-alt"></i> Delete'
        }).then((result) => {
            if (result.value) {
                let posts = list;
                posts.splice(index, 1);
                dispatch(setPostList(posts));
                Swal.fire({
                    type: 'success',
                    title: 'Comment deleted'
                  })
            }
        })
    }

    function addComment() {
        if (nameComment !== '' && emailComment !== '' && bodyComment !== '') {
            setListComment([
                ...listComment,
                {
                    postId: listComment[0].postId,
                    id: listComment.length + 1,
                    name: nameComment,
                    email: emailComment,
                    body: bodyComment
                }
            ]);
            setModalComment(false);
            Swal.fire({
                type: 'success',
                title: 'New Comment Added'
              })
        }
    }

    function editComment() {
        if (nameComment !== '' && emailComment !== '' && bodyComment !== '') {
            let comment = {
                postId: commentItem.postId,
                id: commentItem.id,
                name: nameComment,
                email: emailComment,
                body: bodyComment
            }
            let commentData = listComment;
            commentData[indexComment] = comment;
            setListComment(commentData);
            setModalComment(false);
            Swal.fire({
                type: 'success',
                title: 'Comment Edited'
              })
        }
    }

    function deleteComment(index) {
        Swal.fire({
            title: 'Delete Comment',
            text: 'Are you sure you want to delete this comment ?',
            type: 'warning',
            reverseButtons: true,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#95a5a6',
            cancelButtonText: 'Cancel',
            confirmButtonText: '<i class="fas fa-trash-alt"></i> Delete'
        }).then((result) => {
            if (result.value) {
                let comments = listComment;
                comments.splice(index, 1);
                setListComment(comments);
                Swal.fire({
                    type: 'success',
                    title: 'Comment deleted'
                  })
            }
        })
    }
    return (
        <div className="col-md-12">
            <div className="col-md-12" style={{textAlign: 'center'}}>
                <h3>List Post {name}</h3>
            </div>
            <div className="col-md-12" style={{marginBottom: 15}}>
                <div className="row">
                    <div>
                        <Button color="primary" style={{marginRight: 10}} onClick={() => backHome()}>
                            <i className="fas fa-arrow-circle-left"></i> Back
                        </Button>
                    </div>
                    <div>
                        <Button color="success" style={{marginRight: 10}} onClick={() => openAddPost()}>
                            <i className="fas fa-plus-circle"></i> Add New Post
                        </Button>
                    </div>
                </div>
            </div>
            {list.length !== 0 ? (
                <Table striped responsive size="lg">
                    <thead style={{backgroundColor: '#00a1b0', color: '#fff', fontWeight: 'bold'}}>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((value, i) => (
                                <tr key={value.id}>
                                    <th scope="row">{i+1}</th>
                                    <td>{value.title}</td>
                                    <td>
                                        <Button color="success" size="sm" style={{marginRight: 5}} onClick={() => getComment(value)}><i className="fas fa-comment-alt"></i> Detail</Button>
                                        <Button color="danger" size="sm" onClick={() => deletePost(i)}><i className="fas fa-trash-alt"></i> Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            ) : null}

            {/* 
                Modal to add new post
            */}
            <Modal isOpen={modalAddPost} toggle={() => setModalAddPost(!modalAddPost)} scrollable={true} size="lg">
                <ModalHeader toggle={() => setModalAddPost(!modalAddPost)} style={{backgroundColor: '#fff', color: '#00a1b0'}}>Add Post</ModalHeader>
                <ModalBody>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input type="text" value={titlePost} onChange={(e) => setTitlePost(e.target.value)} />
                                </FormGroup>
                            </Form>
                        </div>
                        <div className="col-md-12">
                            <Form>
                                <FormGroup>
                                    <Label for="body">Body</Label>
                                    <Input type="textarea" rows="6" value={bodyPost} onChange={(e) => setBodyPost(e.target.value)} />
                                </FormGroup>
                            </Form>
                        </div>     
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => addPost()}>
                        <i className="fas fa-paper-plane"></i> Submit
                    </Button>
                </ModalFooter>
            </Modal>

            {/* 
                Modal to edit post and view comments
            */}
            <Modal isOpen={modalViewPost} toggle={() => setModalViewPost(!modalViewPost)} scrollable={true} size="lg">
                <ModalHeader toggle={() => setModalViewPost(!modalViewPost)} style={{backgroundColor: '#fff', color: '#00a1b0'}}>Detail Post</ModalHeader>
                <ModalBody>
                    <div className="col-md-12">
                        <Nav pills>
                            <NavItem>
                                <NavLink
                                    style={{cursor: 'pointer'}} 
                                    className={activeTab === '1' ? 'active' : ''}
                                    onClick={() => toggleNav('1')}
                                >
                                    Detail
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    style={{cursor: 'pointer'}} 
                                    className={activeTab === '2' ? 'active' : ''}
                                    onClick={() => toggleNav('2')}
                                >
                                    Comments
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <div className="col-md-12">
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <div className="col-md-12" style={{marginTop: 15}}>
                                    <div className="col-md-12">
                                        <Form>
                                            <FormGroup>
                                                <Label for="title">Title</Label>
                                                <Input type="text" value={titlePost} onChange={(e) => setTitlePost(e.target.value)} />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    <div className="col-md-12">
                                        <Form>
                                            <FormGroup>
                                                <Label for="body">Body</Label>
                                                <Input type="textarea" rows="6" value={bodyPost} onChange={(e) => setBodyPost(e.target.value)} />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                    <div className="col-md-12" style={{marginTop: 10}}>
                                        <Button color="primary" onClick={() => editPost()}>
                                            <i className="fas fa-save"></i> Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tabId="2">
                                <div className="col-md-12" style={{marginTop: 15}}>
                                    <div className="col-md-12">
                                        <Button color="success" onClick={() => openAddComment()}>
                                            <i className="fas fa-plus-circle"></i> Add New Comment
                                        </Button>
                                    </div>
                                    {listComment.length !== 0 ? (listComment.map((value, i) => (
                                        <div className="col-md-12" key={value.id} style={{marginTop: 5}}>
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>{value.name}</CardTitle>
                                                    <CardSubtitle>{value.email}</CardSubtitle>
                                                    <CardText>{value.body}</CardText>
                                                    <div className="col-md-12">
                                                        <div className="row">
                                                            <Button color="primary" size="sm" onClick={() => openEditComment(value, i)} style={{marginRight: 5}}>
                                                                <i className="fas fa-pencil-alt"></i> Edit
                                                            </Button>
                                                            <Button color="danger" size="sm" onClick={() => deleteComment(i)}>
                                                                <i className="fas fa-trash-alt"></i> Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))) : null}
                                </div>
                            </TabPane>
                        </TabContent>
                    </div>
                </ModalBody>
                
                {/* 
                    Nested modal to edit and add new comments
                */}
                <Modal isOpen={modalComment} toggle={() => setModalComment(!modalComment)} scrollable={true}>
                    <ModalHeader toggle={() => setModalComment(!modalComment)} style={{backgroundColor: '#fff', color: '#00a1b0'}}>{commentEditing ? 'Edit' : 'Add New'} Comment</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <Form>
                                    <FormGroup>
                                        <Label for="name">Name</Label>
                                        <Input type="text" value={nameComment} onChange={(e) => setNameComment(e.target.value)} />
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className="col-md-12">
                                <Form>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="text" value={emailComment} onChange={(e) => setEmailComment(e.target.value)} />
                                    </FormGroup>
                                </Form>
                            </div>
                            <div className="col-md-12">
                                <Form>
                                    <FormGroup>
                                        <Label for="body">Body</Label>
                                        <Input type="textarea" rows="6" value={bodyComment} onChange={(e) => setBodyComment(e.target.value)} />
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={commentEditing ? () => editComment() : () => addComment()} style={{marginRight: 5}}>
                            <i className={commentEditing ? "fas fa-save" : "fas fa-paper-plane"}></i> {commentEditing ? "Save" : "Submit"}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Modal>
        </div>
    );
}

export default Post;
