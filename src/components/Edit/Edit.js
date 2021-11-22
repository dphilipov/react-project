// React, Hooks
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCRUDForm from '../../hooks/useCRUDForm';

// Components
import Notification from '../Notification/Notification';

// CSS
import style from './Edit.module.css';

// Services
import notificationServices from '../../services/notificationServices';
import validate from '../../services/validationServices';

const Edit = ({ match, history }) => {
    const {
        formValue,
        handleInputChange,
        handleEditFormSubmit,
        setInitialValuesOnEdit,
        isSubmitting,
        formErrors,
        isSuccess
    } = useCRUDForm(validate);

    const [notification, setNotification] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        if (isSuccess) history.push(`/article/${match.params.id}`);
    }, [isSuccess, history])

    useEffect(() => {
        setInitialValuesOnEdit(match.params.id);
    }, [match, setInitialValuesOnEdit])

    return (

        <>
            {/* {notification.type !== ''
                ? <Notification type={notification.type} message={notification.message} />
                : ''
            } */}

            <h3 className={style.editHeading}>Edit this place</h3>
            <p className={style.hint}>
                You can use a website like <Link to={{ pathname: "https://www.latlong.net/" }} target="_blank" rel="noreferrer">https://www.latlong.net/</Link> for the coordinates
            </p>

            <form className={style.createForm}>

                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formValue.title}
                    placeholder="Title of the place"
                    onChange={handleInputChange} />

                <label htmlFor="imgUrl">Image Photo:</label>
                <input
                    type="text"
                    name="imgUrl"
                    value={formValue.imgUrl}
                    placeholder="Enter URL here"
                    onChange={handleInputChange} />

                <label htmlFor="lat">Latitude:*</label>
                <input
                    type="number"
                    name="lat"
                    value={formValue.lat}
                    placeholder="Enter place latitude (e.g. 42.144920)"
                    onChange={handleInputChange} />

                <label htmlFor="lng">Longitude:*</label>
                <input
                    type="number"
                    name="lng"
                    value={formValue.lng}
                    placeholder="Enter place longitude (e.g. 24.750320)"
                    onChange={handleInputChange} />

                <label htmlFor="description">Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={formValue.description}
                    onChange={handleInputChange}
                >
                </textarea>

                <input
                    type="checkbox"
                    id="visited"
                    name="visited"
                    value="Visited"
                    checked={formValue.visited.length > 0 ? true : false}
                    onChange={handleInputChange}
                />
                <label htmlFor="visited">Visited</label>

                <button
                    onClick={handleEditFormSubmit}
                    className={style.submitBtn}
                    type="submit"
                    disabled={isSubmitting}
                >
                    EDIT
                </button>
            </form>
        </>
    )

}

export default Edit;

