import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    constructor(props) {
        super(props);
        
        this.updateInputValue = this.updateInputValue.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }
    
    componentWillMount() {
        if (this.props.searchInput != "") {
            this.props.handleSearch();
        }
    }
    
    updateInputValue(event) {
        this.props.fetchSearchInput(event.target.value);
    }
    
    resetSearch() {
        this.props.fetchSearchInput("");
        this.props.clearSpread();
    }
    
    render() {
        return (
            <div className="container-fluid">
                <nav>
                    <div className="nav-wrapper" style={{display: "block"}}>
                        <a className="brand-logo center flow-text" style={{fontWeight: "bold", color: "black", width: "100%", fontFamily: 'Verdana'}}>~ NIGHTLIFE COORDINATOR ~</a>
                    </div>
                </nav>
                <div className="row" style={{margin: "1% auto 0 auto"}}>
                    <div className="col s12 push-l2 push-m3 push-s3">
                        <p className="col s3 m2 l2 red-text"><i className="fa fa-glass fa-4x"></i></p>
                        <p className="col s3 m2 l2 red-text text-accent-2"><i className="fa fa-car fa-4x"></i></p>
                        <p className="col m2 l2 red-text text-accent-2 hide-on-small-only"><i className="fa fa-map-marker fa-4x"></i></p>
                        <p className="col l2 red-text text-accent-3 hide-on-med-and-down"><i className="fa fa-beer fa-4x"></i></p>
                    </div>
                </div>
                <div className="red lighten-2" style={{borderRadius: '3px', boxShadow: "0px 0px 5px 0px black"}}>
                    <div className="row" style={{marginTop: "1%", paddingTop: "2%"}}>
                        <div className="col l1 hide-on-med-and-down right-align">
                            <Link to="/search" style={{color: "black"}}>
                                <i className="fa fa-search fa-2x" style={{margin: "0"}} onClick={this.props.handleSearch} style={{cursor: "pointer"}}></i>
                            </Link>
                        </div>
                        <div className="col s2 m2 l1 center-align">
                            <i className="fa fa-times fa-2x" onClick={this.resetSearch} style={{cursor: "pointer"}}></i>
                        </div>
                        <div className="col s8 m8 l7">
                            <input style={{border: "1px solid black", marginTop: "-1%", borderRadius: "2px", textAlign: "center"}} value={this.props.searchInput} type="search" name="search" id="search" onChange={this.updateInputValue} />
                        </div>
                        <div className="col l3 hide-on-med-and-down">
                            <Link to="/search" style={{marginLeft: "3%"}}>
                                <button onClick={this.props.handleSearch} className="btn waves-effect waves-light" type="submit" name="action">
                                    Search <span className="material-icons right" style={{fontSize: "24px", margin: "5px 0 0 10px"}}>send</span>
                                </button>
                            </Link>
                        </div>
                        <div className="col s2 m2 show-on-med-and-down hide-on-large-only center-align">
                            <Link to="/search" style={{color: "black"}}>
                                <i className="fa fa-search fa-2x" style={{margin: "0"}} onClick={this.props.handleSearch} style={{cursor: "pointer"}}></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}