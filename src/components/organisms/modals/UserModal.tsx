import Modal from 'react-bootstrap/Modal';
import { UserItems } from '../../../data/terazzo/type';
import UserForm from '../../molecules/forms/UserForm';

type UserModalProps = {
    actionType: string;
    show: boolean;
    defaultValue?: UserItems;
    onHide: () => void;
}

export const UserModal = (props: UserModalProps) => {
    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <h2 className='modal-header-title'>
                    Form {props.actionType === 'edit' ? 'Edit' : props.actionType === 'view' ? 'Detail' : 'Create'} User
                </h2>
            </Modal.Header>
            <Modal.Body>
                <UserForm
                    actionType={props.actionType}
                    defaultValue={props.defaultValue}
                    toggle={props.onHide}
                />
            </Modal.Body>
        </Modal>
    )
}