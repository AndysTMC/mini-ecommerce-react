import React from "react";
import Cookies from 'js-cookie';
import { userAuth } from "../../api_services/userApiService";
import withRouter from "../../hocs/withRouter";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import ProductsSection from "../ProductsSection/ProductsSection";
import CartSection from "../CartSection/CartSection";
import { fetchAllProducts } from "../../api_services/productApiService"
import { fetchCart, insertIntoCart, deleteFromCart, updateCart } from "../../api_services/cartApiService"


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            products: [],
            cart: []
        }
    }
    handleCartInsert = (p_id) => {
        if(!this.state.loggedIn) return this.props.navigate('/login', { replace: true });
        insertIntoCart(p_id).then((data) => {
            if (data.insert === 'success') {
                this.handleCartFetch();
            }
        })
    }
    handleCartFetch = () => {
        if(!this.state.loggedIn) return this.props.navigate('/login', { replace: true });
        fetchCart().then((data) => {
            console.log(data);
            this.setState({ cart: data.cart ? data.cart : [] });
        })

    }
    handleCartUpdate = (p_id, qty_change) => {
        if(!this.state.loggedIn) return this.props.navigate('/login', { replace: true });
        updateCart(p_id, qty_change).then((data) => {
            if (data.update === 'success') {
                this.handleCartFetch();
            }
        })
    }
    handleCartDelete = (p_id) => {
        if(!this.state.loggedIn) return this.props.navigate('/login', { replace: true });
        deleteFromCart(p_id).then((data) => {
            if (data.delete === 'success') {
                this.handleCartFetch();
            }
        })
    }
    handleProductsFetch = () => {
        fetchAllProducts().then((data) => {
            this.setState({ products: data.products });
        });
    }
    render() {
        return (
            <div className="home bg-darkgrey">
                <Navbar loggedIn={this.state.loggedIn} logout={this.logout} />
                <div className="home-content">
                    <div className="products-section bg-black">
                        <ProductsSection
                            products={this.state.products}
                            setProducts={(newProducts) => this.setState({ products: newProducts })}
                            handleCartInsert={this.handleCartInsert}
                        />
                    </div>
                    <div className="cart-section bg-black p-1">
                        <CartSection
                            products={this.state.products}
                            handleCartUpdate={this.handleCartUpdate}
                            handleCartDelete={this.handleCartDelete}
                            cart={this.state.cart}
                        />
                    </div>
                </div>

            </div>
        )
    }
    componentDidUpdate() {
        if (this.state.status === 'success') {
            this.props.navigate('/login', { replace: true })
        }
        if (this.state.loggedIn) {
            this.handleCartFetch();
        }
    }
    componentDidMount() {
        this.checkTokenExpiration();
        if (this.state.loggedIn) {
            this.handleCartFetch();
        }
        this.handleProductsFetch();
    }
    checkTokenExpiration = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await userAuth();
                if (res.auth === 'failure') {
                    Cookies.remove('token');
                } else {
                    this.setState({ loggedIn: true })
                }
            } catch (error) {
                Cookies.remove('token');
            }
        }
    }
    logout = () => {
        Cookies.remove('token');
        this.setState({ loggedIn: false, cart: [] })
    }
}

export default withRouter(Home);
