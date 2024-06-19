import React from "react";
import "./ProductsSection.css";

class ProductSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            productsPerPage: 6
        };
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    render() {
        const { products } = this.props;
        const { currentPage, productsPerPage } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
        const totalPages = Math.ceil(products?.length / productsPerPage);
        const maxPageDisplay = 5;
        let startPage = Math.max(currentPage - Math.floor(maxPageDisplay / 2), 1);
        let endPage = Math.min(startPage + maxPageDisplay - 1, totalPages);
        if (endPage - startPage < maxPageDisplay - 1) {
            startPage = Math.max(endPage - maxPageDisplay + 1, 1);
        }
        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return (
            <>
                {products && products.length > 0 ?
                    <div className="container mt-2">
                        <div className="pagination">
                            {pageNumbers.map(number => (
                                <button
                                    key={number}
                                    className={`btn ${currentPage === number ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => this.handlePageChange(number)}
                                >
                                    {number}
                                </button>
                            ))}
                        </div>
                        <div className="row mt-4">
                            {currentProducts.map((product, index) => (
                                <div className="col-lg-4 d-flex align-items-stretch rounded" key={index}>
                                    <div className="card border-dark mb-4 d-flex flex-column">
                                        <div className="card-img-top text-center mt-3">
                                            <img
                                                src={product.p_img}
                                                alt={product.p_name}
                                                style={{ maxHeight: '175px' }}
                                            />
                                        </div>
                                        <div className="card-body flex-grow-1">
                                            <h5 className="card-title">{product.p_name.toUpperCase()}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{product.p_cat.charAt(0).toUpperCase() + product.p_cat.slice(1)}</h6>
                                            <p className="card-text h5">₹{product.p_cost}</p>
                                            <p className="card-text">{product.p_desc}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-evenly">
                                            <a href="#" className="btn btn-outline-info btn-block btn-sm disabled" aria-disabled="true">Learn More</a>
                                            <button
                                                className="btn btn-outline-success btn-block btn-sm"
                                                onClick={() => this.props.handleCartInsert(product.p_id)}
                                            >Add to Cart</button>
                                            <a href="#" className="btn btn-outline-success btn-block btn-sm disabled" aria-disabled="true">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    :
                    <div className="container w-100 mx-auto text-center align-self-center justify-self-center">
                        <div className="spinner-border text-dark mx-auto"></div>
                    </div>
                }
            </>
        );
    }
}

export default React.memo(ProductSection);
