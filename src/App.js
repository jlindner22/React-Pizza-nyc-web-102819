import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    allPizza: [],
    formDetails: '',
    topping: '',
    vegetarian: '',
    size: '',
    id: ''
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data)
      this.setState({
        allPizza: data
      })
    });
  }

    editPizza = (pizza) => {
      this.setState({
        // formDetails: pizza,
        topping: pizza.topping,
        vegetarian: pizza.vegetarian,
        size: pizza.size,
        id: pizza.id
      })
    }

    toppingChange = (e) => {
      this.setState({
        topping: e.target.value
      })
    }

    sizeChange = (e) => {
      this.setState({
        size: e.target.value
      })
    }

    vegetarianChange = () => {
      this.setState({
        vegetarian: !this.state.vegetarian
      })
    }

  submitPizza = (newPizza) => {
    fetch(`http://localhost:3000/pizzas/${newPizza.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
              topping: newPizza.topping,
              size: newPizza.size,
              vegetarian: newPizza.vegetarian
      }),
    })
    console.log("new Pizza", newPizza)
    console.log("topping", this.state.topping)
    console.log("id", newPizza.id)
  }

  componentDidUpdate() {
    fetch('http://localhost:3000/pizzas')
      .then(res=>res.json())
      .then(newPizzas => this.setState({
        allPizza: newPizzas
      }))
  }
 
  render() {
    // console.log("form details", this.state.formDetails)
    // console.log("total state", this.state)

    return (
      <Fragment>
        <Header/>
        <PizzaForm editPizza={this.editPizza}
        formDetails={this.state.formDetails}
        handleChange={this.handleChange}
        toppingChange={this.toppingChange}
        vegetarianChange={this.vegetarianChange}
        sizeChange={this.sizeChange}
        topping={this.state.topping}
        size={this.state.size}
        id={this.state.id}
        vegetarian={this.state.vegetarian}
        submitPizza={this.submitPizza}
        />
        <PizzaList
        allPizza={this.state.allPizza}
        editPizza={this.editPizza}
          />
      </Fragment>
    );
  }
}

export default App;
