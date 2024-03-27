import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { schoolsTableData } from "@/lib/utils";
import { Link } from "react-router-dom";
import { transactions } from "@/lib/generateContent";

const TransactionTables = ({ category }) => {
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
      title: " TId",
      dataIndex: "TransactionId",
      key: "TransactionId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      width: "22%",
      sorter: (a, b) => a.paymentMode.length - b.paymentMode.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created At",
      dataIndex: "dateCreated",
      key: "dateCreated",
      width: "18%",
      sorter: (a, b) => a.dateCreated.length - b.dateCreated.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Valid Till",
      dataIndex: "validTill",
      width: "20%",
      key: "validTill",
      sorter: (a, b) => a.validTill.length - b.validTill.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount.length - b.amount.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <span>
          <Tag
            color={
              status == "Successful"
                ? "success"
                : status === "Pending"
                ? "warning"
                : "error"
            }
            key={status}>
            {status}
          </Tag>
        </span>
      ),
    },

    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (_, record) => (
        <Space>
          <Link to={`/dashboard/transactions/${record.TransactionId}`}>
            <Button
              size="medium"
              className="border border-primary text-primary text-[10px] font-semibold ">
              View Transaction
            </Button>
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={filteredTransactions} />;
};
export default TransactionTables;
