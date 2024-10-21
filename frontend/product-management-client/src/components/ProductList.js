import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://localhost:7234/api/Products');
            setProducts(response.data);
        } catch (error) {
            setError('There was an error fetching the products!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleProductAdded = () => {
        fetchProducts();
        setEditingProduct(null);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://localhost:7234/api/Products/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center">Product List</h1>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-4"
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <div className="row">
                    {filteredProducts.map(product => (
                        <div className="col-md-4" key={product.id}>
                            <div className="card mb-4">
                                <img src={product.imageUrl} alt={product.name} className="card-img-top" style={{ width: '100px', height: '100px' }} />

                               
                               
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    {/* <p className="card-text">₦{product.price}</p> */}
                                    <p className="card-text"> ₦{product.price.toLocaleString()}
                                    </p>
                                    <p>{product.description}</p>
                                    <button className="btn btn-warning" onClick={() => handleEdit(product)}> <i className="fas fa-edit"></i>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>  <i className="fas fa-trash"></i>Delete</button>
                             </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <AddProduct onProductAdded={handleProductAdded} product={editingProduct} />
        </div>
    );
};

export default ProductList;
