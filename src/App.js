import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './components/style/App.css';
import logo from './images/logo_tryunfo.svg';

const PATTERNSTATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
  cardImage: 'https://pbs.twimg.com/profile_images/1478893871199186945/1mA6tezL_400x400.jpg',
  cardRare: 'Normal',
  sum: 210,
  cardTrunfo: false,
  isSaveButtonDisabled: true,
  showFilter: true,
};

class App extends React.Component {
  state = { ...PATTERNSTATE,
    Cards: [],
    hasTrunfo: false,
    searchInput: '',
    rarityInput: 'todas',
    filterSuperTrunfo: false,
    sum: 0 };

  handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;
    if (type === 'checkbox') {
      this.setState({ cardTrunfo: checked }, this.formsValidations);
    } else {
      this.setState({ [name]: value }, this.formsValidations);
    }
  };

  validationNameDescriptionImageInputs = () => {
    const { cardName, cardDescription, cardImage } = this.state;
    if (cardName.length > 0 && cardDescription.length > 0 && cardImage.length > 0) {
      return true;
    }
  };

  validationAttrInputs = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const MAXPOINT = 90;
    const MAXTOTALPOINTS = 210;
    const verifySum = (
      Number(cardAttr1)
    + Number(cardAttr2)
    + Number(cardAttr3)) <= MAXTOTALPOINTS;

    const sumAttributs = (
      Number(cardAttr1)
    + Number(cardAttr2)
    + Number(cardAttr3));
    this.setState({ sum: MAXTOTALPOINTS - sumAttributs });

    const maxPointsCard = Number(cardAttr1) <= MAXPOINT
     && Number(cardAttr2) <= MAXPOINT
     && Number(cardAttr3) <= MAXPOINT;

    if (verifySum && maxPointsCard) {
      return true;
    }
  };

  formsValidations = () => {
    this.validationAttrInputs();
    if (this.validationNameDescriptionImageInputs() && this.validationAttrInputs()) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  };

  saveCards = () => {
    const { cardName,
      cardDescription,
      cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo } = this.state;
    const newCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo };
      // prev para manter as cartas que já estão sendo salvas, adiciono a nova carta, além disso pego o meu patternstate para poder resetar as configurações e após isso, chamo a minha função para alterar o valor do hasTrunfo.
    this.setState((prev) => ({
      Cards: [...prev.Cards, newCard],
      ...PATTERNSTATE,
    }), this.hasSuperTrunfo);
  };

  hasSuperTrunfo = () => {
    const { Cards } = this.state;
    const verifySomeSuper = Cards.some((e) => e.cardTrunfo === true);
    this.setState({ hasTrunfo: verifySomeSuper });
  };

  cardRemove = (event) => {
    const { Cards } = this.state;
    const cardName = event.target.name;
    const cardsWithoutEventCard = Cards.filter((e) => e.cardName !== cardName);
    this.setState({ Cards: cardsWithoutEventCard }, this.hasSuperTrunfo);
  };

  filterSuperTrunfo = (event) => {
    const { checked } = event.target;
    this.setState({ filterSuperTrunfo: checked });
  };

  toggleMenu = () => {
    const { showFilter } = this.state;
    if (showFilter) {
      this.setState({ showFilter: false });
    } else {
      this.setState({ showFilter: true });
    }
  };

  uploadImage = (event) => {
    const imagemUpada = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imagemUpada);
    reader.onloadend = () => {
      this.setState({ cardImage: reader.result });
    };
  };

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
      Cards,
      searchInput,
      rarityInput,
      filterSuperTrunfo,
      sum,
      showFilter,
    } = this.state;
    return (
      <>
        <header>
          <img className="logo" src={ logo } alt="logo" />
        </header>
        <div className="form-preview-container">
          <div className="form-container">
            <h2>ADICIONE NOVA CARTA</h2>
            <Form
              sum={ sum }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              onInputChange={ this.handleInputChange }
              onSaveButtonClick={ this.saveCards }
              isSaveButtonDisabled={ isSaveButtonDisabled }
              saveImage={ this.uploadImage }
            />
          </div>
          <div className="card-container">
            <h2>PRÉ-VISUALIZAÇÃO</h2>
            <Card
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
              hasTrunfo={ hasTrunfo }
              onInputChange={ this.handleInputChange }
            />
          </div>
        </div>
        <h2 className="allCards">TODAS AS CARTAS</h2>
        <span
          className="material-symbols-outlined burguer"
          onClick={ this.toggleMenu }
        >
          manage_search
        </span>
        {
          showFilter
        && (
          <div className="filterMenu">
            <span className="filter-title">Filtros de busca</span>
            <input
              type="text"
              data-testid="name-filter"
              name="searchInput"
              onChange={ this.handleInputChange }
              disabled={ filterSuperTrunfo }
              placeholder="Nome da carta"
              className="filter-input"
            />
            <select
              onChange={ this.handleInputChange }
              name="rarityInput"
              data-testid="rare-filter"
              disabled={ filterSuperTrunfo }
              className="filter-input"
            >
              <option value="todas">Todas</option>
              <option value="Normal">Normal</option>
              <option value="Raro">Raro</option>
              <option value="Muito Raro">Muito Raro</option>
            </select>
            <label htmlFor="superTrunfo">
              SuperTrunfo
              <input
                data-testid="trunfo-filter"
                type="checkbox"
                id="superTrunfo"
                name="filterSuperTrunfo"
                onClick={ this.filterSuperTrunfo }
              />
            </label>
          </div>)
        }
        <div className="savedCards">
          {
            Cards.filter((e) => {
              if (filterSuperTrunfo) {
                return e.cardTrunfo;
              }
              if (rarityInput === 'todas') {
                return e.cardName.toUpperCase().includes(searchInput.toUpperCase());
              }
              return e.cardName.toUpperCase().includes(searchInput.toUpperCase()) && e.cardRare === rarityInput;
            })
              .map((e, index) => (
                <div key={ index } className="cardAfterFilter">
                  <button
                    name={ e.cardName }
                    data-testid="delete-button"
                    type="button"
                    onClick={ this.cardRemove }
                    className="buttonRemove"
                  >
                    Excluir
                  </button>
                  <Card
                    cardName={ e.cardName }
                    cardDescription={ e.cardDescription }
                    cardAttr1={ e.cardAttr1 }
                    cardAttr2={ e.cardAttr2 }
                    cardAttr3={ e.cardAttr3 }
                    cardImage={ e.cardImage }
                    cardRare={ e.cardRare }
                    cardTrunfo={ e.cardTrunfo }
                  />
                </div>))
          }
        </div>
      </>
    );
  }
}
export default App;
