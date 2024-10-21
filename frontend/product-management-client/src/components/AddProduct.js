// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AddProduct = ({ onProductAdded, product }) => {
//     const [name, setName] = useState('');
//     const [price, setPrice] = useState('');
//     const [description, setDescription] = useState('');
//     const [imageUrl, setImageUrl] = useState('');

//     // Set the form fields to the product values if editing
//     useEffect(() => {
//         if (product) {
//             setName(product.name);
//             setPrice(product.price);
//             setDescription(product.description);
//             setImageUrl(product.imageUrl);
//         } else {
//             // Clear form if no product is passed (for adding new product)
//             setName('');
//             setPrice('');
//             setDescription('');
//             setImageUrl('');
//         }
//     }, [product]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const newProduct = { name, price, description, imageUrl };
//         try {
//             if (product) {
//                 // If editing, update the product
//                 await axios.put(`https://localhost:7234/api/Products/${product.id}`, newProduct);
//             } else {
//                 // If adding, create a new product
//                 await axios.post('https://localhost:7234/api/Products', newProduct);
//             }
//             onProductAdded(); // Callback to refresh the product list
//         } catch (error) {
//             console.error('Error saving product:', error);
//         }
//     };

//     return (
       
//             <form onSubmit={handleSubmit} className="mb-3">
//             <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" required
//         className="form-control mb-2" />
            
//             <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required className="form-control mb-2"/>
            
//             <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required className="form-control mb-2" />
           
//             <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" required className="form-control mb-2" />
//             <button type="submit" className="btn btn-primary">{product ? 'Update Product' : 'Add Product'}</button>
//         </form>
//     );
// };

// export default AddProduct;





// AddProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = ({ onProductAdded, product }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setImageUrl(product.imageUrl);
        } else {
            setName('');
            setPrice('');
            setDescription('');
            setImageUrl('');
        }
    }, [product]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage(''); // Reset error message
       
        const newProduct = { name, price: parseFloat(price), description, imageUrl };

       

            try {
                if (product) {
                    // Include the ID when updating an existing product
                    newProduct.id = product.id; // Add this line to include the ID
        
                    await axios.put(`https://localhost:7234/api/Products/${product.id}`, newProduct); // Update existing product
                } else {
                    await axios.post('https://localhost:7234/api/Products', newProduct); // Create new product
                }
                onProductAdded(); // Callback to refresh the product list

        } catch (error) {
            setErrorMessage('Error saving product. Please try again.');
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);

       
        }
    };

    // return (
    //     <form onSubmit={handleSubmit} className="mb-3">
    //         {errorMessage && <p className="text-danger">{errorMessage}</p>}
    //         <input
    //             value={name}
    //             onChange={e => setName(e.target.value)}
    //             placeholder="Product Name"
    //             required
    //             className="form-control mb-2"
    //         />



    //         <input
    //             value={price}
    //             onChange={e => setPrice(e.target.value)}
    //             placeholder="Price"
    //             required
    //             className="form-control mb-2"
    //         />
    //         <textarea
    //             value={description}
    //             onChange={e => setDescription(e.target.value)}
    //             placeholder="Description"
    //             required
    //             className="form-control mb-2"
    //         />
    //         <input
    //             value={imageUrl}
    //             onChange={e => setImageUrl(e.target.value)}
    //             placeholder="Image URL"
    //             required
    //             className="form-control mb-2"
    //         />
    //         <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
    //             {product ? 'Update Product' : 'Add Product'}
    //         </button>
    //     </form>
    // );

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="mb-3">
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Product Name"
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    placeholder="Price"
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <input
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {product ? 'Update Product' : 'Add Product'}
            </button>
        </form>
    );
    
};

export default AddProduct;
