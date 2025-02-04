"use client"

import { Modal, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { ADMIN_COLUMN } from './columns'
import { DeleteModal } from '@/components'
import AddAdmin from './components/AddAdmin'
import { TAdminProps } from '@/types'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { $Enums } from '@prisma/client'

type PageProps = {
    data: TAdminProps[],
    role: $Enums.PortRole
}

export default function AdminContainer({ data, role }: PageProps) {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [deleteModal, setDeleteModal] = useState<boolean>(false)
    const [addModal, setAddModal] = useState<boolean>(false)
    const [selectedData, setSelectedData] = useState<TAdminProps>()

    useEffect(() => {
        setSelectedData(data.find(el => el.id === selectedRowKeys[0]))
        // eslint-disable-next-line
    }, [selectedRowKeys])

    const rowSelection: TableProps<TAdminProps>["rowSelection"] = {
        selectedRowKeys,
        type: "checkbox",
        onChange(rows: React.Key[]) {
            setSelectedRowKeys(rows)
        },
    }

    return (
        <>
            <Modal
                key={"7fow4eu6dmy89l"}
                open={addModal}
                afterClose={() => {
                    setSelectedRowKeys([])
                    setSelectedData(undefined)
                }}
                onCancel={() => setAddModal(!addModal)}
                cancelButtonProps={{ style: { width: "35%", marginLeft: "0", marginRight: "1rem" } }}
                okButtonProps={{ style: { display: "none" } }}
            >
                <AddAdmin key={"6899d76uj5s79"} closeModal={setAddModal} data={selectedData} />
            </Modal>
            <DeleteModal key={"568gyfd012adf5sf573gdf"} closeModal={setDeleteModal} openModal={deleteModal} table='category' data={selectedRowKeys} />
            <main className='relative flex flex-col gap-4 p-4'>
                <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll'>
                    <div className="flex bg-white justify-between gap-4 p-4">
                        <div className="flex items-center gap-2">
                            <h4 className="text-text text-lg md:text-xl font-semibold pr-4">Admin List</h4>
                            {role !== "USER" && <button onClick={() => setAddModal(!addModal)} className="button bg-secondary text-primary py-1">Create Admin</button>}
                        </div>
                        <div className="flex gap-2">
                            {role !== "USER" && (
                                <>
                                    {(selectedRowKeys.length === 1) && <button onClick={() => setAddModal(!addModal)} className="button flex items-center gap-2"><BsPencil /> Edit</button>}
                                    {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-secondary flex items-center gap-2"><AiOutlineDelete /> Delete Selected</button>}
                                </>
                            )}
                        </div>
                    </div>
                    <div className="card bg-white flex flex-col p-4">
                        <Table
                            rowSelection={{ ...rowSelection }}
                            dataSource={data.map(el => ({ ...el, key: el.id }))}
                            columns={ADMIN_COLUMN()}
                        />
                    </div>
                </section>
            </main>
        </>
    )
}
