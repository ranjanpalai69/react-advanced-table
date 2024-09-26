
import React from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Slider,
  Typography,
  Chip,
} from "@mui/material";

const FilterPanel = ({
  open,
  onClose,
  filters,
  handleFilterChange,
  handleCategoryChange,
  handleSubcategoryChange,
  handlePriceRangeChange,
  handleSalePriceRangeChange,
  handleDateRangeChange,
  handleClearFilters,
  handleRemoveCategory,
  handleRemoveSubcategory,
  uniqueCategories,
  uniqueSubcategories,
}) => {
  const { createdAtFrom, createdAtTo, updatedAtFrom, updatedAtTo } = filters;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 500,
          padding: 3,
          backgroundColor: "#f5f5f5",
          borderLeft: "2px solid #1976d2",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
          Filter Panel
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            value={filters.category}
            onChange={handleCategoryChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleRemoveCategory(value)}
                    sx={{ backgroundColor: "#1976d2", color: "#fff" }}
                  />
                ))}
              </Box>
            )}
          >
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            multiple
            value={filters.subcategory}
            onChange={handleSubcategoryChange}
            input={<OutlinedInput label="Subcategory" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleRemoveSubcategory(value)}
                    sx={{ backgroundColor: "#1976d2", color: "#fff" }}
                  />
                ))}
              </Box>
            )}
          >
            {uniqueSubcategories.map((subcategory) => (
              <MenuItem key={subcategory} value={subcategory}>
                {subcategory}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Created At From"
              name="createdAtFrom"
              value={createdAtFrom || ""}
              onChange={(e) =>
                handleDateRangeChange("createdAtFrom", e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Created At To"
              name="createdAtTo"
              value={createdAtTo || ""}
              onChange={(e) =>
                handleDateRangeChange("createdAtTo", e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Updated At From"
              name="updatedAtFrom"
              value={updatedAtFrom || ""}
              onChange={(e) =>
                handleDateRangeChange("updatedAtFrom", e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="date"
              label="Updated At To"
              name="updatedAtTo"
              value={updatedAtTo || ""}
              onChange={(e) =>
                handleDateRangeChange("updatedAtTo", e.target.value)
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Price Range
          </Typography>
          <Slider
            value={filters.priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={220}
            sx={{
              color: "#1976d2",
              "& .MuiSlider-thumb": {
                backgroundColor: "#fff",
                border: "2px solid #1976d2",
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Sale Price Range
          </Typography>
          <Slider
            value={filters.salePriceRange}
            onChange={handleSalePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={220}
            sx={{
              color: "#1976d2",
              "& .MuiSlider-thumb": {
                backgroundColor: "#fff",
                border: "2px solid #1976d2",
              },
            }}
          />
        </Box>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleClearFilters}
          sx={{ mt: 2 }}
        >
          Clear Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterPanel;
