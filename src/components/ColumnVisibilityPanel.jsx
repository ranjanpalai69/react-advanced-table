
import React from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";

const ColumnVisibilityPanel = ({
  open,
  onClose,
  columns,
  columnsVisibility,
  handleToggleColumn,
  handleApplyColumns,
  handleShowAll,
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
          Column Visibility
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
              <Switch
                checked={columnsVisibility[column.accessorKey]}
                onChange={() => handleToggleColumn(column.accessorKey)}
                sx={{ color: "#1976d2" }} // Custom switch color
              />
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleShowAll}
          sx={{
            marginTop: 1,
            width: "100%",
            textTransform: "none",
          }} // Styled button
          variant="outlined"
          color="primary"
        >
          Show All Column
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleApplyColumns}
          sx={{ marginTop: 2, width: "100%" }} // Full width
        >
          Apply
        </Button>
      </Box>
    </Drawer>
  );
};

export default ColumnVisibilityPanel;
