import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {createRoleApi, getPermissionsApi /*, createRoleApi */} from "../services/AuthService.JS";
import ButtonComponent from "./ButtonComponent.jsx";
import FormInput from './FormInputComponent.jsx';
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const CreateUserComponent = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [permissionList, setPermissionList] = useState([]);

    const [errors, setErrors] = useState({ name: '' });

    useEffect(() => {
        getPermissionsApi()
            .then(response => {
                setPermissionList(response.data);
            })
            .catch(console.error);
    }, []);

    const permissionOptions = permissionList.map(p => ({
        value: p,
        label: p[0] + p.slice(1).toLowerCase(),
    }));

    const validateForm = () => {
        let valid = true;
        const errs = { name: '' };
        const nameRegex = /^[A-Za-z_]{3,24}$/;

        if (!name.trim() || !nameRegex.test(name)) {
            errs.name =
                'Role name must be only letters or underscores, 3–24 characters.';
            valid = false;
        }
        setErrors(errs);
        return valid;
    };

    const createRole = e => {
        e.preventDefault();
        if (!validateForm()) return;

        const payload = {
            name,
            permissions: permissions.map(opt => opt.value),
        };
        console.log('submitting', payload);

        createRoleApi(payload)
          .then(() => navigate('/users'))
          .catch(console.error);
    };

    const animated = makeAnimated();

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>Role Creation</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={createRole}>
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={name}
                                    validation={errors.name}
                                    handleOnChange={e => setName(e.target.value)}
                                />

                                <div className="form-group mb-2">
                                    <label htmlFor="permissions-select" className="form-label">
                                        Select Permissions
                                    </label>
                                    <Select
                                        id="permissions-select"
                                        closeMenuOnSelect={false}
                                        components={animated}
                                        isMulti
                                        options={permissionOptions}
                                        value={permissions}
                                        onChange={setPermissions}
                                        defaultValue={permissionOptions.slice(1, 3)}
                                    />
                                </div>

                                <div className="d-grid mt-3">
                                    <ButtonComponent
                                        className="btn-success"
                                        text="Submit"
                                        type="submit"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUserComponent;
