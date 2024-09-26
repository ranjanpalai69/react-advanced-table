import React, { useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { format } from "date-fns";
import sampleData from "../sampleData.json"; // Import the sample data
import ColumnVisibilityPanel from "./ColumnVisibilityPanel";
import SortingPanel from "./SortingPanel";
import FilterPanel from "./FilterPanel";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

export const MainComponent = () => {
  const [openColumns, setOpenColumns] = useState(false);
  const [openSorting, setOpenSorting] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  // Initialize columnsVisibility to show all columns by default
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "subcategory", header: "Subcategory" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) =>
          format(new Date(cell.getValue()), "dd-MMM-yyyy HH:mm"),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) =>
          format(new Date(cell.getValue()), "dd-MMM-yyyy HH:mm"),
      },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "sale_price", header: "Sale Price" },
    ],
    []
  );

  const initialVisibility = useMemo(() => {
    const visibility = {};
    columns.forEach((column) => {
      visibility[column.accessorKey] = true; // Show all columns by default
    });
    return visibility;
  }, [columns]);

  const [columnsVisibility, setColumnsVisibility] = useState(initialVisibility);
  const [appliedVisibility, setAppliedVisibility] = useState(initialVisibility);

  const [sortOptions, setSortOptions] = useState({});
  const [filters, setFilters] = useState({
    name: "",
    category: [],
    subcategory: [],
    createdAtFrom: null,
    createdAtTo: null,
    updatedAtFrom: null,
    updatedAtTo: null,
    priceRange: [0, 220],
    salePriceRange: [0, 220],
  });

  const uniqueCategories = useMemo(() => {
    return [...new Set(sampleData.map((item) => item.category))];
  }, []);

  const uniqueSubcategories = useMemo(() => {
    return [...new Set(sampleData.map((item) => item.subcategory))];
  }, []);

  const handleToggleColumn = (columnKey) => {
    setColumnsVisibility((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  const handleApplyColumns = () => {
    setAppliedVisibility(columnsVisibility);
    setOpenColumns(false);
  };

  const handleShowAll = () => {
    const newVisibility = {};
    columns.forEach((column) => {
      newVisibility[column.accessorKey] = true; // Show all columns
    });
    setColumnsVisibility(newVisibility);
  };

  const handleSortingChange = (columnKey, direction) => {
    setSortOptions((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey] === direction ? null : direction,
    }));
  };

  const handleClearSort = () => {
    setSortOptions({});
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setFilters((prev) => ({
      ...prev,
      category: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleSubcategoryChange = (event) => {
    const { value } = event.target;
    setFilters((prev) => ({
      ...prev,
      subcategory: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handlePriceRangeChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: newValue,
    }));
  };

  const handleSalePriceRangeChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      salePriceRange: newValue,
    }));
  };

  const handleDateRangeChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      name: "",
      category: [],
      subcategory: [],
      createdAtFrom: null,
      createdAtTo: null,
      updatedAtFrom: null,
      updatedAtTo: null,
      priceRange: [0, 220],
      salePriceRange: [0, 220],
    });
  };

  const filteredData = sampleData.filter((item) => {
    const createdAt = new Date(item.createdAt);
    const updatedAt = new Date(item.updatedAt);
    return (
      (filters.name === "" ||
        item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.category.length === 0 ||
        filters.category.includes(item.category)) &&
      (filters.subcategory.length === 0 ||
        filters.subcategory.includes(item.subcategory)) &&
      (!filters.createdAtFrom ||
        createdAt >= new Date(filters.createdAtFrom)) &&
      (!filters.createdAtTo || createdAt <= new Date(filters.createdAtTo)) &&
      (!filters.updatedAtFrom ||
        updatedAt >= new Date(filters.updatedAtFrom)) &&
      (!filters.updatedAtTo || updatedAt <= new Date(filters.updatedAtTo)) &&
      item.price >= filters.priceRange[0] &&
      item.price <= filters.priceRange[1] &&
      item.sale_price >= filters.salePriceRange[0] &&
      item.sale_price <= filters.salePriceRange[1]
    );
  });

  const sortedData = useMemo(() => {
    const sorted = [...filteredData]; // Create a copy of the filtered data

    // Apply sorting based on sortOptions
    Object.entries(sortOptions).forEach(([columnKey, direction]) => {
      if (direction) {
        sorted.sort((a, b) => {
          if (direction === "asc") {
            return a[columnKey] > b[columnKey] ? 1 : -1;
          } else {
            return a[columnKey] < b[columnKey] ? 1 : -1;
          }
        });
      }
    });

    return sorted;
  }, [filteredData, sortOptions]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box textAlign={"right"} pr={2}>
        <Tooltip title="Manage Columns">
          <IconButton onClick={() => setOpenColumns(true)}>
            <ViewWeekIcon />{" "}
          </IconButton>
        </Tooltip>
        <Tooltip title="Manage Sorting">
          <IconButton onClick={() => setOpenSorting(true)}>
            <SortIcon />{" "}
          </IconButton>
        </Tooltip>
        <Tooltip title="Manage Filters">
          <IconButton onClick={() => setOpenFilters(true)}>
            <FilterAltIcon />{" "}
          </IconButton>
        </Tooltip>
      </Box>
      <MaterialReactTable
        columns={columns.filter(
          (column) => appliedVisibility[column.accessorKey]
        )}
        data={sortedData}
        enableColumnActions={false}
        enableColumnFilters={true}
        enableSorting={true}
        enableGrouping={true}
        enableGlobalFilter={true}
        initialState={{
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
          sorting: Object.entries(sortOptions)
            .filter(([_, direction]) => direction)
            .map(([columnKey, direction]) => ({
              id: columnKey,
              desc: direction === "desc",
            })),
        }}
      />
      <ColumnVisibilityPanel
        open={openColumns}
        onClose={() => setOpenColumns(false)}
        columns={columns}
        columnsVisibility={columnsVisibility}
        handleToggleColumn={handleToggleColumn}
        handleApplyColumns={handleApplyColumns}
        handleShowAll={handleShowAll}
      />
      <SortingPanel
        open={openSorting}
        onClose={() => setOpenSorting(false)}
        columns={columns}
        sortOptions={sortOptions}
        handleSortingChange={handleSortingChange}
        handleClearSort={handleClearSort}
      />
      <FilterPanel
        open={openFilters}
        onClose={() => setOpenFilters(false)}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleCategoryChange={handleCategoryChange}
        handleSubcategoryChange={handleSubcategoryChange}
        handlePriceRangeChange={handlePriceRangeChange}
        handleSalePriceRangeChange={handleSalePriceRangeChange}
        handleDateRangeChange={handleDateRangeChange}
        handleClearFilters={handleClearFilters}
        uniqueCategories={uniqueCategories}
        uniqueSubcategories={uniqueSubcategories}
      />
    </Box>
  );
};

export default MainComponent;
