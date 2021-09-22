import React, {useState, useEffect} from 'react'
import { Card, Row, Col, Form, Button, Container } from 'react-bootstrap'
import { register, listUsers, deleteUser, update } from '../../actions/userActions'

import { useDispatch, useSelector } from 'react-redux'
import MaterialTable from "material-table";

function UserForm({history, location}) {

    const [action, setAction] = useState('')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 
    const [confirmPassword, setConfirmPassword] = useState('') 
    const [role_id, setRoleId] = useState('')
    const [message, setMessage] = useState('')
    const [id, setId] = useState('')

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading:userListLoading,error:userListError, users} = userList


    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, success:successRegister} = userRegister

    const userUpdate = useSelector(state => state.userUpdate)
    const {error:updateError, loading:updateLoading, success:successUpdate} = userUpdate

    const userDelete = useSelector(state => state.userDelete)
    const {success:successDelete} = userDelete


    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch, successDelete, successRegister, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword)
        {
            setMessage('Password do not Match')
        }
        else
        {
            if(action === 'update')
            {
                dispatch(update(id,role_id, name, email))
            }
            else{
                dispatch(register(role_id, name, email, password))
            }
        }
    }

    const selectHandler = (data) => {
        setId(data.id)
        setName(data.name)
        setEmail(data.email)
        setRoleId(data.role_id)
        setAction('update')
    }

    const deleteHandler = (data) => {
       if(window.confirm('Are you sure you want to delete this user?'))
       {dispatch(deleteUser(data.id))}
    }

    const clearHandler = () => {
        setName("")
        setEmail("")
        setRoleId("")
        setPassword("")
        setConfirmPassword("")
        setAction('add')
    }

    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card className="p-3">
                        <Card.Body>
                            <h5>Add User</h5>
                            {message}
                            <Form onSubmit={submitHandler}>

                                <Form.Group controlId='role_id' className="mb-3">
                                    <Form.Select onChange={(e)=>setRoleId(e.target.value)} value={role_id} required>
                                        <option >Open this select menu</option>
                                        <option value="1">Admin</option>
                                        <option value="2">Customer Service</option>
                                        <option value="3">Spord</option>
                                        <option value="4">Budget</option>
                                        <option value="5">Accounting</option>
                                        <option value="6">Supervisor</option>
                                        <option value="7">Guest</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId='name' className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                    type='text'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    required
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='email' className="mb-3">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                        required
                                        type='email'
                                        placeholder='Enter Email'
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        >
                                        </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='password' className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                        type='password'
                                        placeholder='Enter Password'
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                        >
                                        </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='passwordConfirm' className="mb-3">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                        type='password'
                                        placeholder='Confirm Password'
                                        value={confirmPassword}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                        >
                                        </Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary'>
                                    Save
                                </Button>

                                <Button variant='secondary' className="ms-2" onClick={() => clearHandler()}>
                                    Clear All
                                </Button>
                            </Form>


                           
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <MaterialTable 
                        
                        columns={[
                            { title: "Name", field: "name", width:"50%" },
                            { title: "Email", field: "email", width:"30%" },
                            { title: "Role", field: "role_name", width:"10%" },
                            {
                                title: "Action",
                                field:"actions",
                                width:"10%",
                                editComponent: (props) =>{
                                    return (
                                        <Button>Payts</Button>
                                    )
                                },
                                render: (rowdata) => (
                                    <>
                                    <Button className="btn btn-sm btn-light" onClick={() => selectHandler(rowdata)}><i className="fa fa-edit"></i></Button>
                                    <Button className="btn btn-sm btn-light" onClick={()=> deleteHandler(rowdata)}><i className="fa fa-trash"></i></Button>
                                    </>
                                )
                            }
                        ]}
                        data={
                            users
                        }
                        title="Current Users"
                    
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default UserForm
