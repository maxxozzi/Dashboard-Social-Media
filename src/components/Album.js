import React, { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setViewList } from '../state/action';

function Album() {
    const name = useSelector(state => state.name);
    const list = useSelector(state => state.albumList);
    const dispatch = useDispatch();

    const [listPhoto, setListPhoto] = useState([]);
    const [detailPhoto, setDetailPhoto] = useState({});
    const [albumName, setAlbumName] = useState('');
    const [modalListPhoto, setModalListPhoto] = useState(false);
    const [modalDetailPhoto, setModalDetailPhoto] = useState(false);

    function backHome() {
        dispatch(setViewList('User'));
    }

    function openListPhoto(value) {
        setAlbumName(value.title);
        setModalListPhoto(true);

        fetch(`https://jsonplaceholder.typicode.com/albums/${value.id}/photos`)
        .then(res => res.json())
        .then(data => {
            setListPhoto(data);
        })
    }

    function openDetailPhoto(value) {
        setDetailPhoto(value);
        setModalDetailPhoto(true);
    }

    return (
        <div className="col-md-12">
            <div className="col-md-12" style={{textAlign: 'center'}}>
                <h3>List Album {name}</h3>
            </div>
            <div className="col-md-12" style={{marginBottom: 15}}>
                <div className="row">
                    <div>
                        <Button color="primary" onClick={() => backHome()}>
                            <i className="fas fa-arrow-circle-left"></i> Back
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
                                        <Button color="success" size="sm" onClick={() => openListPhoto(value)}><i className="fas fa-images"></i> Detail</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            ) : null}

            {/* 
                Modal to view list of photo from an album
            */}
            <Modal isOpen={modalListPhoto} toggle={() => setModalListPhoto(!modalListPhoto)} scrollable={true} size="lg">
                <ModalHeader toggle={() => setModalListPhoto(!modalListPhoto)} style={{backgroundColor: '#fff', color: '#00a1b0'}}>{albumName}</ModalHeader>
                <ModalBody>
                    <div className="col-md-12">
                        <div className="row">
                            {listPhoto.length !== 0 ? (
                                listPhoto.map((value) => (
                                    <div className="col-md-2" key={value.id} style={{margin: 5}}>
                                        <Card>
                                            <CardImg top width="20%" src={value.thumbnailUrl} alt="thumbnail" />
                                            <CardBody>
                                                <Button color="success" size="sm" onClick={() => openDetailPhoto(value)}>
                                                    Detail
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </div>
                                ))
                            ) : null}
                        </div>  
                    </div>
                </ModalBody>
                <ModalFooter style={{fontWeight: 'bold', color: '#00a1b0'}}>
                    {listPhoto.length} Photos
                </ModalFooter>

                {/* 
                    Nested modal to view detail of photo
                */}
                <Modal isOpen={modalDetailPhoto} toggle={() => setModalDetailPhoto(!modalDetailPhoto)} scrollable={true} size="lg">
                    <ModalHeader toggle={() => setModalDetailPhoto(!modalDetailPhoto)} style={{backgroundColor: '#fff', color: '#00a1b0'}}>{detailPhoto.title}</ModalHeader>
                    <ModalBody>
                        <div className="col-md-12">
                            <img src={detailPhoto.url} alt="zoom detail" />
                        </div>
                    </ModalBody>
                </Modal>
            </Modal>
        </div>
    )
}

export default Album;