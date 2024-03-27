import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { schoolsTableData } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SchoolsTables = ({ class_taken }) => {
  const { schools, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.schools
  );

  const filtered =
    class_taken === "CE"
      ? schools?.data?.CE?.schools
      : class_taken === "JSS3"
      ? schools?.data?.JSS3?.schools
      : schools?.data?.SS2?.schools;

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
          <Button
            type="success"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
          {/* <Button
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
          </Button> */}
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
      title: "Name",
      dataIndex: "school_name",
      key: "school_name",
      width: "40%",
      ...getColumnSearchProps("school_name"),
    },

    {
      title: "LGA",
      dataIndex: "local_government",
      key: "local_government",

      ...getColumnSearchProps("local_government"),
      sorter: (a, b) => a.local_government.length - b.local_government.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: " Code",
      key: "school_code",
      dataIndex: "school_code",
    },
    {
      title: "Owner",
      key: "owner",
      dataIndex: "owner",
      sorter: (a, b) => a.owner.length - b.owner.length,
      sortDirections: ["descend", "ascend"],
      render: (owner) => <span className="capitalize">{owner}</span>,
    },
    {
      title: "Pin",
      key: "pin",
      dataIndex: "pin",
    },
    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`/dashboard/schools/${record.id}`}>
            <Button
              size="medium"
              className="border border-primary text-primary text-[10px] font-semibold ">
              View School
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={filtered} />;
};
export default SchoolsTables;
