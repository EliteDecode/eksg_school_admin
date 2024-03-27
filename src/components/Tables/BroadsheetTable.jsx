import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { schoolsTableData, teachersData } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { SingleSchoolTransactions, transactions } from "@/lib/generateContent";
import studentImg from "../../assets/images/Gospel.png";
import { useSelector } from "react-redux";

const BroadSheetTable = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const { broadsheet } = useSelector((state) => state.students);

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
      title: "Image",
      dataIndex: "passport",
      width: "100px",
      key: "passport",
      render: (passport) => (
        <img src={passport} alt="" className="w-[70%] rounded-md" />
      ),
    },
    {
      title: "Firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Lastname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Othernames",
      dataIndex: "othername",
      key: "othername",
    },
    {
      title: "Student Code",
      dataIndex: "student_code",
      key: "student_code",
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
    },
    {
      title: "LGA",
      dataIndex: "lga",
      key: "lga",
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

    // {
    //   title: "Scores",
    //   dataIndex: "scores",
    //   key: "scores",
    //   render: (scores) => (
    //     <div>
    //       <table className="min-w-full divide-y divide-gray-200">
    //         <thead className="bg-gray-50">
    //           <tr className="text-center">
    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Subject
    //             </th>
    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               CA1 Score
    //             </th>
    //             <th
    //               scope="col"
    //               className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               CA2 Score
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {scores?.map((item, index) => {
    //             return (
    //               <tr key={index} className="hover:bg-gray-100">
    //                 <td className="px-6 py-4 text-left whitespace-nowrap">
    //                   {item?.subject}
    //                 </td>
    //                 <td className="px-6 py-4 text-center whitespace-nowrap">
    //                   {item?.ca1_score}
    //                 </td>
    //                 <td className="px-6 py-4 text-center whitespace-nowrap">
    //                   {item?.ca_score}
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //     </div>
    //   ),
    // },
  ];
  return (
    <Table
      pagination={false}
      columns={columns}
      size="small"
      dataSource={broadsheet?.broad_sheet}
      scroll
      className="text-[12px]"
    />
  );
};
export default BroadSheetTable;
