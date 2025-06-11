import React, {useEffect, useState} from 'react';
import ButtonComponent from "./ButtonComponent.jsx";
import {createTodo, getTodo, updateTodo} from "../services/TodoService.JS";
import {useNavigate, useParams} from "react-router-dom";
import FormInput from "./FormInputComponent.jsx";

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [complete, setComplete] = useState(false); // or null if no initial value

    const {id} = useParams();
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        complete: ''
    })
    const navigate = useNavigate();

    useEffect(() => {
        if(id){
            getTodo(id).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setComplete(response.data.complete);
            }).catch(error => {console.log(error)})
        }
    }, [id]);


    function createOrUpdateTodo(event) {
        event.preventDefault();

        const todo = {title, description, complete};
        console.log('Todo Data - {} ', todo);

        if(validateForm()) {
            if(id) {
                updateTodo(todo, id).then(response => {
                    console.log('Response - {}', response);
                    navigate('/todos');
                }).catch(error => {console.log(error)})
            } else {
                createTodo(todo).then(response => {
                    console.log(response);
                    navigate('/todos');
                }).catch(error => {console.log(error)})
            }
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {
            title: '',
            description: '',
            complete: '',
        };

        const nameRegex = /^.{0,40}$/;
        const descriptionRegex = /^.{0,120}$/;

        // First Name
        if (!title.trim() || !nameRegex.test(title)) {
            errorsCopy.title = 'Title can have at most 40 characters.';
            valid = false;
        }

        // Last Name
        if (!description.trim() || !descriptionRegex.test(description)) {
            errorsCopy.description = 'Description can have at most 120 characters.';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function baseTitle(){
        if(id) {
            return 'Update Todo'
        } else {
            return 'Add Todo'
        }
    }

    return (
        <div  className = 'container'>
            <br/>
            <div className= 'row'>
                <div className='card'>
                    <h2 className='text-center'> {baseTitle()}</h2>
                    <div className='card-body'>
                        <form>
                            <FormInput label="Title" name="title" value={title} validation={errors.title} handleOnChange={(event) => setTitle(event.target.value)} />
                            <FormInput label="Description" name="description" value={description} validation={errors.description} handleOnChange={(event) => setDescription(event.target.value)} />
                            <div className='form-group mb-2'>
                                <label className='form-label'>Completed</label>
                                <select
                                    className={`form-control ${errors.complete ? 'is-invalid' : ''}`}
                                    value={complete.toString()}
                                    onChange={(event) => setComplete(event.target.value === 'true')}
                                >
                                    <option value="" disabled hidden>Select value</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                                {errors.complete && <div className='invalid-feedback'>{errors.complete}</div>}
                            </div>

                        </form>
                    </div>
                    <ButtonComponent className='btn-success' onClick={createOrUpdateTodo} text='Submit' />
                </div>

            </div>
        </div>
    );
};

export default TodoComponent;