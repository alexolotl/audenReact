import React from 'react';
import ProductPreview from './ProductPreview';
import ProductView from './ProductView';
import HomePage from './HomePage';
import products from '../data/products';
import styles from './styles/IndexPage.scss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    }
  }
  componentDidMount() {

  }
  handleNextPage() {
    let newPage = (this.state.currentPage >= products.length) ? 0 : this.state.currentPage + 1;
    this.setState({currentPage: newPage});
  }
  handlePrevPage() {
    let newPage = (this.state.currentPage <= 1) ? products.length : this.state.currentPage - 1;
    this.setState({currentPage: newPage});
  }
  render() {
    return (
      <div className={styles.index}>


        <CSSTransitionGroup transitionAppear={true} transitionAppearTimeout={0} transitionEnterTimeout={3000} transitionName="example" transitionLeave={true} transitionLeaveTimeout={3000}>
          {this.state.currentPage == 0 && <HomePage key={"home"} nextPage={this.handleNextPage.bind(this)} />}
          {this.state.currentPage != 0 && <ProductView key={"product"} nextPage={this.handleNextPage.bind(this)} prevPage={this.handlePrevPage.bind(this)} id={this.state.currentPage} />}
        </CSSTransitionGroup>

      </div>
    );
  }
}
