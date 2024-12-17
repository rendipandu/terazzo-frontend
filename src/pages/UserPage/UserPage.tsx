import React, { useEffect, useState } from 'react';
import { getUsers } from '../../data/terazzo/client';
import { useTerazzo } from '../../data/terazzo/store';
import { useAuth } from '../../data/auth/store';
import DataTable, { TableColumn } from 'react-data-table-component';
import { UserItems } from '../../data/terazzo/type';
import { Button, Dropdown } from 'react-bootstrap';
import './style.css'
import { UserModal } from '../../components/organisms/modals/UserModal';

const UserPage: React.FC = () => {
    const { credential } = useAuth(); // Get Bearer token
    const { userList, setUserList } = useTerazzo();
    const [actionType, setActionType] = useState<string>('');
    const [dataModalForm, setDataModalForm] = useState<UserItems>();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const columns: TableColumn<UserItems>[] = [
        {
            id: 'name',
            name: 'Name',
            cell: row => row.name ?? '-',
        },
        {
            id: 'email',
            name: 'Emali',
            cell: row => row.email ?? '-',
        },
        {
            id: 'role',
            name: 'Role',
            cell: row => row.role ?? '-',
        },
        {
            name: 'Action',
            cell: row => (
                <Button>Edit</Button>
            ),
            maxWidth: '10px',
            style: { display: 'flex', justifyContent: 'center' },
            allowOverflow: true,
            button: true,
            grow: 0
        },
    ];

    const toggleModalForm = (action: string) => {
        if (isOpenModal) setDataModalForm(undefined);
        setIsOpenModal((open) => !open);
        setActionType(action);
    }

    useEffect(() => {
        if (credential) {
            getUsers(credential); // Pass credential and store setter
        }
    }, [credential]); // Re-run if credential changes

    return (
        <section className='user p-4'>
            <div className='d-flex justify-content-between'>
                <h1>User List</h1>
                <Button
                    className='mt-0'
                    style={{ height: 40 }}
                    onClick={() => toggleModalForm('create')}
                    disabled={isLoading}
                >
                    Create
                </Button>
            </div>
            <div className='w-100'>
                <DataTable<UserItems>
                    data={userList ?? []}
                    columns={columns}
                />
            </div>

            <UserModal
                actionType={actionType}
                show={isOpenModal}
                onHide={() => toggleModalForm(actionType)}
                defaultValue={dataModalForm}
            />
        </section>
    );
};

export default UserPage;