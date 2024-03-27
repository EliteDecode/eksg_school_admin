import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { schoolsTableData, teachersData } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { SingleSchoolTransactions, transactions } from "@/lib/generateContent";

const StudentsTables = ({ filteredStudents, localStore }) => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleViewStudent = (id, pin) => {
    navigate(`/dashboard/students/${id}`, {
      state: { synced: pin ? true : false },
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          {/* <Button
            type="success"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button> */}
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
      ...getColumnSearchProps("firstname"),
    },
    {
      title: "Lastname",
      dataIndex: "surname",
      key: "surname",
      ...getColumnSearchProps("surname"),
    },
    {
      title: "Othernames",
      dataIndex: "othername",
      key: "othername",
      ...getColumnSearchProps("othername"),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => <span className="capitalize">{gender}</span>,
    },
    {
      title: "State of Origin",
      dataIndex: "state_of_origin",
      key: "state_of_origin",
      ...getColumnSearchProps("state_of_origin"),
    },

    {
      title: "DOB",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (date_of_birth) => (
        <span className="capitalize">
          {new Date(date_of_birth).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      title: "Pin",
      dataIndex: "pin",
      key: "pin",
    },

    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Button
            size="medium"
            disabled={record.pin && navigator.onLine === false}
            className="border border-primary text-primary text-[10px] font-semibold "
            onClick={() => handleViewStudent(record.id, record.pin)}>
            View Student
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={filteredStudents}
      scroll
      className="text-[12px]"
    />
  );
};
export default StudentsTables;
