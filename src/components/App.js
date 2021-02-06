import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = newFilter => {
    this.state.filters = {
      ...this.state.filters,
      type: newFilter
    }
  }

  onFindPetsClick = event => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
        .then(resp => resp.json())
        .then(petReturn => this.setState({
          pets: petReturn
        }))
    } else {
      fetch('/api/pets?type='+this.state.filters.type)
        .then(resp => resp.json())
        .then(petReturn => this.setState({
          pets: petReturn 
        }))
    }
  }

  onAdoptPet = petID => {
    const petsArray = this.state.pets.map(pet => {
      return pet.id === petID ? {...pet, isAdopted: true} : pet
    })
    return this.setState({
      pets: petsArray
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
