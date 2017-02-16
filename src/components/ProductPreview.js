import React from 'react';
import { Link } from 'react-router';
import './styles/ProductPreview.scss';

export default class ProductPreview extends React.Component {
  render() {
    return (
      // <Link to={`/athlete/${this.props.id}`}>
      //   <div className="athlete-preview">
      //     <img src={`img/${this.props.image}`}/>
      //     <h2 className="name">{this.props.name}</h2>
      //     <span className="medals-count"><img src="/img/medal.png"/> {this.props.medals.length}</span>
      //   </div>
      // </Link>
      <div>hi its me it's {this.props.name} born in <span>{this.props.birth}.</span></div>
    );
  }
}
