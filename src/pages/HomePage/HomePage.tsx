import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Button, Dropdown } from 'react-bootstrap';
import './style.css'
import { useAuth } from '../../data/auth/store';
import { useTerazzo } from '../../data/terazzo/store';
import { UserItems } from '../../data/terazzo/type';
import { getUsers } from '../../data/terazzo/client';

const UserPage: React.FC = () => {
    const { credential } = useAuth(); // Get Bearer token
    const { userList, setUserList } = useTerazzo();
    const [actionType, setActionType] = useState<string>('');
    const [dataModalForm, setDataModalForm] = useState<UserItems>();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const columns: TableColumn<UserItems>[] = [
        {
            id: 'no',
            name: 'No',
            cell: (row, index) => index + 1,
            width: '60px'
        },
        {
            id: 'name',
            name: 'Quotation #',
            cell: row => 'QUO/22/12/2024/0001',
        },
        {
            id: 'email',
            name: 'Product Name',
            cell: row => 'Wastafel Custom T90cm L40cm Abu Abu Teraso',
            minWidth: '200px'
        },
        {
            id: 'customer',
            name: 'Customer',
            cell: row => 'Ningsih Putri',
        },
        {
            id: 'status',
            name: 'Status',
            cell: row => 'Draft',
        },
        {
            id: 'createdDate',
            name: 'Created Date',
            cell: row => '22 Des 2024',
        },
        {
            id: 'role',
            name: 'Sales',
            cell: row => row.name ?? '-',
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
        <section className='quotation p-4'>
            <div className='d-flex justify-content-between'>
                <h1>Quotation Request</h1>
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
                    pagination
                    data={userList ?? []}
                    columns={columns}
                />
            </div>

            {/* <UserModal
                actionType={actionType}
                show={isOpenModal}
                onHide={() => toggleModalForm(actionType)}
                defaultValue={dataModalForm}
            /> */}
        </section>
    );
};

export default UserPage;