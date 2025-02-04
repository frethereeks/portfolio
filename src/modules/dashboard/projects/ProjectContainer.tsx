"use client"
import { useState } from "react"
import { Modal, Table, TableProps } from 'antd'
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import React from 'react'
import { PROJECT_COLUMNS } from './column'
import { TCategory, TProjectProps } from "@/types";
import { DeleteModal } from "@/components";
import { $Enums } from "@prisma/client";
import AddProject from "./components/AddProject";

type PageProps = {
  data: TProjectProps[] | undefined
  category: TCategory[] | undefined
  role: $Enums.PortRole
}

export default function ProjectContainer({ data, category, role }: PageProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const [selectedData, setSelectedData] = useState<TProjectProps>()

  React.useEffect(() => {
    setSelectedData(data?.find(el => el.id === selectedRowKeys[0]))
    // eslint-disable-next-line
  }, [selectedRowKeys])

  const rowSelection: TableProps<TProjectProps>["rowSelection"] = {
    selectedRowKeys,
    type: "checkbox",
    onChange(keys: React.Key[]) {
      if (role === "USER") {
        return false;
      }
      else setSelectedRowKeys(keys)
    }
  }

  return (
    <>
      <DeleteModal key={"8012469234"} openModal={deleteModal} closeModal={setDeleteModal} data={selectedRowKeys} table='menu' />
      <Modal style={{ zIndex: 1040, position: "relative" }} open={uploadModal} afterClose={() => {
        setSelectedRowKeys([])
        setSelectedData(undefined)
      }} onCancel={() => setUploadModal(!uploadModal)} cancelButtonProps={{ style: { width: "93.5%", marginLeft: "0", marginRight: "1rem" } }} okButtonProps={{ style: { display: "none" } }}>
        <AddProject data={selectedData} category={category} closeModal={setUploadModal} />
      </Modal>
      <>
        <section className='flex flex-col gap-4 min-w-96 overflow-x-scroll relative overflow-y-visible'>
          <div className="flex bg-white justify-between gap-4 p-4">
            <div className="flex items-center gap-2">
              <h4 className="text-text text-lg md:text-xl font-semibold pr-4">Project List</h4>
              {role !== "USER" && <button onClick={() => setUploadModal(!uploadModal)} className="button bg-secondary py-1">Create Project</button>}
            </div>
            <div className="flex gap-2">
              {role !== "USER" && (
                <>
                  {(selectedRowKeys.length === 1) && <button onClick={() => setUploadModal(!uploadModal)} className="button flex items-center gap-2"><BsPencil /> Edit</button>}
                  {(selectedRowKeys.length > 0) && <button onClick={() => setDeleteModal(!deleteModal)} className="button bg-secondary flex items-center gap-2"><AiOutlineDelete /> Delete Selected</button>}
                </>
              )}
            </div>
          </div>
          <div className="card bg-white flex flex-col p-4">
            <Table
              pagination={{
                hideOnSinglePage: true,
                // pageSize: 10,
                showSizeChanger: false,
                showQuickJumper: false,
              }}
              scroll={{ x: "max-content" }}
              rowSelection={{ ...rowSelection }}
              dataSource={role === "USER" ? data : data?.map(el => ({ ...el, key: el.id }))}
              columns={PROJECT_COLUMNS()}
            />
          </div>
        </section>
      </>
    </>
  )
}
