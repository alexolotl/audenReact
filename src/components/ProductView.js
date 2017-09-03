import React from 'react';
import { Link } from 'react-router';
import products from '../data/products';
import styles from './styles/ProductPage.scss';
import FaAngleLeft from 'react-icons/fa/angle-left';
import FaAngleRight from 'react-icons/fa/angle-right';

export default class ProductView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const id = products[this.props.id - 1].id;
    const product = products.filter((product) => product.id === id)[0];
    const index = products.indexOf(product);
    if (!product) {
      return <NotFoundPage/>;
    }

    return (

      <div className={styles.productPage}>
        <div className="navigateForward">
          <FaAngleLeft onClick={this.props.prevPage} />
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
          <FaAngleRight onClick={this.props.nextPage} />
        </div>
      </div>

    );
  }
}
