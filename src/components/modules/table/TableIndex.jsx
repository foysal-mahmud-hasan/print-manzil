import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useViewportSize } from "@mantine/hooks";
import axios from "axios";
import sortBy from "lodash/sortBy";
import dayjs from "dayjs";
import { ScrollArea, TextInput, Box } from "@mantine/core";

const PAGE_SIZES = [10, 15, 20, 50, 100];

export default function TableIndex() {
  const [records, setRecords] = useState([]);
  const [allData, setAllData] = useState([]);
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: "name",
    direction: "asc",
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [search, setSearch] = useState("");

  const { height } = useViewportSize();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.razzakfashion.com/", {
          params: {
            paginate: 100,
          },
        });

        const data = response.data.data || [];
        setAllData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = allData;
    if (search) {
      filteredData = allData.filter((item) => {
        const searchLower = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower) ||
          item.created_at.toLowerCase().includes(searchLower)
        );
      });
    }

    const sortedData = sortBy(filteredData, sortStatus.columnAccessor);
    const finalData =
      sortStatus.direction === "desc" ? sortedData.reverse() : sortedData;

    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(finalData.slice(from, to));
  }, [allData, sortStatus, page, pageSize, search]);

  useEffect(() => {
    setPage(1);
  }, [search]);
  const [selectedRecords, setSelectedRecords] = useState([]);
  return (
    <ScrollArea h={height - 46}>
      <Box>
        <TextInput
          bg={"#19191e"}
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          styles={{
            input: { backgroundColor: "black" },
            wrapper: {
              outline: "2px solid green",
              outlineOffset: "-2px  ",
            },
          }}
        />
      </Box>
      <DataTable
        records={records}
        columns={[
          {
            accessor: "id",
            title: "ID",
            width: "10%",
            sortable: true,
          },
          {
            accessor: "name",
            title: "First Name",
            sortable: true,
            render: (item) => item.name.split(" ")[0],
          },
          {
            accessor: "lastName",
            title: "Last Name",
            sortable: false,
            render: (item) => item.name.split(" ").slice(1).join(" "),
          },
          {
            accessor: "email",
            title: "Email",
            width: "30%",
            render: (item) => item.email || "N/A",
          },
          {
            accessor: "created_at",
            title: "Created At",
            width: "20%",
            sortable: true,
            render: (item) => dayjs(item.created_at).format("MMM D, YYYY"),
          },
        ]}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
        totalRecords={allData.length}
        recordsPerPage={pageSize}
        page={page}
        onPageChange={setPage}
        height={height - 82}
        recordsPerPageOptions={PAGE_SIZES}
        onRecordsPerPageChange={setPageSize}
        paginationText={({ from, to, totalRecords }) =>
          `${from} - ${to} / ${totalRecords}`
        }
        c={"white"}
        paginationSize="sm"
        paginationWrapBreakpoint="sm"
        backgroundColor={"#19191e"}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </ScrollArea>
  );
}
