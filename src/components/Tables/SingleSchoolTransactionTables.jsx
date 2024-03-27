import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { schoolsTableData } from "@/lib/utils";
import { Link } from "react-router-dom";
import { SingleSchoolTransactions, transactions } from "@/lib/generateContent";

const SingleSchoolTransactionTables = ({ category }) => {
  const filteredTransactions =
    category == "all"
      ? transactions
      : transactions.filter((item) => item.status == category);
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
      title: "S/N",
      dataIndex: "SerialNo",
      key: "SerialNo",
    },
    {
      title: "Name",
      dataIndex: "StudentName",
      key: "StudentName",
      width: "20%",
      ...getColumnSearchProps("StudentName"),
    },
    {
      title: "Result Pin",
      dataIndex: "ResultPin",
      key: "ResultPin",
      width: "22%",
    },
    {
      title: "Class",
      dataIndex: "Class",
      key: "Class",
      width: "22%",
    },
    {
      title: "Created At",
      dataIndex: "DateCreated",
      key: "DateCreated",
      width: "18%",
      sorter: (a, b) => a.DateCreated.length - b.DateCreated.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Valid Till",
      dataIndex: "ValidTill",
      width: "20%",
      key: "ValidTill",
      sorter: (a, b) => a.ValidTill.length - b.ValidTill.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={SingleSchoolTransactions}
      scroll
      className="text-[12px]"
    />
  );
};
export default SingleSchoolTransactionTables;
