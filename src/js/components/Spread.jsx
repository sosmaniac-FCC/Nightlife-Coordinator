import React, { Component } from 'react';

export default class Spread extends Component {
    constructor(props) {
        super(props);
    }
    
    handleGoing(index, event) {
        console.log(index, event);
        this.props.toggleGoing(event.target.id, this.props.entries, index);
    }
    
    render() {
        if (this.props.entries && !this.props.fetching) {
            this.props.entries.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                
                if (nameA < nameB) {
                    return -1;
                }
                else if (nameA > nameB) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            
            const spread = this.props.entries.map((entry, i) => {
                return (
                    <div className="col s12" id={entry.id} key={entry.id}>
                        <div className="card blue-grey darken-1 horizontal" style={{border: "3px solid #e57373"}}>
                            <div className="card-image">
                                <img src={entry.image} alt="No picture available..." height="300" style={{minWidth: "400px", maxWidth: "400px", border: "3px solid #e57373", borderTopStyle: "none", borderLeftStyle: "none", borderBottomStyle: "none"}} />
                            </div>
                            <div className="card-stacked">
                                <div className="card-title white-text" style={{marginLeft: '10%'}}>
                                    <p>{entry.name}</p>
                                </div>
                                <div className="card-content white-text" style={{fontStyle: 'italic'}}>
                                    <p>{entry.review}</p>
                                </div>
                                <a className="waves-effect waves-light btn" id={entry.id} onClick={this.handleGoing.bind(this, i)}>
                                    <i className="material-icons left">accessibility</i>{entry.going} GOING<i className="material-icons right">accessibility</i>
                                </a>
                                <div className="card-action">
                                    <a href={entry.url}>learn more about {entry.name}!</a>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
            
            return (
                <div>
                    <h5>{this.props.entries.length} Search Results</h5>
                    <ul>{spread}</ul>
                </div>
            );
        }
        else {
            return (
                <div className="preloader-wrapper big active" style={{marginTop: "10%", display: "block", margin: "10% auto 0 auto"}}>
                    <div className="spinner-layer spinner-blue">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

/*
entry.id
entry.name
entry.image
entry.url
entry.review
entry.going
*/