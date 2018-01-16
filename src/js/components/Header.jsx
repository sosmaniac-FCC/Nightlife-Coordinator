import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props);
        
        this.updateInputValue = this.updateInputValue.bind(this);
        this.clearInputValue = this.clearInputValue.bind(this);
    }
    
    componentWillMount() {
        console.log(this.props.searchInput, '<=======!!!=======>');
        if (this.props.searchInput != "") {
            this.props.handleSearch();
        }
    }
    
    updateInputValue(event) {
        this.props.fetchSearchInput(event.target.value);
    }
    
    clearInputValue(event) {
        this.props.fetchSearchInput("");
    }
    
    render() {
        return (
            <div className="container-fluid">
                <nav>
                    <div className="nav-wrapper" style={{display: "block"}}>
                        <a className="brand-logo center flow-text" style={{fontWeight: "bold", color: "black", width: "100%"}}>~ NIGHTLIFE COORDINATOR ~</a>
                    </div>
                </nav>
                <div className="row" style={{margin: "1% auto 0 auto"}}>
                    <div className="col s12 push-s2">
                        <p className="col s2 red-text"><i className="fa fa-glass fa-4x"></i></p>
                        <p className="col s2 red-text text-accent-2"><i className="fa fa-car fa-4x"></i></p>
                        <p className="col s2 red-text text-accent-2"><i className="fa fa-map-marker fa-4x"></i></p>
                        <p className="col s2 red-text text-accent-3"><i className="fa fa-beer fa-4x"></i></p>
                    </div>
                </div>
                <div className="red lighten-2" style={{borderRadius: '3px', boxShadow: "0px 0px 5px 0px black"}}>
                    <div className="row" style={{marginTop: "1%", paddingTop: "2%"}}>
                        <div className="col s1 right-align">
                            <i className="fa fa-search fa-2x" style={{margin: "0"}} onClick={this.props.handleSearch} style={{cursor: "pointer"}}></i>
                        </div>
                        <div className="col s1 center-align">
                            <i className="fa fa-times fa-2x" onClick={this.clearInputValue} style={{cursor: "pointer"}}></i>
                        </div>
                        <div className="col s7">
                            <input style={{border: "1px solid black", marginTop: "-1%", borderRadius: "2px", textAlign: "center"}} value={this.props.searchInput} type="search" name="search" id="search" onChange={this.updateInputValue} />
                        </div>
                        <div className="col s3">
                            <Link to="/search" style={{marginLeft: "3%"}}>
                                <button onClick={this.props.handleSearch} className="btn waves-effect waves-light" type="submit" name="action">
                                    Search <span className="material-icons right" style={{fontSize: "24px", margin: "5px 0 0 10px"}}>send</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}