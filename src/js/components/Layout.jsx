import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import NotFound from './NotFound';
import Spread from './Spread';

import { fetchEntries, toggleGoing, clearSpread } from '../redux/entriesActions';
import { fetchSearchInput } from '../redux/inputsActions';

class Layout extends Component {
    constructor(props) {
        super(props);
        
        this.handleSearch = this.handleSearch.bind(this);
    }
    
    componentWillMount() {
        this.routes = ["/", "/search"];
    }
    
    handleSearch() {
        if (this.props.searchInput != "") {
            this.props.fetchEntries(this.props.searchInput);
        }
    }
    
    testRoute() {
        return this.routes.includes(window.location.pathname) ? window.location.pathname : "/";
    }
    
    render() {
        return (
            <div>
                <div className={"container"}>
                    <Route exact path={this.testRoute()} render={(props) => {
                        return <Header {...props} searchInput={this.props.searchInput} handleSearch={this.handleSearch} fetching={this.props.fetching} fetchSearchInput={this.props.fetchSearchInput} clearSpread={this.props.clearSpread} />; }} />
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/search" render={(props) => {
                            return <Spread {...props} entries={this.props.entries} fetching={this.props.fetching} toggleGoing={this.props.toggleGoing} error={this.props.error} />; }} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

// <Route exact path={this.testRoute()} render={(props) => { return <Footer {...props} />; }} />

// application store state (props)
function mapStateToProps(state) {
    return {
        entries: state.entries.data,
        fetching: state.entries.fetching,
        searchInput: state.inputs.searchInput,
        error: state.entries.error
    };
}

// action creator bindings
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchEntries: fetchEntries,
        toggleGoing: toggleGoing,
        fetchSearchInput: fetchSearchInput,
        clearSpread: clearSpread
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);