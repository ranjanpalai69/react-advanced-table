
import React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const SortingPanel = ({
  open,
  onClose,
  columns,
  sortOptions,
  handleSortingChange,
  handleClearSort,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        role="presentation"
        sx={{
          width: 300, // Increased width for better layout
          padding: 2,
          backgroundColor: "#f5f5f5", // Light background for contrast
          boxShadow: 3, // Add shadow for depth
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2, color: "#1976d2" }}>
          Sort Options
        </Typography>
        <List>
          {columns.map((column) => (
            <ListItem
              key={column.accessorKey}
              sx={{ borderBottom: "1px solid #ddd", padding: 1 }}
            >
              <ListItemText
                primary={column.header}
                sx={{ flex: 1, fontWeight: "bold", color: "#555" }}
              />
              <IconButton
                onClick={() => handleSortingChange(column.accessorKey, "asc")}
                sx={{
                  color:
                    sortOptions[column.accessorKey] === "asc"
                      ? "primary.main"
                      : "inherit",
                }}
              >
                <ArrowUpwardIcon />
              </IconButton>
              <IconButton
                onClick={() => handleSortingChange(column.accessorKey, "desc")}
                sx={{
                  color:
                    sortOptions[column.accessorKey] === "desc"
                      ? "primary.main"
                      : "inherit",
                }}
              >
                <ArrowDownwardIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClearSort}
          sx={{ marginTop: 2, width: "100%" }}
        >
          Clear Sorting
        </Button>
      </Box>
    </Drawer>
  );
};

export default SortingPanel;
