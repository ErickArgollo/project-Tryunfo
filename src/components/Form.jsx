import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './style/Form.css';

export default class Form extends Component {
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
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
      sum,
      saveImage,
    } = this.props;
    return (
      <form id="form">
        <label htmlFor="cardName" className="cardName-container">
          Nome
          <input
            data-testid="name-input"
            id="cardName"
            type="text"
            name="cardName"
            value={ cardName }
            placeholder="Nome..."
            onChange={ onInputChange }
            className="input-name"
            maxLength="20"
          />
        </label>

        <label htmlFor="cardDescription" className="cardDescription-container">
          Descrição
          <textarea
            data-testid="description-input"
            id="cardDescription"
            name="cardDescription"
            value={ cardDescription }
            cols="30"
            rows="5"
            placeholder="Descrição..."
            onChange={ onInputChange }
            className="textarea-description"
            maxLength="180"
          />
        </label>

        <label htmlFor="attr1" className="attr-container">
          <span className="input-attr1-title">Força</span>
          <input
            data-testid="attr-input"
            id="attr1"
            max="90"
            min="0"
            name="cardAttr1"
            value={ cardAttr1 }
            type="number"
            onChange={ onInputChange }
            className="attrInput"
          />
        </label>

        <label htmlFor="attr2" className="attr-container">
          <span className="input-attr2-title">Inteligência</span>
          <input
            data-testid="attr-input"
            id="attr2"
            max="90"
            min="0"
            name="cardAttr2"
            value={ cardAttr2 }
            type="number"
            onChange={ onInputChange }
            className="attrInput"
          />
        </label>

        <label
          htmlFor="attr3"
          className="attr-container"
        >
          <span className="input-attr3-title">Agilidade</span>
          <input
            data-testid="attr3-input"
            id="attr3"
            max="90"
            min="0"
            name="cardAttr3"
            value={ cardAttr3 }
            type="number"
            onChange={ onInputChange }
            className="attrInput"
          />
        </label>
        <p>
          Pontos restantes:
          {' '}
          {sum}

        </p>

        <label htmlFor="urlPath" className="urlPath-container">
          <label htmlFor="inputFile">
            Imagem
            <span className="material-symbols-outlined">
              upload_file
              <input type="file" id="inputFile" onChange={ saveImage } />
            </span>
          </label>
          <input
            data-testid="image-input"
            id="urlPath"
            name="cardImage"
            value={ cardImage }
            type="text"
            placeholder="Url..."
            onChange={ onInputChange }
            className="attrInput"
          />
        </label>

        <label htmlFor="cardRarity" className="cardRarity-container">
          Raridade
          <select
            data-testid="rare-input"
            id="cardRarity"
            name="cardRare"
            value={ cardRare }
            onChange={ onInputChange }
            className="rarity-input"
          >
            <option value="Normal">Normal</option>
            <option value="Raro">Raro</option>
            <option value="Muito Raro">Muito Raro</option>
          </select>
        </label>
        <div className="hasTrunfo-save-container">
          {
            hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p>
              : (
                <label htmlFor="super">
                  <input
                    data-testid="trunfo-input"
                    id="super"
                    name="cardTrunfo"
                    checked={ cardTrunfo }
                    type="checkbox"
                    onChange={ onInputChange }
                  />
                  SuperTrunfo
                </label>)
          }

          <button
            data-testid="save-button"
            type="button"
            id="save"
            className="buttonSave"
            onClick={ onSaveButtonClick }
            disabled={ isSaveButtonDisabled }
          >
            Salvar

          </button>

        </div>

      </form>
    );
  }
}

Form.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  saveImage: PropTypes.string.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  sum: PropTypes.number.isRequired,
};
