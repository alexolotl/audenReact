import React from 'react';
import { Link } from 'react-router';
import products from '../data/products';
import styles from './styles/ProductPage.scss';
import FaAngleLeft from 'react-icons/fa/angle-left';
import FaAngleRight from 'react-icons/fa/angle-right';

export default class ProductPage extends React.Component {

  render() {

    const id = this.props.params.id;
    const product = products.filter((product) => product.id === id)[0];
    const index = products.indexOf(product);
    if (!product) {
      return <NotFoundPage/>;
    }

    function getNextProduct() {
      return products[index + 1] ? products[index + 1].id : products[0].id;
    }

    function getPrevProduct() {
      return products[index - 1] ? products[index - 1].id : products[products.length-1].id;
    }

    return (

      <div className={styles.productPage}>
        <div className="navigateForward">
          <Link to={`/product/${ getPrevProduct() }`}><FaAngleLeft /></Link>
        </div>
        <div className="product">
          <div className={styles.picture}>
            <img src={require(`../static/img/${product.img}`)}/>
          </div>
          <div className={styles.details}>
            <h2>{product.name}</h2>
            <p className={styles.centered}>
              {product.description}
            </p>
          </div>
        </div>
        <div className="navigateBack">
          <Link to={`/product/${ getNextProduct() }`}><FaAngleRight /></Link>
        </div>
      </div>

    );
  }
}
