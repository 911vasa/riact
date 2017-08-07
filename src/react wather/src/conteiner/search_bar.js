import React , { Component } from 'react';
import { connect }   from 'react-redux';
import { bindActionCreators }   from 'redux';
import { fetchWeather }   from '../actions/index';


  class SearchBar extends Component {
    constructor(props){
        super(props);

        this.state = {term: ''};

        this.onInputChang = this.onInputChang.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    onInputChang(event){
        this.setState({term:event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();


        this.props.fetchWeather(this.state.term);
        this.setState({term: ''});

    }

    render() {
        return(
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input
                    placeholder="get a five day forcaste in your favorite cities"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChang}
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}

function  mapDispatchToProps( dispatch ) {
    return bindActionCreators({fetchWeather} , dispatch);

}

export default connect(null , mapDispatchToProps)(SearchBar);