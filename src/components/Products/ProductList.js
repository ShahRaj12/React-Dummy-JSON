import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../../redux/slices/productSlice";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Pagination } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, total, currentPage } = useSelector((state) => state.product);
  const totalPages = Math.ceil(total / 10);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: "", title: "", price: "", category: "" });

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (event, value) => {
    dispatch(fetchProducts(value));
  };

  const handleOpen = (product = null) => {
    setEditMode(!!product);
    setCurrentProduct(product || { id: "", title: "", price: "", category: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (editMode) {
      dispatch(updateProduct({ id: currentProduct.id, productData: currentProduct }));
    } else {
      dispatch(addProduct(currentProduct));
    }
    handleClose();
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Product List</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => handleOpen()}>
        Add Product
      </Button>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => handleOpen(product)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
        </>
      )}

      {/* Dialog for Add/Edit Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            value={currentProduct.title}
            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
          />
          <TextField
            fullWidth
            label="Price"
            margin="dense"
            type="number"
            value={currentProduct.price}
            onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
          />
          <TextField
            fullWidth
            label="Category"
            margin="dense"
            value={currentProduct.category}
            onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">{editMode ? "Update" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;
