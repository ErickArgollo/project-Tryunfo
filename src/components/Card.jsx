import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style/Card.css';

export default class Card extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.props;

    return (

      <div className="info-card-container">
        <div className="teste">
          <div className="name-image-container">
            <p data-testid="name-card" className="cardName">{ cardName }</p>
            <p data-testid="rare-card" className=" rarity">
              { cardRare }
            </p>

            {
              cardImage.length > 0
              && <img data-testid="image-card" src={ cardImage } alt={ cardName } />
            }

          </div>

          <p data-testid="description-card" className="description">
            { cardDescription }
          </p>
          <div className="attrContainer">
            <p data-testid="attr1-card" className="pAttr">
              <span
                className="attr1-bar"
                style={ { width: `${cardAttr1}%` } }
              >
                Força
              </span>
              <span className="attr-number">{ cardAttr1 }</span>
            </p>

            <p data-testid="attr2-card" className="pAttr">
              <span
                className="attr2-bar"
                style={ { width: `${cardAttr2}%` } }
              >
                Inteligência
              </span>
              <span className="attr-number">{ cardAttr2 }</span>
            </p>

            <p data-testid="attr3-card" className="pAttr">
              <span
                className="attr3-bar"
                style={ { width: `${cardAttr3}%` } }
              >
                Agilidade

              </span>
              <span className="attr-number">{ cardAttr3 }</span>
            </p>

            {
              cardTrunfo && <p className="pAttr Super">Super Trunfo</p>
            }
          </div>
        </div>

      </div>

    );
  }
}

Card.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};
