import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

import './Blogs.scss'
import { Portal, PopupInner, Title, Form, Input, Button } from '../portal/Portal'

function Blogs({ blogs = [], setBlogs }) {

    const [show, setShow] = useState(false);
    const [record, setRecord] = useState(null);

    const handleUpdate = async (id, value) => {
        return axios.put(`/put/${id}/`, value)
        .then((reponse) => {
            const { data } = reponse;
            const newBlogs = blogs.map (blog => {
                if (blog.id === id) {
                    return data;
                }
                return blog;
            })
            setBlogs(newBlogs)
        }).catch(() => {
            alert('Algo fue mal!')
        })
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleSaveChanges = async () => {
        await handleUpdate(record.id, { body: record.body });
        handleClose();
    }

    const handleChange = (e) => {
        setRecord({
            ...record,
            body: e.target.value
        })
    }

    const handleDelete = (id) => {
        axios.delete(`/delete/${id}`)
            .then(() => {
                const newBlogs = blogs.filter(blog => {
                    return blog.id !== id
                });
                setBlogs(newBlogs)
            }).catch(() => {
                alert('Algo fue mal!')
            })
    }



    return (
        <div className='listgroup'>
            {blogs.map(blog => {
                return (
                    <div className='container' >

                        <input type='text' placeholder='Container' defaultValue={blog.body} key={blog.id} />
                        <button onClick={() => { setRecord(blog); setShow(true) }}> <FaEdit /> </button>
                        <button onClick={() => { handleDelete(blog.id) }}> <FaTrashAlt /> </button>
                    </div>
                )
            })}


            <Portal trigger={show} >
                <PopupInner>
                    <Title>
                        <h1>Blog Edit</h1>

                    </Title>

                    <Form>

                        <Input>

                            <input type='text' value={record ? record.body : ''} onChange={handleChange} />

                        </Input>

                        <Button>
                            <button onClick={handleClose}>close</button>
                            <button onClick={handleSaveChanges}>save</button>
                        </Button>


                    </Form>

                </PopupInner>

            </Portal>






        </div>
    )
}

export default Blogs



